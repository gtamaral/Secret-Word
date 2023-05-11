import './StartScreen.css'

const StartScreen = ( {startGame} ) => {
  return (
    <div className="start">
        <h1>Secret Word</h1>
        <p>MAÔEEEE</p>
        <h2>Clique no botao abaixo para começar o jogo</h2>
        <button onClick={startGame}>Começar o jogo</button>
    </div>
  );
};

export default StartScreen;