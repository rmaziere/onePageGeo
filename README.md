#Carto BAN - An one page site#

Ce mini-site utilise le projet [base adresse nationale](adresse.data.gouv.fr) pour réaliser le géocodage des adresses et le géocodage inverse. De fait, il n'est fonctionnel que pour la France.
L'affichage est fait via [Leaflet]() avec la cartographie d'[OpenStreetMap]().
[Bootstrap]() permet quant à lui un affichage adaptatif.

##Technologie##
Les technologies utilisées sont :

- html5,
- javascript,
- css3.

##Téléchargement##
Le projet est disponible sur [GitHub/rmaziere/onePageGeo](https://github.com/rmaziere/onePageGeo)

##Demo##
Une démonstration est disponible en ligne : [dev.rmaziere.fr/onePageGeo](http://dev.rmaziere.fr/onePageGeo/).

##Ressources##
J'ai utilisé quelques outils en ligne :

- [jslint](http://www.jslint.com/) pour valider le script js,
- [jsbeautifier/](http://jsbeautifier.org/) pour formater le script.

##Pistes d'évolution##
Ne pas exécuter les fonctions si les données de recherche n'ont pas été modifiées,
Optimiser le script,
Permettre le passage de paramètres dans l'URL,
Retourner les adresses formatées et enrichies,
Prendre en compte le facteur de qualité, 
Permettre l'import de fichiers