## Projet 6 - Formation Développeur Web - OpenClassrooms
## Créez un réseau social d'entreprise

### Contexte du projet
Réaliser une application complète où les salariés d'une entreprise publient des textes et ont la possibilité de commenter les publications.
Réalisation à partir de zéro (Graphisme, Front-end, Back-end).
Front-End: utilisation du framework React.
Back-end: utilisation de Node.js, Express, Sequelize et MySQL.

### Instructions d'installation

1. Cloner le dossier GitHub localement

2. Paramétrer les identifiants de connexion à la base de données:
    - Dans le fichier backend/config/config.json, remplacer les identifiants par défaut par vos paramètres de connexion à la base de données: 
        * username = le nom d'utilisateur de la base de données
        * password = le mot de passe de connexion
        * database = le nom de la base de données
        * host = l'url de la base de données
        * dialect = le type de base de données
    - Sauvegarder le fichier

2. Si vous souhaitez initialiser automatiquement et peupler la base de données, dans le dossier backend, depuis un terminal, lancer les commandes suivantes:
    - sequelize db:create, pour créer la base de données
    - sequelize db:migrate, pour créer les tables
    - sequelize db:seed:all, pour peupler les tables de quelques exemples

3. Paramétrer la clé d'authentification:
    - Dans le dossier backend, dupliquer le fichier ".env-prod" et nommer ce nouveau fichier ".env"
    - Dans le fichier .env, compléter le champ libre pour configurer la chaîne d'encodage (TOKEN)
    - Sauvegarder le fichier

4. Dans le dossier backend, depuis un terminal:
    - Lancer la commande "npm install" pour installer les dépendances
    - Lancer la commande "nodemon server.js" pour lancer le serveur
    - Dans le terminal, la ligne "Listening on port 3000" doit s'afficher: le serveur est alors fonctionnel

2. Dans le dossier frontend, depuis un terminal:
    - Lancer la commande "npm install" pour installer les dépendances
    - Lancer la commande "npm start" pour lancer l'application React
    - Ouvrir une page du navigateur à l'adresse "localhost:4200" pour accéder à l'application



