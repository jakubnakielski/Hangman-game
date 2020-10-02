let captionsDB = new Array();
captionsDB[0] = "Zs żarki to najlepsza szkoła";
captionsDB[1] = "Zwierzęta";
captionsDB[2] = "wakacje";
captionsDB[3] = "chcę wakacje";
captionsDB[4] = "ekogroszek to węgiel";
captionsDB[5] = "rzemiosło rolnicze";
captionsDB[6] = "akwarystyka ryb";
captionsDB[7] = "bicykl z kołami";
captionsDB[8] = "akwamarynowy statek";
captionsDB[9] = "plexa lepsza od szyby";

// captionsDB = captionsDB.sort((a, b) => {
//   return 0.5 - Math.random();
// });

const randomNumber = Math.floor(Math.random() * 10);
let caption = captionsDB[randomNumber].toUpperCase();

let hashedCaption = "";
let attempts = 0;

const board = document.querySelector(".board");
const alphabet = document.querySelector(".alphabet");
const hangman = document.querySelector(".hangman");
const hangmanAttempts = document.querySelector(".hangman__attempts");
const captionLength = caption.length;

const goodSound = new Audio("sounds/yes.wav");
const badSound = new Audio("sounds/no.wav");

const style = document.createElement("style");
document.head.appendChild(style);

const makeCaption = () => (board.innerHTML = hashedCaption);

for (i = 0; i < captionLength; i++) {
  if (caption.charAt(i) == " ") hashedCaption = hashedCaption + " ";
  else hashedCaption = hashedCaption + "-";
}

const letter = new Array(35);
letter[0] = "A";
letter[1] = "Ą";
letter[2] = "B";
letter[3] = "C";
letter[4] = "Ć";
letter[5] = "D";
letter[6] = "E";
letter[7] = "Ę";
letter[8] = "F"; // REFACTOR THIS
letter[9] = "G";
letter[10] = "H";
letter[11] = "I";
letter[12] = "J";
letter[13] = "K";
letter[14] = "L";
letter[15] = "Ł";
letter[16] = "M";
letter[17] = "N";
letter[18] = "Ń";
letter[19] = "O";
letter[20] = "Ó";
letter[21] = "P";
letter[22] = "Q";
letter[23] = "R";
letter[24] = "S";
letter[25] = "Ś";
letter[26] = "T";
letter[27] = "U";
letter[28] = "V";
letter[29] = "W";
letter[30] = "X";
letter[31] = "Y";
letter[32] = "Z";
letter[33] = "Ż";
letter[34] = "Ź";

const makeAlphabet = () => {
  for (i = 0; i <= 34; i++) {
    alphabet.innerHTML =
      alphabet.innerHTML +
      `<div id="letter${i}" class="letters" onclick="checkLetters(${i})">${letter[i]}</div>`;
    if ((i + 1) % 7 == 0)
      alphabet.innerHTML =
        alphabet.innerHTML + `<div style="clear:both"></div>`;
  }
};

window.addEventListener("load", makeAlphabet);
window.addEventListener("load", makeCaption);

let prevLetter = "";
window.addEventListener("keypress", event => {
  const litera = event.key.toUpperCase();
  const indexOfLetter = letter.indexOf(litera);

  if (litera != prevLetter && hashedCaption != caption && attempts < 8) {
    checkLetters(indexOfLetter);
    prevLetter = litera;
  }
});

String.prototype.setCharAt = function(index, char) {
  if (index > this.length - 1) return this.toString();
  return this.substr(0, index) + char + this.substr(index + 1);
};

const checkLetters = lt => {
  // MAIN CHECKING LETTERS
  let existence = false;
  for (i = 0; i < captionLength + 10; i++) {
    if (caption.charAt(i) == letter[lt]) {
      hashedCaption = hashedCaption.setCharAt(i, letter[lt]);
      existence = true;
    }
  }
  if (existence == true) {
    goodSound.play();
    makeCaption();

    style.sheet.insertRule(`
    #letter${lt} {
        background-color: #27b512;
        cursor: default;
        transform: scale(0.88);
        color: #dfd;
    }
    
    `);
  } else {
    badSound.play();
    attempts++;
    // console.log(caption.includes(litera)); //////////////////
    // if (caption.includes(litera)) {
    hangman.innerHTML = `<img src="img/s${attempts}.jpg" alt=""><p class="hangman__attempts">Pozostało prób: ${8 -
      attempts}</p>`;
    // }

    const myLetter = document.getElementById(`letter${lt}`);
    style.sheet.insertRule(`
    #letter${lt} {
        background-color: #d54732;
        cursor: default;
        transform: scale(0.88);
        color: #fdd;
        
    }
    `);

    if (attempts == 8) {
      alphabet.innerHTML = `<p class="endGame endGame--header">PRZEGRAŁEŚ!<p class="endGame">Poprawne hasło to: <br/><br/> ${caption}</p>
      <p onclick="location.reload()" class="tryAgain">SPRÓBUJ PONOWNIE</p>`;

      style.sheet.insertRule(`
    .alphabet {
      display: flex;
      flex-direction: column;
      align-items: center;
        
    }
    `);
    }
  }

  // console.log(letter.includes(letter[lt]));
  if (lt >= 0) {
    document.getElementById(`letter${lt}`).removeAttribute("onclick"); //fix existence of removeAttribute
  }

  if (hashedCaption == caption) {
    alphabet.innerHTML = `<p class="endGame endGame--header">WYGRAŁEŚ!<p class="endGame">Hasło to: <br/><br/> ${caption}</p>
      <p onclick="location.reload()" class="tryAgain">SPRÓBUJ PONOWNIE</p>`;

    style.sheet.insertRule(`
      .alphabet {
        display: flex;
        flex-direction: column;
        align-items: center;
          
      }
      `);

    document.querySelector(".endGame--header").style.color = "#0a0";
    document.querySelector(".tryAgain").style.color = "#d54732";
    style.sheet.insertRule(`
    .tryAgain::after {
      background-color: #d54732;
    }
    `);
  }
};


document.addEventListener('keydown', (e)=> {
    if(e.code === 'Enter'){
      window.location.reload();
    }
})
