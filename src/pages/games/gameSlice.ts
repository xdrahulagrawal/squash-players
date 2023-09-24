import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameFormTable } from './type';

interface GameSliceState {
    gameList: GameFormTable[];
    gameId: number;
}

const initialState: GameSliceState = {
    gameList: [],
    gameId:0
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameListAction: (state, action: PayloadAction<GameFormTable[]>) => {
            state.gameList = action.payload;
        },
        setGameIdAction: (state, action: PayloadAction<number>) => {
            state.gameId = action.payload;
        },
    },
});

export const { setGameListAction,setGameIdAction} = gameSlice.actions;
export default gameSlice.reducer;
