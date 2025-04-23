import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Mail, Lock, Shield } from "lucide-react";
import { useThemeLanguage } from "../contexts/ThemeLanguageContext";
import { ThemeLanguageSwitcher } from "../components/ThemeLanguageSwitcher";
import { cn } from "@/lib/utils";

// Importez l'image directement
import aiSecurityLogo from "../assets/ai-security-logo.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, language } = useThemeLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const success = await login(email, password);
    setPending(false);
    if (success) {
      navigate("/dashboard");
    }
  };

  const isRtl = language === "ar";

  return (
    <div 
      className={cn(
        "flex min-h-screen items-center justify-center p-4",
        "bg-gradient-to-br from-security-950 via-security-900 to-security-800",
        isRtl && "direction-rtl"
      )}
    >
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
            <img
              src={aiSecurityLogo} 
              alt="AI SECURITY" 
              className={cn("h-8 w-8", isRtl ? "ml-3" : "mr-3")}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="text-2xl font-bold text-white tracking-tight">AI SECURITY</span>
          </div>
        </div>

        <Card 
          className={cn(
            "bg-white/10 border-white/20 backdrop-blur-md shadow-2xl",
            isRtl && "text-right"
          )}
        >
          <CardHeader className="space-y-1 text-center relative pt-8">
            <div className="absolute top-4 right-4">
              <ThemeLanguageSwitcher />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              {t("welcomeBack") || "Bienvenue"}
            </CardTitle>
            <p className="text-security-200 text-sm">
              {t("loginToContinue") || "Connectez-vous pour continuer"}
            </p>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="bg-security-400/10 border border-security-400/20 rounded-lg p-3 space-y-2">
              <div className="flex items-center">
                <AlertCircle className={cn("h-5 w-5 text-security-400", isRtl ? "ml-2" : "mr-2")} />
                <span className="text-security-300 font-medium">
                  Informations de connexion pour test :
                </span>
              </div>
              <div className="text-sm text-security-300 space-y-1 pl-7">
                <div>
                  <span className="font-medium">Admin :</span>{" "}
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">admin@aisecurity.com</code>
                  <br /> <span className="text-xs text-security-400">Mot de passe :</span> <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">admin</code>
                </div>
                <div>
                  <span className="font-medium">Client :</span>{" "}
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">client@aisecurity.com</code>
                  <br /> <span className="text-xs text-security-400">Mot de passe :</span> <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">client321@</code>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-sm text-yellow-300">
              <div className="flex items-center">
                <AlertCircle className={cn("h-5 w-5 text-yellow-400", isRtl ? "ml-2" : "mr-2")} />
                <span>Cette version est une démonstration (AI_SECURITY_V1) destinée aux tests.</span>
              </div>
            </div>

            <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
              <div className="relative">
                <Mail className={cn("absolute top-2.5 h-5 w-5 text-security-400", isRtl ? "right-3" : "left-3")} />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  required
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder-security-400 focus:border-security-400",
                    isRtl ? "pr-10 text-right" : "pl-10"
                  )}
                />
              </div>
              <div className="relative">
                <Lock className={cn("absolute top-2.5 h-5 w-5 text-security-400", isRtl ? "right-3" : "left-3")} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={cn(
                    "bg-white/5 border-white/10 text-white placeholder-security-400 focus:border-security-400",
                    isRtl ? "pr-10 text-right" : "pl-10"
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-security-600 hover:bg-security-500 text-white font-semibold"
                disabled={pending}
              >
                {pending ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Connexion...
                  </div>
                ) : (
                  "Se connecter"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="border-t border-white/10 mt-4 pt-4">
            <p className="text-xs text-security-300 text-center w-full">
              Sécurité et confidentialité avec <span className="font-bold text-security-400">AI SECURITY</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
