"use strict";

/* Sript pour gérer le changement de tab
 *
 */

/* ******* CONSTANTES ET VARIABLES GLOBALES ******** */

// Permet de connaire l'id de la section à afficher en fonction de l'id du tab cliqué
const LIENS_TAB_SECTION = {
    tabAffichageResume : "affichageResume",
    tabVisitesVilles : "visitesVilles",
    //tabRecherchePersonnes : "recherchePersonnes",
    tabPersonnes : "personnes",
    tabVilles : "villes"
}


// mémorise la tab actuelle
// initialisée à "tabPersonnes" par défaut
let idTabActuel = "tabVilles"; 



/* ******* main ***************** */

// Une fois la page chargée, initialise les tabs
document.addEventListener("DOMContentLoaded", initTabs);


/**
 * Sert à initialiser l'onglet par défaut.
 * Se base sur la variable globale "idTabActuel", dont la valeur initiale sert de valeur par défaut
 * Pas de paramètres.
 * Pas de retour.
 */
function initTabs() {
    document.getElementById(LIENS_TAB_SECTION[idTabActuel]).style.display = "block";
    document.getElementById(idTabActuel).classList.add("active");
    initVilles();
}

/**
 * Entraine un changement d'onglet
 * Le contenu de l'onglet précédent sera caché et l'onglet précédent ne sera plus actif.
 * Le contenu du nouvel onglet sera affiché et le nouvel onglet sera actif (pour le mettre en évidence en couleur).
 * La variabe globale "idTabActuel" est utilisée pour savoir quel onglet ne plus afficher, puis elles est mise à jour avec le nouveau.
 * L'onglet actuel est reçu en paramètre et son id est utilisé.
 * La constante LIENS_TAB_SECTION est utilisée pour retrouver les id des contenu des onglets, sur base des id des onglets.
 * 
 * Pas de retour
 * @param {HTMLElement} tabButton - le bouton qui a enclenché le changement de tab
 */
function changerTab(tabButton) {
    //console.log(tabButton);
    // cache le tab actuel
    document.getElementById(LIENS_TAB_SECTION[idTabActuel]).style.display = "none";
    document.getElementById(idTabActuel).classList.remove("active");

    // affiche le tab demandé
    document.getElementById(LIENS_TAB_SECTION[tabButton.id]).style.display = "block";
    document.getElementById(tabButton.id).classList.add("active");

    // mémorise le nouveau tab actuel
    idTabActuel = tabButton.id;
}


//document.addEventListener('click', initVilles);

function initVilles(){
    let xhr = new XMLHttpRequest;
    xhr.open('get', 'http://localhost:81/afficherVilles', true);
    xhr.onload = getListe;
    xhr.send();
}

function getListe(){
    let reponse = JSON.parse(this.responseText);
    let ul = "";

    for(let ville of reponse){
    ul += `<li>${ville.vilLib}</li>`;
    }

document.getElementById("listeVilles").innerHTML = ul;
}

function ajouterVille(f){
    let ville = f.ville.value;
    let code = f.codePostal.value;

    envoyerRequete(ville, code);
    return false;
}

function envoyerRequete(ville, code){
    let xhr = new XMLHttpRequest();
    xhr.open('get', `http://localhost:81/ajoutVille?libVille=${ville}&codePostal=${code}`, true);
    xhr.onload = callBack;
    xhr.send()
    
}

function callBack(){
    console.log("action menée avec succès !");
}



function ajouterPersonne(d){
    let prenom = d.prenom.value;
    let nom = d.nom.value;
    let date = d.naissance.value;
    let sexe = d.sexe.value;

    console.log(prenom, nom, date, sexe);
    sendRequete(prenom, nom, date, sexe);
    return false;
}

function sendRequete(prenom, nom, date, sexe){
    let xhr = new XMLHttpRequest();
    xhr.open = ('get', `http://localhost:81/ajoutPersonne?nom=${nom}&prenom=${prenom}&naissance=${date}&sexe=${sexe}`, true );
    xhr.onload = callBack;
    xhr.send();
}

