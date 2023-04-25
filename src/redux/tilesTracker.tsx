import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { shuffle } from '../utils/arrayShuffle'

export type TileCouple = {
  firstTileId: string,
  secondTileId: string
}

export type Tile = {
  id: string,
  value: number,
  flipped: boolean,
  solved: boolean
}

export type tilesState = {
  selectedTileId: string | null, 
  tiles: Tile[]
}

const initialState: tilesState = {
  selectedTileId: null,
  tiles: generateTiles(),
}

function generateTiles() {
  const tiles = []
  for (let i = 0; i < 8; i++) {
    tiles.push({id: nanoid(), value: i, solved: false, flipped: false})
    tiles.push({id: nanoid(), value: i, solved: false, flipped: false})
  }
  //Shuffle our tiles we don't want an easy game
  return shuffle(tiles)
}

export const tilesSlice = createSlice({
  name: 'tilesTracker',
  initialState,
  reducers: {
    selectTile: (state, action: PayloadAction<string | null>) => {
      state.selectedTileId = action.payload
    },
    flipTile: (state, action: PayloadAction<string>) => {
      const tile = state.tiles.find(tile => tile.id === action.payload)
      tile && (tile.flipped = !tile.flipped)
    },
    markCompleted: (state, action: PayloadAction<TileCouple>) => {
      const firstTile = state.tiles.find(tile => tile.id === action.payload.firstTileId)
      const secondTile = state.tiles.find(tile => tile.id === action.payload.secondTileId)

      firstTile && (firstTile.solved = true)
      secondTile && (secondTile.solved = true)
    },
    resetGame: (state) => {
      state.selectedTileId = null
      state.tiles = generateTiles()
    },
  },
})

// Action creators are generated for each case reducer function
export const { selectTile, flipTile, markCompleted, resetGame } = tilesSlice.actions

export const selectTileById = createSelector(
  [
    (state) => state.tilesTracker.tiles, 
    (state, id) => id
  ],
  (tiles, id) => {
    return tiles.find((tile: Tile) => tile.id === id)
  }
)

export default tilesSlice.reducer