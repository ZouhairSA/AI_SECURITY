
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Récupère l'utilisateur connecté et le profil Supabase
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setUser(null);
        setLoading(false);
        return;
      }
      // Cherche le profil correspondant dans la table users
      const { data: profiles } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();
      if (profiles) setUser(profiles as User);
      setLoading(false);
    };
    getUser();
    // Ecoute les changements d'auth (connexion/déconnexion)
    const { data: sub } = supabase.auth.onAuthStateChange(() => getUser());
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      toast({
        title: "Échec de connexion",
        description: "Email ou mot de passe incorrect.",
        variant: "destructive",
      });
      setLoading(false);
      return false;
    }
    // Cherche le profil correspondant dans la table users
    const { data: profiles } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();
    if (profiles) {
      setUser(profiles as User);
      toast({
        title: "Bienvenue",
        description: `Bonjour ${profiles.name ?? profiles.email}`,
      });
      setLoading(false);
      return true;
    }
    toast({
      title: "Profil manquant",
      description: "Aucun profil trouvé.",
      variant: "destructive",
    });
    setLoading(false);
    return false;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin: user?.role === "admin" || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
