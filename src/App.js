//css
import './App.css';

//componentes
import StartScreen from './components/StartScreen';
import GameOver from './components/GameOver';
import Game from './components/Game';


//react
import { useCallback, useEffect, useState} from 'react';

//dados
import { wordsList } from './data/world';

const stages = [ 
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[1].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  
  const pickedWordAndCategory = useCallback(() => {
    //pick random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category);

    //pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);

    return { word, category };
  }, [words]);

  //starts the game
  const startGame = useCallback(() => {
    //clear all letters
    clearLettesStates();
    //picker word and picked category
    const { word, category } = pickedWordAndCategory();

    //create an array of letters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word,category);
    console.log(wordLetters);

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name)
  },[pickedWordAndCategory]);

  //process the letter input
  const verifyLetter = (letter) => {
    
    //console.log(letter)

    const nomalizedLetter = letter.toLowerCase();
    //console.log(nomalizedLetter)

    //check if letter has already been utilized
    if (guessedLetters.includes(nomalizedLetter) ||
      wrongLetters.includes(nomalizedLetter)
    ) {
      return;
    }

    //push guessed letter or remove a guess
    if (letters.includes(nomalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        nomalizedLetter,
      ]);

      // contabilizando o erro
      setGuesses((actualGuesses) => actualGuesses - 1);
      
    };
  };
  console.log(guessedLetters);
  console.log(wrongLetters);

  const clearLettesStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // check if the game ends
  useEffect(() => {

    if(guesses <= 0) {
      //reset
      clearLettesStates();

      setGameStage(stages[2].name);
    }

  }, [guesses]);

  //check win condition
  useEffect(() => {
    //separate the words that repeat ofr 1 letter
    const uniqueLetters = [...new Set(letters)];

    //win
    if(guessedLetters.length === uniqueLetters.length) {
      //add score
      setScore((actualScore) => actualScore += 100)

      //restart game with the new word
      startGame();

    }

  },[guessedLetters, letters, startGame])

  //restart the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name)
  };

  return (

    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && (
      <Game
       verifyLetter={verifyLetter}
       pickedWord={pickedWord}
       pickedCategory={pickedCategory}
       letters={letters}
       guessedLetters={guessedLetters}
       wrongLetters={wrongLetters}
       guesses={guesses}
       score={score}
       />
      )}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
};

export default App;
