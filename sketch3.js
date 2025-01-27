let userInput;
let button;
let userLine;

let poem = [];

function setup() {
  createCanvas(400, 400);
  userInput = createInput();
  text(str(userInput.height),20,20);
  userInput.position(40,50);
  button = createButton('add to poem');
  button.position(userInput.x, userInput.y + 21);
  button.mousePressed(newLine);
}

function draw() {
  background(20,100,200);
  writePoem();
}

function newLine(){
  userLine = userInput.value();
  userInput.value('');
  let words = RiTa.tokenize(userLine); // tokenize into an array
  p = ['in','rp','nn','cc','rb', 'vb', 'in', 'prp', 'nn', 'vb']; // use user input to generate words
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
    response += RiTa.randomWord({ pos: "vb"},{ numSyllables: 5, maxLength: 8});
  }
  space1 = [5,3,0,3,4,6,3,1,1,2,6];
  char1 =  [10,13,17,14,11,23,28,28,26,17];
  space2 = [0,0,0,0,4,0,0,0,0,0,0];
  char2 =  [0,0,0,0,9,0,0,0,0,0,0];
  n = '';
  pattern = ['in','rp','nn','cc','rb', 'vb', 'in', 'prp', 'nn', 'vb']; // compare against suggested pattern to see if they gave any valid words
  posN = 0;

  // for (l=0;l<space1.length;l++){
  //   response = '';
  //   for (s = 0; s < space1[l]; space++){
  //     response += ' ';
  //   }
  //   poem.push('HAHA')
  //   while (char1[l] > 1){
  //     n += RiTa.randomWord({ pos: pattern[posX]},{ numSyllables: 1, maxLength: char1[l]});
  //     n += ' ';
  //     char1[l] -= (n.length);
  //     posN ++;
  //     response += n;
  //     poem.push(str(char1[0]));
  //   }
  // poem.push('JKJK')

  // }

// ########################################################################### janky hard code vvv
// line 1: 01234Xxxxxxxxx14
n = '';
response = '';
l = 0;
while (char1[l] > 0){
  if (p[posN] == pattern[posN]){
    n = RiTa.randomWord({ pos: pattern[posN]},{ numSyllables: 1, maxLength: char1[l]});
  } else {
    n = p[posN];
  }
  n += ' ';
  posN ++;
  response += n;
  char1[l] -= (n.length);
}
poem.push('     '+ response);
  n = '';

  // line 2: 012Xxxxxxxxxxxxx15
n = '';
response = '';
l = 1;
while (char1[l] > 0){
  if (p[posN] == pattern[posN]){
    n = RiTa.randomWord({ pos: pattern[posN]},{ numSyllables: 1, maxLength: char1[l]});
  } else {
    n = p[posN];
  }
  n += ' ';
  posN ++;
  response += n;
  char1[l] -= (n.length);
}
poem.push('A   '+ response);
  n = '';
// response = '';
// for (l = 0; l < 9; l++){
//   n = '';
//   response = '';
//   //poem.push(l);
//   // space = '';
//   for (s = 0; s < space1.length; s++){
//     n += ' ';
//   }
//   while (char1[l] > 0){
//     if (p[l] == pattern[l]){
//       n += RiTa.randomWord({ pos: pattern[l]},{ numSyllables: 1, maxLength: char1[l]});
//     } else {
//       n += p[l];
//     }
//     n += ' ';
//     posN ++;
//     response += n;
//     char1[l] -= (n.length);
//     // poem.push([l]+' - '+n + ' = ' + str(char1[l])+ ' Bool = ' + str(char1[l] > 0));
//     // poem.push(str(char1[l]));
//   }
//   poem.push(response);
// }
// //line 3: Xxxxxxxxxxxxxxxxxx17
// response = '';
// response += RiTa.randomWord({ pos: "nn"},{ numSyllables: 3, maxLength: 8});
// response += ' ';
// response += RiTa.randomWord({ pos: "vb"},{ numSyllables: 3, maxLength: 8});
// poem.push(response);
// //line 4: 012Xxxxxxxxxxxxxx16
// response = '   ';
// response += RiTa.randomWord({ pos: "in"},{ numSyllables: 3, maxLength: 7});
// response += ' ';
// response += RiTa.randomWord({ pos: "rp"},{ numSyllables: 3, maxLength: 8});
// poem.push(response);
// //line 5: 0123Xxxxxxxxxx1418xxxxxxx27
// response = '    ';
// response += RiTa.randomWord({ pos: "nn"},{ numSyllables: 3, maxLength: 11});
// response += '     ';
// response += RiTa.randomWord({ pos: "cc"},{ numSyllables: 3, maxLength: 9});
// poem.push(response);
// //line 6: 012345Xxxxxxxxxxxxxxxxxxxxx28
// response = '      ';
// response += RiTa.randomWord({ pos: "rb"},{ numSyllables: 3, maxLength: 7});
// response += ' ';
// response += RiTa.randomWord({ pos: "vb"},{ numSyllables: 3, maxLength: 4});
// response += ' ';
// response += RiTa.randomWord({ pos: "in"},{ numSyllables: 3, maxLength: 8});
// response += ' ';
// response += RiTa.randomWord({ pos: "prp"},{ numSyllables: 3, maxLength: 9});
// poem.push(response);
// //012Xxxxxxxxxxxxxxxxxxxxxxxxxxx30
// response = '   ';
// response += RiTa.randomWord({ pos: "nn"},{ numSyllables: 3, maxLength: 11});
// response += '     ';
// response += RiTa.randomWord({ pos: "cc"},{ numSyllables: 3, maxLength: 16});
// poem.push(response);
// // 0Xxxxxxxxxxxxxxxxxxxxxxxxxxxxx30
// response = ' ';
// response += RiTa.randomWord({ pos: "nn"},{ numSyllables: 3, maxLength: 11});
// response += '     ';
// response += RiTa.randomWord({ pos: "cc"},{ numSyllables: 3, maxLength: 19});
// poem.push(response);
// //0Xxxxxxxxxxxxxxxxxxxxxxxxxxxx28
// response = ' ';
// response += RiTa.randomWord({ pos: "in"},{ numSyllables: 3, maxLength: 12});
// response += ' ';
// response += RiTa.randomWord({ pos: "vb"},{ numSyllables: 3, maxLength: 15});
// poem.push(response);
// //01Xxxxxxxxxxxxxxxxxxxxxxxxx27
// response = '  ';
// response += RiTa.randomWord({ pos: "prp"},{ numSyllables: 3, maxLength: 10});
// response += ' ';
// response += RiTa.randomWord({ pos: "cc"},{ numSyllables: 3, maxLength: 9});
// poem.push(response);
// //012345Xxxxxxxxxxxxxxxxx22     
// response = '      ';
// response += RiTa.randomWord({ pos: "nn"},{ numSyllables: 3, maxLength: 10});
// response += ' ';
// response += RiTa.randomWord({ pos: "cc"},{ numSyllables: 3, maxLength: 7});
// poem.push(response);   
// ########################################################################### janky hard code ^^^



// // ########################################################################### janky hard code vvv
// // line 1: 01234Xxxxxxxxx14
// response = '     ';
// response += RiTa.randomWord({ pos: "rp"},{ numSyllables: 1, maxLength: 10});
// poem.push(response);
// //line 2: 012Xxxxxxxxxxxxx15
// response = '   ';
// response += RiTa.randomWord({ pos: "jj"},{ numSyllables: 3, maxLength: 13});
// poem.push(response);
// //line 3: Xxxxxxxxxxxxxxxxxx17
// response = '';
// response += RiTa.randomWord({ pos: "nn"},{ numSyllables: 3, maxLength: 8});
// response += ' ';
// response += RiTa.randomWord({ pos: "vb"},{ numSyllables: 3, maxLength: 8});
// poem.push(response);
// //line 4: 012Xxxxxxxxxxxxxx16
// response = '   ';
// response += RiTa.randomWord({ pos: "in"},{ numSyllables: 3, maxLength: 7});
// response += ' ';
// response += RiTa.randomWord({ pos: "rp"},{ numSyllables: 3, maxLength: 8});
// poem.push(response);
// //line 5: 0123Xxxxxxxxxx1418xxxxxxx27
// response = '    ';
// response += RiTa.randomWord({ pos: "nn"},{ numSyllables: 3, maxLength: 11});
// response += '     ';
// response += RiTa.randomWord({ pos: "cc"},{ numSyllables: 3, maxLength: 9});
// poem.push(response);
// //line 6: 012345Xxxxxxxxxxxxxxxxxxxxx28
// response = '      ';
// response += RiTa.randomWord({ pos: "rb"},{ numSyllables: 3, maxLength: 7});
// response += ' ';
// response += RiTa.randomWord({ pos: "vb"},{ numSyllables: 3, maxLength: 4});
// response += ' ';
// response += RiTa.randomWord({ pos: "in"},{ numSyllables: 3, maxLength: 8});
// response += ' ';
// response += RiTa.randomWord({ pos: "prp"},{ numSyllables: 3, maxLength: 9});
// poem.push(response);
// //012Xxxxxxxxxxxxxxxxxxxxxxxxxxx30
// response = '   ';
// response += RiTa.randomWord({ pos: "nn"},{ numSyllables: 3, maxLength: 11});
// response += '     ';
// response += RiTa.randomWord({ pos: "cc"},{ numSyllables: 3, maxLength: 16});
// poem.push(response);
// // 0Xxxxxxxxxxxxxxxxxxxxxxxxxxxxx30
// response = ' ';
// response += RiTa.randomWord({ pos: "nn"},{ numSyllables: 3, maxLength: 11});
// response += '     ';
// response += RiTa.randomWord({ pos: "cc"},{ numSyllables: 3, maxLength: 19});
// poem.push(response);
// //0Xxxxxxxxxxxxxxxxxxxxxxxxxxxx28
// response = ' ';
// response += RiTa.randomWord({ pos: "in"},{ numSyllables: 3, maxLength: 12});
// response += ' ';
// response += RiTa.randomWord({ pos: "vb"},{ numSyllables: 3, maxLength: 15});
// poem.push(response);
// //01Xxxxxxxxxxxxxxxxxxxxxxxxx27
// response = '  ';
// response += RiTa.randomWord({ pos: "prp"},{ numSyllables: 3, maxLength: 10});
// response += ' ';
// response += RiTa.randomWord({ pos: "cc"},{ numSyllables: 3, maxLength: 9});
// poem.push(response);
// //012345Xxxxxxxxxxxxxxxxx22     
// response = '      ';
// response += RiTa.randomWord({ pos: "nn"},{ numSyllables: 3, maxLength: 10});
// response += ' ';
// response += RiTa.randomWord({ pos: "cc"},{ numSyllables: 3, maxLength: 7});
// poem.push(response);   
// // ########################################################################### janky hard code ^^^
}

function writePoem(){
  for (x = 0; x < poem.length; x++){
    textSize(18);
    text(poem[x],30,150 + x * 20);
  }
}