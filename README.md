# 🍷 WineHelper

**WineHelper** est votre assistant personnel pour l'exploration œnologique. Cette application web moderne permet de rechercher des vins, de consulter leurs détails techniques (cépages, millésimes, accords mets-vins) et de gérer vos favoris.

Elle s'appuie sur l'API **Wine Explorer** pour fournir des données riches et précises.

---

## 🚀 Fonctionnalités

- **Recherche Intelligente** : Trouvez des vins par nom, appellation ou région.
- **Détails Complets** : Accédez à la fiche technique de chaque vin (prix, notes, description, millésime).
- **Gestion des Favoris** : Sauvegardez vos vins préférés pour les retrouver facilement (stockage local).
- **Galerie Visuelle** : Visualisez les bouteilles et étiquettes (avec support pour ajouts manuels).
- **Mode Mock** : Testez l'application avec des données réalistes sans consommer de requêtes API.
- **Interface Premium** : Une expérience utilisateur fluide et esthétique.

## 🛠️ Stack Technique

**Frontend**
- **Framework** : [Next.js 15](https://nextjs.org/) (App Router)
- **Langage** : TypeScript
- **Styling** : CSS Modules / Global CSS (Design responsive et moderne)

**Backend**
- **Runtime** : Node.js
- **Framework** : Express.js
- **Client HTTP** : Axios
- **API** : [Wine Explorer API](https://rapidapi.com/azgtamir/api/wine-explorer-api-ratings-insights-and-search/)

---

## 📦 Installation et Démarrage

### Prérequis
- Node.js (v18+ recommandé)
- npm ou yarn
- Une clé API RapidAPI pour *Wine Explorer*

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/winehelper.git
cd winehelper
```

### 2. Configuration du Backend
```bash
cd backend
npm install
```
Créez un fichier `.env` dans le dossier `backend` :
```env
WINE_API_KEY=votre_cle_rapidapi
WINE_SEARCH_LIMIT=10
USE_MOCK_DATA=false
```

**Mode Mock (Recommandé pour le développement)** :
Pour éviter de consommer vos crédits API, activez le mode mock :
```env
USE_MOCK_DATA=true
```
Ce mode utilise 18 vins français réalistes (Bordeaux, Bourgogne, Champagne, etc.) avec toutes les données complètes. Idéal pour :
- ✅ Tester les fonctionnalités sans limite
- ✅ Développement hors ligne
- ✅ Démonstration de l'application

Lancez le serveur :
```bash
npm start
# Le serveur tourne sur http://localhost:4000
```

### 3. Configuration du Frontend
Ouvrez un nouveau terminal à la racine du projet :
```bash
cd frontend
npm install
npm run dev
# L'application est accessible sur http://localhost:3000
```

---

## 📖 Utilisation

1.  **Accueil** : Utilisez la barre de recherche pour trouver un vin (ex: "Chablis", "Merlot").
2.  **Résultats** : Parcourez la liste des vins trouvés.
3.  **Détails** : Cliquez sur "Voir les détails" pour afficher la fiche complète.
4.  **Favoris** : Ajoutez un vin à vos favoris en cliquant sur le cœur ❤️.

---

## 🤝 Contribution

Les contributions sont les bienvenues !
1.  Forkez le projet.
2.  Créez votre branche (`git checkout -b feat/ma-nouvelle-feature`).
3.  Commitez vos changements (`git commit -m 'feat: ajout de ma feature'`).
4.  Poussez vers la branche (`git push origin feat/ma-nouvelle-feature`).
5.  Ouvrez une Pull Request.

---

## 📝 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.
