
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, Lock, ArrowRight, ChevronLeft } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isPasswordReset) {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
          toast.error("Erreur lors de la réinitialisation du mot de passe", {
            description: error.message
          });
        } else {
          toast.success("Email de réinitialisation de mot de passe envoyé", {
            description: "Vérifiez votre boîte de réception"
          });
          setIsPasswordReset(false);
        }
      } else {
        const success = await login(email, password);
        if (success) {
          navigate("/dashboard");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordReset = () => {
    setIsPasswordReset(!isPasswordReset);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-security-950 to-security-800 p-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-security-500 to-security-300 rounded-full blur opacity-70"></div>
            <div className="bg-security-900 p-4 rounded-full relative">
              <Shield className="h-14 w-14 text-security-300" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-white mb-2 font-sans tracking-wide uppercase">
          AI SECURITY
        </h1>
        <p className="text-center text-gray-300 mb-8 max-w-xs mx-auto">
          Système de surveillance intelligente IA & Sécurité renforcée
        </p>
        
        <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-xl">
              {isPasswordReset ? "Réinitialiser le mot de passe" : "Connexion Sécurisée"}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {isPasswordReset 
                ? "Entrez votre email pour recevoir un lien de réinitialisation" 
                : "Entrez vos identifiants pour accéder à votre compte"}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 pb-3">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/20 border-security-600/30 text-white placeholder:text-gray-400 focus-visible:ring-security-400 pr-10"
                  />
                </div>
              </div>
              
              {!isPasswordReset && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/20 border-security-600/30 text-white placeholder:text-gray-400 focus-visible:ring-security-400 pr-10"
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400 italic">
                    Pour la démo : Tout mot de passe fonctionne avec admin@aisecurity.com ou client@example.com
                  </p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-3 pt-2">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-security-600 to-security-500 hover:from-security-500 hover:to-security-400 text-white border-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isPasswordReset ? "Envoi en cours..." : "Connexion..."}
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    {isPasswordReset ? "Envoyer le lien" : "Se connecter"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
              
              <Button 
                type="button"
                variant="ghost"
                className="w-full text-gray-300 hover:text-white hover:bg-white/10"
                onClick={togglePasswordReset}
              >
                {isPasswordReset ? (
                  <span className="flex items-center">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Retour à la connexion
                  </span>
                ) : (
                  "Mot de passe oublié ?"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} AI SECURITY. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
