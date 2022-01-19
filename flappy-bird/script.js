import { update ,draw,yB,birdSetup} from "./bird.js";
import {update as upPil,pillars,score,setScore} from "./pillar.js";

const titre = document.querySelector("h1");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const h2 = document.querySelector("h2");
var best = 0;
const p = document.createElement("p");


var lastRenderTime;
const SPEED = 55   //Definit la vitesse d'update du jeu (1= une update/sec)
var index = 0; //utile pour animer les sprites et le background

function main (currentTime){
    
    if (lastRenderTime==null){
        lastRenderTime = currentTime; //ligne 19 à 29 sert à appeler fonction main tout les x temps (x depend de la variable SPEED)
        window.requestAnimationFrame(main);
        return;
    }
    const deltaSec = (currentTime - lastRenderTime);
   
    window.requestAnimationFrame(main);
    
    if(deltaSec<(1/SPEED)*1000) return; //si deltaSec plus petit que notre vitesse d'update voulu, on ne fait rien
    
    lastRenderTime = currentTime;

    if(checkLose()){  //Gere le cas ou le joueur a perdu
        titre.classList.remove("hide")
        titre.innerText="press any key to restart";
        if (score>best){best=score;}
        p.innerText=`best score : ${best}`;
        titre.appendChild(p);
        document.addEventListener("keypress",start,{once:true})

    }
    else{ //si pas perdu on joue en mettant a jour 
        h2.innerText=`score : ${score}`;
        update(deltaSec);
        draw(index);
        upPil(deltaSec);
        index++;
    }
}

function start(){ //demarre le jeu en positionnant l'oiseau et mettant le score à 0
    birdSetup();
    setScore(0);
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for (var i = 0; i <4;i++){ //on enleve tout les anciens pilliers lorsqu'on commence un nouveau jeu

        pillars.shift()
    }
    h2.classList.remove("hide");
    titre.classList.add("hide");
    canvas.classList.remove("hide");
    window.requestAnimationFrame(main)
}
function checkLose(){ //regarde s'il y a une collision entre l'oiseau et un pilier
    if(yB>canvas.height-32) return true;
    if (pillars[0] != undefined){
        if((pillars[0].pos<70 && pillars[0].pos>38) && (yB<pillars[0].taille-56 || yB>pillars[0].taille+53  )) return true;

    }
}

document.addEventListener("keydown",start,{once:true})
