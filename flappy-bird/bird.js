const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
var GRAVITY = 0.2;
const BIRD_JUMP_DURATION = 100; //durée du saut oiseau
var timeSinceLastJump =BIRD_JUMP_DURATION+1; //permet le saut de l'oiseau
document.addEventListener("keyup", function (e) {if (e.code == "Space") {  timeSinceLastJump =0; GRAVITY =-0.02}}); //on met la gravité a -0.02 pour donner un effet de planement à l'oiseau lorsu'il saute


const birdFly = new Image();
birdFly.src ="./asset/Walk.png";

const background = new Image();
background.src ="./asset/Background.png";


export var yB = canvas.width/4;

export function birdSetup(){
    yB = canvas.width/4
}


export function update (delta) {
    if(timeSinceLastJump < BIRD_JUMP_DURATION){
        yB=yB-(GRAVITY+0.55)*delta;     //inverse la gravité pour faire "sauter" l'oiseau
    }
    else {
         if (yB<-32){yB=-32} //on empeche l'oiseau de monter plus haut que -32 (pour pas qu'il esquive les pilliers en volant par dessus)
        yB=yB+GRAVITY*delta; //l'oiseau tombe par rapport a la gravité
    }
    if (GRAVITY < 0.25){ //si gravité pas au max (car l'oiseau a sauté), la gravité re augmente petit à petit
        GRAVITY+=0.009;
    }
    timeSinceLastJump+=delta;


}

export function draw(index){ // dessine l'oiseau et le background
    ctx.clearRect(0,0,canvas.width,canvas.height);
    animBackground(index);
    animBirdFly(index,yB);
}



function animBirdFly(index){ //anime l'oiseau en lui faisant battre des ailes

    if (index%6<2) {
        ctx.drawImage(birdFly,0,0,32,32,70,yB,32,32);}
    else if (index%6<4){
        ctx.drawImage(birdFly,32,0,32,32,70,yB,32,32);}
    else {
        ctx.drawImage(birdFly,64,0,32,32,70,yB,32,32);}
    
}

function animBackground(index){ //anime le background
    ctx.drawImage(background,0,0,1334,750,(-index*2%canvas.width),0,canvas.width,canvas.height);
    ctx.drawImage(background,0,0,1334,750,(-index*2%canvas.width)+canvas.width,0,canvas.width,canvas.height);
}

