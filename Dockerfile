# Utiliser l'image Node.js Alpine officielle comme image de base
FROM node:20.12.2-alpine

# Créer un répertoire pour l'application
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Construire l'ensemble du projet
RUN npm run build

# Exposer le port interne pour l'application NestJS
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "dist/main.js"]