import { AxiosResponse } from "axios";
import {  fetcherGet, fetcherPost } from "../../utils/fetcher";
import {GET_GAMES, CREATE_GAME, DELETE_GAME,GET_GAME, EDIT_GAME } from "../../utils/network";
import { GameForm } from "./type";

export const getGameList = async (): Promise<AxiosResponse> => {
    const response = await fetcherGet(`${GET_GAMES}`);
    return response ;
};
export const getGameById = async (gameId:number): Promise<AxiosResponse> => {
    const response = await fetcherGet(`${GET_GAME}/${gameId}`);
    return response ;
};

export const createGameList = async (payload:GameForm): Promise<AxiosResponse> => {
    const response = await fetcherPost(`${CREATE_GAME}`,payload);
    return response ;
};
export const deleteGame = async (gameId:number): Promise<AxiosResponse> => {
    const response = await fetcherPost(`${DELETE_GAME}/${gameId}`);
    return response ;
};
export const editGame = async (gameId:number,payload:GameForm): Promise<AxiosResponse> => {
    const response = await fetcherPost(`${EDIT_GAME}/${gameId}`,payload);
    return response ;
};