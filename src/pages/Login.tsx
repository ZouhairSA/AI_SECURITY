
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const success = await login(email, password);
    setPending(false);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-security-800 to-security-950">
      <Card className="w-full max-w-md shadow-lg animate-fade-in">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center">
            <img src="/placeholder.svg" alt="AI SECURITY" className="h-10 w-10 mr-3" />
            <CardTitle className="text-2xl text-center font-bold text-security-800">AI SECURITY</CardTitle>
          </div>
          <p className="text-center text-md text-muted-foreground">
            Système de surveillance intelligente propulsé par l’IA
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded px-4 py-2 flex flex-col gap-1 mb-2">
            <div className="flex items-center mb-1">
              <AlertCircle className="h-4 w-4 mr-2 text-blue-700" />
              <span className="text-blue-700 font-semibold">Informations de connexion pour test :</span>
            </div>
            <span className="text-xs text-gray-700">
              <span className="font-medium">Administrateur :</span> <br />
              Email : <span className="select-all">admin@aisecurity.com</span> <br />
              Mot de passe : <span className="italic">au choix</span> <br />
              <span className="font-medium">Client démo :</span> <br />
              Email : <span className="select-all">client@example.com</span> <br />
              Mot de passe : <span className="italic">au choix</span>
            </span>
          </div>
          <h2 className="font-semibold text-lg text-gray-900 text-center mb-2">
            Connexion Sécurisée
          </h2>
          <p className="text-center text-muted-foreground mb-4">
            Entrez vos identifiants pour accéder à votre compte.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-sm">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-sm">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="text-xs text-gray-400 mt-1 block">
                (N’importe quel mot de passe fonctionne dans cette démo)
              </span>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={pending}
            >
              {pending ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            Sécurité et confidentialité avec <span className="font-bold">AI SECURITY</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
