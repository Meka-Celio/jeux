class Battlers {
    constructor(name, priority) {
        this.name       = name
        this.priority   = priority
    }
}


// Fonctions 
function initVIE (niveau) {
    let pv_chevalier    = 0
    let pv_dragon       = 0
    let min             = 0
    let max             = 0

    switch (niveau) {
        case "0":
            min = 200
            max = 250
            pv_chevalier = Math.floor(Math.random() * (max - min +1)) + min;

            min = 150
            max = 200
            break;
        case "1":
            min = 200
            max = 250
            pv_chevalier = Math.floor(Math.random() * (max - min +1)) + min;
            
            min = 200
            max = 250
            break;
        case "2":
            min = 150
            max = 200
            pv_chevalier = Math.floor(Math.random() * (max - min +1)) + min;
            
            min = 200
            max = 250
            break;
    }
    pv_dragon = Math.floor(Math.random() * (max - min +1)) + min;
    return [pv_chevalier, pv_dragon]
}

function getArmureName (armure) {
    let name_armor = ""

    switch (armure) {
        case "0":
            name_armor = "Armure de Cuivre"
            break;
        case "1":
            name_armor = "Armure en Fer"
            break;
        case "2":
            name_armor = "Armure Magique"
            break;
    }
    return name_armor
}

function getArmeName (arme) {
    let name_weapon = ""

    switch (arme) {
        case "0":
            name_weapon = "Epée en Bois"
            break;
        case "1":
            name_weapon = "Epée d'Acier"
            break;
        case "2":
            name_weapon = "Epée sacrée Excalibur"
            break;
    }
    return name_weapon
}

function getPriority () {
    return Math.floor(Math.random() * (5 - 1 +1)) + 1;
}

function getDamage (niveau) {
    let dmg_knight = 0
    let dmg_dragon = 0

    switch (niveau) {
        case "0":
            dmg_knight = Math.floor(Math.random() * (30 - 25 +1)) + 25;
            dmg_dragon = Math.floor(Math.random() * (20 - 10 +1)) + 10;
            break;
        case "1":
            dmg_knight = Math.floor(Math.random() * (20 - 15 +1)) + 15;
            dmg_dragon = Math.floor(Math.random() * (30 - 20 +1)) + 20;
            break;
        case "2":
            dmg_knight = Math.floor(Math.random() * (10 - 5 +1)) + 5;
            dmg_dragon = Math.floor(Math.random() * (30 - 20 +1)) + 20;
            break;
    }
    return [dmg_knight, dmg_dragon]
}

function infligeDegat (dmg, arme) {
    let pntArme = 0;

    switch (arme) {
        case "0": 
            pntArme = Math.floor((50/100) * (-1))
            break;
        case "1": 
            pntArme = 0
            break;
        case "2": 
            pntArme = Math.ceil((50/100))
            break;
    }

    return dmg + pntArme
}

function recevoirDegat (dmg, armure) {
    let pntArmure = 0

    switch (armure) {
        case "0": 
            pntArmure = 0
            break;
        case "1": 
            pntArmure = Math.ceil((25/100))
            break;
        case "2": 
            pntArmure = Math.ceil((50/100))
            break;
    }
    return dmg - pntArmure
}

function pvRestant (pv, dmg) {
    return pv - dmg
}

function infligeDegatsNotification (dragon_name, pv_dragon, dmgInf) {
    return `Vous attaquez ! <br> Vous infligez ${dmgInf} points de dégats à ${dragon_name}, il lui reste ${pv_dragon} PV !<br>`;
}

function recevoirDegatNotification (pv_knight, dmgRec) {
    return `Le dragon attaque ! <br> Vous recevez ${dmgRec} points de dégats, il vous reste ${pv_knight} PV !<br>`
}


// Main
// Quand on clique sur valider, les points de vie sont distibués aux personnages.
//  Quand on lance la partie :
/**  
 * 1 : on désigne le plus rapide des deux personnages, il attaque en premier pour tous les tours
 * 2 : les personnages attaque chacun leur tour
 * 3 : Les degats infligé change à chaque attaque
*/


// Les personnages 
let knight = new Battlers('Luk Skriptwalker', 0)
let dragon = new Battlers('Javawan the Bug', 0)

// Select
let option_difficulte   =   document.getElementById('difficulty')
let option_armure       =   document.getElementById('armor')
let option_arme         =   document.getElementById('sword')

// Bouton valider
let btnOption           =   document.getElementById('btn_option')
// Bouton start
let btnStart            =   document.getElementById('btn_start')
btnStart.style.display = "none"

// Les paramètres
let niveau  =   option_difficulte.value
let arme    =   option_arme.value
let armure  =   option_armure.value
let activePriority = false

// Variables pour le programme
let pv_knight   = 0
let pv_dragon   = 0
let nbr_tour    = 1

// Quand on change la valeur des select
option_difficulte.addEventListener('change', () => {
    niveau = option_difficulte.value
})
option_arme.addEventListener('change', () => {
    arme = option_arme.value
})
option_armure.addEventListener('change', () => {
    armure = option_armure.value
})

// click sur le bouton valider
btnOption.addEventListener('click', () => {
    let pv      = initVIE(niveau) // return [pv_knight, pv_dragon]
    let weapon  = getArmeName(arme)
    let armor   = getArmureName(armure)
    
    // Les affichages
    let aff_vie_knight      =   document.getElementById('pv_knight')
    let aff_vie_dragon      =   document.getElementById('pv_dragon')
    let aff_armor           =   document.getElementById('armor_knight')
    let aff_sword           =   document.getElementById('sword_knight')

    // Affichage des paramètres pour les joueurs
    aff_vie_knight.innerHTML = pv[0]
    aff_vie_dragon.innerHTML = pv[1]
    aff_armor.innerHTML = armor
    aff_sword.innerHTML = weapon

    // Répartition points de vie
    pv_knight = pv[0]
    pv_dragon = pv[1]

    btnOption.style.display = "none"
    btnStart.style.display = "block"
})

btnStart.addEventListener('click', () => {

    // 1 - Désigner le personnage le plus rapide
    if (!activePriority) {
        knight.priority = getPriority()
        dragon.priority = getPriority()
        activePriority = true

        while(knight.priority == dragon.priority) {
            knight.priority = getPriority()
            dragon.priority = getPriority()
        }
    }  

    //  Pour affichage
    let aff_vie_knight      =   document.getElementById('pv_knight')
    let aff_vie_dragon      =   document.getElementById('pv_dragon')
    let aff_battle_screen   =   document.getElementById('battle_screen')

    // Répartition des pnt de dégats
    let damages = getDamage(niveau) // return [dmg_knight, dmg_dragon]

    let dmg_knight = damages[0]
    let dmg_dragon = damages[1]

    //  Les dégats
    let dmgInf = infligeDegat(dmg_knight, arme)
    let dmgRec = recevoirDegat(dmg_dragon, armure)

    // Combat
    // Si le chevalier commence
    if (knight.priority > dragon.priority) {
        aff_battle_screen.innerHTML = `---------- Tour ${nbr_tour} ---------- <br><p>${knight.name}: ${pv_knight}<br>${dragon.name} : ${pv_dragon}</p><br>`

            // attaque du chevalier
            pv_dragon = pvRestant(pv_dragon, dmgInf)
            aff_vie_dragon.innerHTML = pv_dragon
            aff_battle_screen.innerHTML += "Vous êtes le plus rapide <br>"+infligeDegatsNotification(dragon.name, pv_dragon, dmgInf)

            // Verifier si le dragon est mort
            if (pv_dragon <= 0) {
                pv_dragon = 0
                aff_battle_screen.innerHTML = "Vous avez terrassé le terrible ***Javawan the Bug*** et délivrez la princesse !"
                aff_vie_dragon.innerHTML = pv_dragon
                btnStart.style.display = "none"
                return
            }

            // attaque du dragon
            pv_knight = pvRestant(pv_knight, dmgRec)
            aff_vie_knight.innerHTML = pv_knight
            aff_battle_screen.innerHTML += recevoirDegatNotification(pv_knight, dmgRec)

            if (pv_knight <= 0) {
                pv_knight = 0
                aff_battle_screen.innerHTML = "***Javawan the Bug*** a gagné, vous avez été carbonisé ! La princesse restera sa captive pour les 1000 ans à venir."
                aff_vie_knight.innerHTML = pv_knight
                btnStart.style.display = "none"
                return
            }

    } else {
        aff_battle_screen.innerHTML = `---------- Tour ${nbr_tour} ---------- <br><p>${knight.name}: ${pv_knight}<br>${dragon.name} : ${pv_dragon}</p><br>`

        // Attaque du dragon
        aff_battle_screen.innerHTML += "Le dragon est plus rapide <br>"
        pv_knight = pvRestant(pv_knight, dmgRec)
        aff_vie_knight.innerHTML = pv_knight
        aff_battle_screen.innerHTML += recevoirDegatNotification(pv_knight, dmgRec)

        if (pv_knight <= 0) {
            pv_knight = 0
            aff_battle_screen.innerHTML = "***Javawan the Bug*** a gagné, vous avez été carbonisé ! La princesse restera sa captive pour les 1000 ans à venir."
            aff_vie_knight.innerHTML = pv_knight
            btnStart.style.display = "none"
            return
        }

        // attaque du chevalier
        pv_dragon = pvRestant(pv_dragon, dmgInf)
        aff_vie_dragon.innerHTML = pv_dragon
        aff_battle_screen.innerHTML += "Vous êtes le plus rapide <br>"+infligeDegatsNotification(dragon.name, pv_dragon, dmgInf)
        
        if (pv_dragon <= 0) {
            pv_dragon = 0
            aff_battle_screen.innerHTML = "Vous avez terrassé le terrible ***Javawan the Bug*** et délivrez la princesse !"
            aff_vie_dragon.innerHTML = pv_dragon
            btnStart.style.display = "none"
            return
        }
    }
    nbr_tour++
})
