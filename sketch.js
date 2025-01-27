let userInput;
let button;
let userLine;

let poem = [];

function setup() {
  createCanvas(450, 400);
  background(20,100,200);
  userInput = createInput();
  text(str('will generate a yellow duck shaped poem based on the prompt'),40,30);
  userInput.position(40,50);
  button = createButton('add to poem');
  button.position(userInput.x, userInput.y + 21);
  button.mousePressed(newLine);
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
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.l = size;// unit length to standardise the size of the ducks
    this.grows = 1; //operator to control zoom fucntion
    this.z = random(width/6); //zoom variable for duck zoom rate
  }
  show(){
    // body
    stroke(this.r,this.g,this.b);
    fill(this.r,this.g,this.b);
    circle(this.x,this.y,this.l);
    circle(this.x+(4.5*this.l/5),this.y+(4*this.l/5),this.l);
    ellipse(this.x+(2*this.l/5),this.y+this.l,this.l*2,this.l+(this.l/5));
    //bill
    stroke(this.r,this.g,this.b);
    fill(this.r,this.g,this.b);
    ellipse(this.x-(2*this.l/5),this.y,(3*this.l/5),this.l/5);
    ellipse(this.x-(1.5*this.l/5),this.y-(this.l/10),(1.5*this.l/5),this.l/10);
    // duck eyes
      //eye white
      stroke(this.r,this.g,this.b);
      fill(this.r,this.g,this.b);
    circle(this.x+(this.l/5),this.y-(this.l/10),(1.1*this.l/5));
      // eye black
      stroke(this.r,this.g,this.b);
      fill(this.r,this.g,this.b);
    circle(this.x+(1.2*this.l/5),this.y-(1*this.l/5),this.l/10);
  }
}

function draw() {
  duck = new Duck(170,180,125);
  writePoem();
}

function newLine(){
  poem = [];
  userLine = userInput.value();
  userInput.value('');
  let words = RiTa.tokenize(userLine); // tokenize into an array
  space1 = [8,6,0,6,7,9,6,4,4,5,9,9,9];
  char1 =  [10,13,17,14,11,23,28,28,26,25,24,20];
  space2 = [0,0,0,0,6,0,0,0,0,0,0,0,0];
  char2 =  [0,0,0,0,5,0,0,0,0,0,0,0,0];
  n = '';
  pattern = ['in','rp','nn','cc','rb', 'vb', 'in', 'prp', 'nn', 'vb']; // compare against suggested pattern to see if they gave any valid words
  p = ['in','rp','nn','cc','rb', 'vb', 'in', 'prp', 'nn', 'vb']; // use user input to generate words
  posN = 0;
  //        Article (rp?), Adjective(jj); Noun(nn); Verb(vb);
  // Preposition(in); Article(rp?); Noun(nn); Conjunction(cc);Adverb(rb);
  // Verb(vb); Preposition(in); Pronoun(prp); Noun(nn); Verb(vb);
  response = '';
  r = '';
  //poem.push(userLine); // add to poem
  https://rednoise.org/rita/reference/RiTa/isNoun/index.html
  for (w = 0; w < words.length; w++){
    if (RiTa.isAdjective(words[w])){
      // https://rednoise.org/rita/reference/RiTa/isAdjective/index.html
      p[4] = words[w];
    } if (RiTa.isAdverb(words[w])){
      // https://rednoise.org/rita/reference/RiTa/isAdverb/index.html
      p[3] = words[w];
    } if (RiTa.isNoun(words[w])){
      // https://rednoise.org/rita/reference/RiTa/isNoun/index.html
      p[2] = words[w];
    } if (RiTa.isVerb(words[w])){
      // https://rednoise.org/rita/reference/RiTa/isVerb/index.html
      p[5] = words[w];
    } else {
      p[random[9]] = words[w];
      // poem.push(words[w]);
    }
    response += RiTa.randomWord({ pos: "vb"},{ numSyllables: 5, maxLength: char1[w]});
  }

  for (l=0;l<11;l++){
    response = '';
    for (s = 0; s < space1[l]; s++){
      response += ' ';
    }
    while (char1[l] > 0){
      if (p[posN] == pattern[posN]){
        n = RiTa.randomWord({ pos: pattern[posN]},{ maxLength: int(char1[l]+3)});
      } else {
        n = p[posN];
      }
      n += ' ';
      posN ++;
      response += n;
      char1[l] -= (n.length);
    }
    for (s = 0; s < space2[l]; s++){
      response += ' ';
    }
    while (char2[l] > 0){
      if (p[posN] == pattern[posN]){
        n = RiTa.randomWord({ pos: pattern[posN]},{ maxLength: int(char2[l]+5)});
      } else {
        n = p[posN];
      }
      n += ' ';
      posN ++;
      response += n;
      char2[l] -= (n.length);
    }
  poem.push(response);
  }
}

function writePoem(){
  background(20,100,200);
  duck.show();
  for (x = 0; x < poem.length; x++){
    fill(255,255,0);
    textSize(18);
    text(poem[x],90,140 + x * 20);
  }
}