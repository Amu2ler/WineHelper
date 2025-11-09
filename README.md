# 🍷 WineHelper

Une application web moderne permettant d’explorer des vins, rechercher par nom, et obtenir des informations détaillées grâce à l’API _Wine Explorer (RapidAPI)_.

WineHelper se compose de deux parties :

**Frontend (Next.js + React + TypeScript)**  
 **Backend (Node.js + Express + Axios)**

L’objectif final est de créer un véritable **assistant vin** basé sur :

- la recherche,
- les détails de vins,
- l’affichage visuel,
- et plus tard : un moteur de recommandation intelligent.

## Fonctionnalités actuelles

### Backend

- Route `/api/wines/search?q=nom`  
  → Recherche de vins via l’API Wine Explorer  
  → Transforme les résultats (nom + id)

- Route `/api/wines/details/:id`  
  → Récupère les informations détaillées d’un vin

### Frontend

- Page `/search`
- Champ de recherche + bouton "Rechercher"
- Appel au backend
- Affichage d’une liste de vins formatée (nom + bouton détails)
