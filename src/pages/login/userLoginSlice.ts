import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDetails {
    id:number,
    authorization:string,
    email:string,
}

const initialState = {
    user: {} as UserDetails
}

const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState,
    reducers: {
        setUserLoginAction: (state, action: PayloadAction<UserDetails>) => ({ ...state, user: action.payload }),
        clearUserLoginAction: () => initialState,
    },
});

export const { setUserLoginAction, clearUserLoginAction } = userLoginSlice.actions;
export default userLoginSlice.reducer;
