const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const PILLAR_INTERVAL = 1220; //intervalle a laquelle les piliers apparaissent
const PILLAR_SPEED = 7; //vitesse à laquelle les piliers vont vers la gauche
var timeSinceLastPillar = PILLAR_INTERVAL +1 ;
const pillar = new Image();
pillar.src ="./asset/Pillar.png";
export const pillars = [];
const GAP = 75; //definit l'espace pour l'oiseau
export var score = 0;



function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


export function update(delta){
    if(timeSinceLastPillar>PILLAR_INTERVAL){ //si intervalle depassé, on creer nouveau pillier
        createPillar()
        timeSinceLastPillar = 0;
    }
    if(pillars[0]!=undefined){
      if (pillars[0].pos<30 && pillars[0].pos>23){score++;} //on augmente le score si l'oiseau a depassé le pilier
      if(pillars[0].pos<-10){pillars.shift()} //si pilier sort du canvas, on l'enleve de la liste
    }
    
    pillars.forEach(p =>{ //met a jour la position du pillier en fonction de la PILLAR_SPEED et le dessine
      p.pos = p.pos-PILLAR_SPEED, p.taille;
      draw(p.pos,p.taille)})
    timeSinceLastPillar+=delta;    
}


function createPillar(){
    pillars.push({pos : 500, taille : randomIntFromInterval(100,420)})
}


  function draw(pos,taille){ //dessine pillier avec ses coordonnées
    ctx.drawImage(pillar,0,0,64,320,pos,-42,40,taille);
    ctx.drawImage(pillar,0,0,64,320,pos,taille+GAP,40,canvas.height-taille-GAP);
}

export function setScore(n){ 
  score=n;
}
