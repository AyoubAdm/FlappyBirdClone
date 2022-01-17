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
var index = 0;

function main (currentTime){
    
    if (lastRenderTime==null){
        lastRenderTime = currentTime;
        window.requestAnimationFrame(main);
        return;
    }
    const deltaSec = (currentTime - lastRenderTime);
   
    window.requestAnimationFrame(main);
    
    if(deltaSec<(1/SPEED)*1000) return;
    
    lastRenderTime = currentTime;

    if(checkLose()){  //Gere le cas ou le joueur a perdu
        titre.classList.remove("hide")
        titre.innerText="press any key to restart";
        if (score>best){best=score;}
        p.innerText=`best score : ${best}`;
        titre.appendChild(p);
        document.addEventListener("keypress",start,{once:true})

    }
    else{
        h2.innerText=`score : ${score}`;
        update(deltaSec);
        draw(index);
        upPil(deltaSec);
        index++;
    }
}

function start(){
    birdSetup();
    setScore(0);
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for (var i = 0; i <4;i++){

        pillars.shift()
    }
    h2.classList.remove("hide");
    titre.classList.add("hide");
    canvas.classList.remove("hide");
    window.requestAnimationFrame(main)
}
function checkLose(){
    if(yB>canvas.height-32) return true;
    if (pillars[0] != undefined){
        if((pillars[0].pos<70 && pillars[0].pos>38) && (yB<pillars[0].taille-56 || yB>pillars[0].taille+53  )) return true;

    }
}

document.addEventListener("keydown",start,{once:true})