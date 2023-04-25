import ReactCardFlip from 'react-card-flip';
import { cards } from "../data/cardData.js"
import { useDispatch, useSelector } from "react-redux"
import { flipTile, markCompleted, selectTile, selectTileById } from "../redux/tilesTracker"
import { RootState } from "../main"

type Props = {
    id: string,
    value: number,
    solved: boolean
}

function Tile({id, value, solved} : Props) {
    const selectedId = useSelector((state: RootState) => state.tilesTracker.selectedTileId)
    const isFlipped: boolean = useSelector((state: RootState) => selectTileById(state, id).flipped)
    const selectedTile = useSelector((state: RootState) => selectTileById(state, selectedId))
    const dispatch = useDispatch()

    function handleTileClick() {
        //Clicking on a solved tile should do nothing.
        if(solved)
            return

        if(selectedId === id) {
            //Double clicked same tile, tile is no more selected
            dispatch(flipTile(id))
            dispatch(selectTile(null))
        } else if (selectedId != null) {
            //There's one tile selected let's check if it's the correct one
            if(selectedTile.value === value) {
                dispatch(markCompleted({ firstTileId: id, secondTileId: selectedTile.id}))
                dispatch(flipTile(id))
                dispatch(selectTile(null))
            } else {
                //Tile is not corresponding, we will flip back both
                const toFlipAfter = selectedId
                dispatch(flipTile(id))
                dispatch(selectTile(null))
                setTimeout(() => {
                    dispatch(flipTile(id))
                    dispatch(flipTile(toFlipAfter))
                }, 750)
            }
        } else {
            //There's no tile selected
            dispatch(flipTile(id))
            dispatch(selectTile(id))
        }
    }


    return (
        <div onClick={handleTileClick} className="w-full border-4 border-slate-400 rounded-md">
            <ReactCardFlip isFlipped={!isFlipped} flipDirection="horizontal">
            <div className=" bg-slate-700">
                <img className="w-full" src={cards[value]} draggable="false" alt="Card background"/>
            </div>
            <div className="w-full flex justify-center">
                <img className="w-full" src="./images/card-back.jpg" draggable="false" alt="Card background"/>
            </div>
            </ReactCardFlip>
        </div>
    )
}

export default Tile