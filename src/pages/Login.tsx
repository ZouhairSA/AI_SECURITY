
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, Lock } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-security-950 px-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-3 rounded-full">
            <Shield className="h-12 w-12 text-security-800" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-white mb-2">
          Guardian Eye Platform
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Advanced AI-powered security monitoring
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>{isPasswordReset ? "Réinitialiser le mot de passe" : "Sign In"}</CardTitle>
            <CardDescription>
              {isPasswordReset 
                ? "Entrez votre email pour recevoir un lien de réinitialisation" 
                : "Enter your credentials to access your account"}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@guardian-eye.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {!isPasswordReset && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Pour la démo : Tout mot de passe fonctionne avec admin@guardian-eye.com ou client@example.com
                  </p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <Button 
                type="submit" 
                className="w-full bg-security-800 hover:bg-security-700"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? (isPasswordReset ? "Envoi en cours..." : "Connexion...") 
                  : (isPasswordReset ? "Envoyer" : "Sign In")}
              </Button>
              
              <Button 
                type="button"
                variant="ghost"
                className="w-full mt-2"
                onClick={togglePasswordReset}
              >
                {isPasswordReset 
                  ? "Retour à la connexion" 
                  : "Mot de passe oublié ?"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center text-gray-400 mt-6 text-sm">
          &copy; {new Date().getFullYear()} Guardian Eye Security. All rights reserved.
        </p>
      </div>
    </div>
  );
}
