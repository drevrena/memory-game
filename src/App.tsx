
import { useDispatch, useSelector } from "react-redux"
import { resetGame } from "./redux/tilesTracker"
import { RootState } from "./main"
import { Key } from "react"
import Confetti from 'react-confetti'
import Tile from "./components/Tile"

function App() {
  const tiles = useSelector((state: RootState) => state.tilesTracker.tiles)
  const completed = tiles.every(tile => tile.solved)
  const dispatch = useDispatch()


  function handleReset() {
    dispatch(resetGame())
  }

  return (
    <div className="w-full min-h-screen bg-stone-800 text-gray-200  flex flex-col items-center justify-center">
      
      <h1 className="font-Gamefont font-semibold text-4xl my-4">Cards Game</h1>
      {completed && 
      <>
        <Confetti/>
        <button onClick={handleReset} className="text-2xl font-semibold border-2 rounded-md px-4 py-2">Play Again!</button>
      </>}
      <div className="m-4 max-w-6xl grid grid-cols-4 gap-2">
        {tiles.map(val => <Tile key={val.id as Key} {...val}/>)}
      </div>
    </div>
  )
}

export default App
