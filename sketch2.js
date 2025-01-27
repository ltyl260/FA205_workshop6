let userInput;
let button;
let userLine;

let poem = [];

function setup() {
  createCanvas(400, 400);
  duck = new Duck (-100,-100,50);
  userInput = createInput();
  text(str(userInput.height),20,20);
  userInput.position(40,50);
  button = createButton('add to poem');
  button.position(userInput.x, userInput.y + 21);
  button.mousePressed(newLine);
  rhymeError = 0;
}

class Duck {
  constructor(x,y,size){
    // duck pos x and y
    this.x = y;
    this.y = x;
    // duck movement gradient
    this.t = random(10);
    this.u = random(10);
    // ducks rgb colour variables
    this.r = 255;
    this.g = 255;
    this.b = 0;
    this.l = size;// unit length to standardise the size of the ducks
    this.grows = 1; //operator to control zoom fucntion
    this.z = random(width/6); //zoom variable for duck zoom rate
    this.d = str(0);
  }
  show(){
    // body
    stroke(this.r,this.g,this.b);
    fill(this.r,this.g,this.b);
    circle(this.x,this.y,this.l);
    circle(this.x+(4.5*this.l/5),this.y+(4*this.l/5),this.l);
    ellipse(this.x+(2*this.l/5),this.y+this.l,this.l*2,this.l+(this.l/5));
    //bill
    stroke(this.g, this.b, abs(this.r+100));
    fill(this.g, this.b, abs(this.r+100));
    ellipse(this.x-(2*this.l/5),this.y,(3*this.l/5),this.l/5);
    ellipse(this.x-(1.5*this.l/5),this.y-(this.l/10),(1.5*this.l/5),this.l/10);
    // duck eyes
      //eye white
    stroke(0,0,0);
    fill(0,0,0);
    circle(this.x+(this.l/5),this.y-(this.l/10),(1.1*this.l/5));
      // eye black
    stroke(255,255,255);
    fill(255,255,255);
    circle(this.x+(1.2*this.l/5),this.y-(1*this.l/5),this.l/10);
    // data
    stroke(255,255,255,2)
    fill(0,0,0);
    if ((this.r == 0) && (this.g == 0) && (this.b == 0)){ //if duck is black make text white
      fill(255,255,255)
    }
    textSize(this.l*0.20);
    text((this.d),this.x-(this.l/4),this.y+this.l*1.3)
  }
  move(){
    // movement conditions duck 1
    this.x += this.t;
    if (this.x > width || this.x < 0){
      this.t = this.t * -1;
    }
    this.y += this.u;
    if ((this.y > height || this.y < 0)){ 
      this.u = this.u * -1;
    }
   }
  colour(){
    if ((this.x > width || this.x < 0) || (this.y > height || this.y < 0)){ 
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);
    }
  }

  grow(increment, max){
    if (this.l < max){
      this.l += increment;     
    }    
  }
  shrink(increment, min){
    if (this.l > min){
      this.l += -increment;  
    }
  }
  zoom(a,b, increment = 1){ 
    // start size (a) must be smaller than stop size (b)
    if (this.grows == 1){
      this.grow(1,b);
    } 
    if (this.grows == -1) {
     this.shrink(1,a); 
    }
    if (this.l >= b || this.l <= a){
      this.grows = this.grows * -1;
    }
  }
  animate(){
    this.move();
    this.colour();
    this.zoom(this.z,this.z+100);
    this.show();
  }
  new(x,y,d){ // changed to update x,y,d AND show duck
    this.x = x;
    this.y = y;
    this.d = str(d);
    //this.show();
  }
}

function draw() {
  background(220);
  // if (rhymeError == 1){
  //   duck.new(width*0.6,50,str('no rhymes found'));
  //   duck.animate();
  // } 
  writePoem();
}

function newLine(){
  userLine = userInput.value();
  userInput.value('');

  let words = RiTa.tokenize(userLine); // tokenize into an array
  
//  // workshop part 1
//   let r = floor(random(0,words.length)); // take random word
//   let rhymes = RiTa.rhymesSync(words[r]); // find rhyming word 
//   if (rhymes.length == 0){ // incase RiTa cant find rhymes we dont want code to break
//     poem.push(userLine);
//     rhymeError = 1;
//   } else {
//     rhymeError = 0;
//     let changeWord = random(rhymes); // select rhyming word
//     words[r] = changeWord; // exchange users word with rhyming word
//     userLine = RiTa.untokenize(words); // untokenize our array
//     poem.push(userLine); // add to poem
//   }

//  // workshop part 2
response = '';
poem.push(userLine); // add to poem
// https://rednoise.org/rita/reference/RiTa/isNoun/index.html
for (w = 0; w < words.length; w++){
  if (RiTa.isNoun(words[w])){
    // https://rednoise.org/rita/reference/RiTa/randomWord/index.html
    response += RiTa.randomWord({ pos: "nns"});
  } else {
    response += words[w]
  }
  response += ' ';
}
poem.push(response);

  
}

function writePoem(){
  for (x = 0; x < poem.length; x++){
    textSize(18);
    text(poem[x],40,180 + x * 20);
  }
}