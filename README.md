# API_Test
Développement d'une API basique register/login/logout

Apres avoir téléchargé le projet, lancer la commande 'npm install' pour installer les dépendances
Les réquêtes peuvent lancer via un logiciel telsque Postman sinon le fichier index.html propose une interface graphique extremement basique

Au niveau des routes :
  * POST à la route api/user/register pour créer un nouvel utilisateur
  * POST à la route api/user/login pour se connecter avec un utilisateur existant
  * GET à la route api/user/logout pour se deconnecter avec un utilisateur existant
  * GET à la route /users/ pour récupérer la liste des utilisateurs mais nécessite d'être connecté
