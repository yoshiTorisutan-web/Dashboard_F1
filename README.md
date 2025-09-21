# 🏁 F1 Live Dashboard

Un tableau de bord interactif et moderne pour suivre les performances des pilotes et des écuries de Formule 1, avec visualisation graphique et filtres dynamiques.

## Aperçu

F1 Live Dashboard permet de :
- Visualiser les classements des pilotes et des écuries par saison.
- Filtrer les pilotes et les écuries via une recherche dynamique.
- Explorer les statistiques principales : points, victoires, podiums, abandons et pole positions.
- Comparer les performances par écurie avec des graphiques interactifs.

## Fonctionnalités

- Sélection de la saison (2022, 2023, 2024).
- Recherche instantanée pour les pilotes et les écuries.
- Tableaux interactifs avec couleurs et logos des équipes.
- Graphiques modernes utilisant Chart.js.
- Design responsive et épuré avec Tailwind CSS.
- Header et footer harmonisés avec navigation facile.

## Technologie utilisées

- HTML5 / CSS3 / Tailwind CSS pour le design et la mise en page.
- JavaScript / Chart.js pour les visualisations et la logique dynamique.
- JSON pour stocker les données de la saison F1.

## Structure du projet

F1-Dashboard/
│
├─ index.html           # Page principale
├─ style.css            # Styles personnalisés
├─ script.js            # Logique JavaScript
├─ data/
│   └─ f1data.json      # Données pilotes et écuries
├─ assets/
│   ├─ f1/              # Logo et images
│   └─ ecuries/         # Logos des écuries
└─ README.md

## Installation & Utilisation

Cloner le dépôt :
- git clone https://github.com/ton-utilisateur/f1-dashboard.git

Ouvrir le projet :
- Double-clique sur index.html ou ouvre-le dans un navigateur.

Navigation :
- Utilise le menu en haut pour naviguer entre Pilotes, Écuries et Graphiques.
- Utilise les barres de recherche pour filtrer les données en temps réel.
- Sélectionne la saison souhaitée dans le menu déroulant.

## Améliorations possibles

- Ajouter la recherche insensible aux accents.
- Intégrer un système de mise à jour automatique des données en temps réel.
- Ajouter des filtres avancés : par pays, par type de circuit, etc.
- Version mobile optimisée avec affichage des tableaux simplifié.

## Auteur

Tristan Bossard – Développeur Web & Chef de Projet Digital

## Licence

Ce projet est sous licence MIT.
