import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./components/Winning_Combination";






const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];



function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const[player, setPlayer] = useState({
    X: 'player1',
    O: 'player2',
  });
  const[gameTurns, setGameTurns] = useState([]);
 // const [activePlayer , setActivePlayer] = useState('X');
 const activePlayer = deriveActivePlayer(gameTurns);

 let gameBoard =[...initialGameBoard.map(array => [...array])] ;
 for(const turn of gameTurns){
     const{square , player} = turn;
     const{row,col} = square;

     gameBoard[row][col]= player;
 

 }
let winner;
const hasDraw = gameTurns.length === 9 && !winner;



 for(const combination of WINNING_COMBINATIONS){
   const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
   const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
   const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    

  if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
    winner = player[firstSquareSymbol];
  }
 }
  


  function handleSelectSquare(rowIndex , colIndex){
    //setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns((pervTurns) => {
      const currentPlayer = deriveActivePlayer(pervTurns);
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...pervTurns,];
      return updatedTurns;
    });
    
   
   
  }
  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayer((prevPlayer) => {
      return{
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="player1" symbol="X" 
          isActive={activePlayer==='X'} 
          onChangeName={handlePlayerNameChange}/>

          <Player  name="Player2" symbol="O" 
          isActive={activePlayer==='O'} 
          onChangeName={handlePlayerNameChange}/>

        </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} 
        board={gameBoard}/>

      </div>
     <Log turns={gameTurns}></Log>
    </main>

   




   
  )
    
  
}

export default App
 