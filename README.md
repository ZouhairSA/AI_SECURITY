# Guardian Eye Platform - AI Security

![AI Security Logo](src/assets/ai-security-logo.svg) 

Guardian Eye Platform est une interface web moderne conçue pour la gestion et la surveillance d'un système de sécurité basé sur l'IA. Elle offre une visualisation claire des caméras, des alertes générées par l'IA, et permet la gestion des utilisateurs.

## ✨ Concept

L'objectif est de fournir une plateforme centralisée et intuitive pour :
- Visualiser les flux vidéo des caméras de surveillance.
- Recevoir et gérer les alertes intelligentes (détection de foule, détection d'incendie, etc.).
- Obtenir des statistiques clés sur les performances du système.
- Gérer les comptes utilisateurs (administrateurs et clients).
- Offrir une expérience utilisateur fluide et réactive sur différents appareils.

## 🚀 Fonctionnalités Principales

- **Tableau de bord :** Vue d'ensemble avec statistiques clés (nombre de caméras, alertes actives, précision de détection, nombre d'utilisateurs).
- **Visualisation des Caméras :** Affichage des flux des caméras avec leur statut (en ligne, avertissement) et les détections IA en temps réel.
- **Gestion des Alertes :** Liste et détails des alertes générées par le système IA.
- **Gestion des Utilisateurs (Admin) :** Création, modification et suppression des comptes utilisateurs (avec confirmation).
- **Authentification Sécurisée :** Page de connexion dédiée avec comptes de démonstration.
- **Interface Adaptative (Responsive) :**
    - Barre latérale rétractable (mode icônes) avec tooltips.
    - Adaptation aux différentes tailles d'écran.
- **Multilingue et Thèmes :** Possibilité de changer la langue (français/anglais/arabe) et le thème (clair/sombre).
- **Confirmation des Actions :** Boîtes de dialogue pour confirmer les actions sensibles (suppression, modification, déconnexion).

## 🛠️ Tech Stack

- **Framework Frontend :** [React](https://reactjs.org/) (v18)
- **Build Tool :** [Vite](https://vitejs.dev/)
- **Langage :** [TypeScript](https://www.typescriptlang.org/)
- **Styling :** [Tailwind CSS](https://tailwindcss.com/)
- **Composants UI :** [shadcn/ui](https://ui.shadcn.com/) (basé sur Radix UI)
- **Routing :** [React Router DOM](https://reactrouter.com/) (v6)
- **Gestion d'état (Auth) :** React Context API
- **Icônes :** [Lucide React](https://lucide.dev/)
- **Gestion de Formulaires :** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) (pour la validation)
- **Graphiques (potentiellement) :** [Recharts](https://recharts.org/)
- **Notifications :** [Sonner](https://sonner.emilkowal.ski/)

## ⚙️ Installation et Setup

1.  **Cloner le dépôt :**
    ```bash
    git clone <url-du-depot>
    cd guardian-eye-platform 
    ```
2.  **Installer les dépendances :**
    Choisissez votre gestionnaire de paquets (npm, yarn, ou pnpm/bun si configuré) :
    ```bash
    npm install 
    # ou
    yarn install
    # ou
    bun install 
    ```

## ▶️ Lancement du Projet

Pour lancer l'application en mode développement :

```bash
npm run dev
# ou
yarn dev
# ou
bun dev
```

Ouvrez votre navigateur et allez à l'adresse indiquée (généralement `http://localhost:5173` ou un port similaire).

## 🔑 Comptes de Démonstration

Utilisez les identifiants suivants sur la page de connexion pour tester les différents rôles :

-   **Administrateur :**
    -   Email : `admin@aisecurity.com`
    -   Mot de passe : (n'importe lequel)
-   **Client :**
    -   Email : `client@example.com` (ou `client@aisecurity.com` selon la configuration)
    -   Mot de passe : (n'importe lequel)

## 📄 Autres Commandes

-   **Linting :** Vérifier la qualité du code.
    ```bash
    npm run lint
    ```
-   **Build de Production :** Créer une version optimisée pour le déploiement.
    ```bash
    npm run build
    ```
-   **Prévisualisation du Build :** Tester le build de production localement.
    ```bash
    npm run preview
    ```

## 🤝 Contribution (Optionnel)

Les contributions sont les bienvenues ! Si vous souhaitez contribuer, veuillez suivre ces étapes :
1. Forker le projet.
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/NouvelleFonctionnalite`).
3. Commiter vos changements (`git commit -m 'Ajout de NouvelleFonctionnalite'`).
4. Pusher vers la branche (`git push origin feature/NouvelleFonctionnalite`).
5. Ouvrir une Pull Request.

## 📜 Licence (Optionnel)

Ce projet est sous licence [MIT](LICENSE). (Si vous ajoutez un fichier LICENSE)

---
*Généré par l'assistant IA - Vérifiez les détails spécifiques à votre projet.*
