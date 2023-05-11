import './GameOver.css'

const End = ( {retry, score } ) => {
  return (
    <div>
      <h1>
        GameOver
      </h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retry}>resetar o game</button>
    </div>
  )
}

export default End;