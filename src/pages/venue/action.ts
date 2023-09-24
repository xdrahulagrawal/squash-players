import { AxiosResponse } from 'axios';
import { fetcherGet, fetcherPost } from '../../utils/fetcher';
import { VIEW_COUNTRIES, VIEW_STATES, VIEW_SUBURBS, CREATE_VENUE, GET_VENUE } from '../../utils/network';
import { VenueForm } from './type';

export const getCountriesList = async (): Promise<AxiosResponse> => {
    const response = await fetcherGet(`${VIEW_COUNTRIES}`);
    return response
};

export const getStateList = async (params: string): Promise<AxiosResponse> => {
    const response = await fetcherGet(`${VIEW_STATES}${params}`);
    return response;
};

export const getSuburbsList = async (params: string): Promise<AxiosResponse> => {
    const response = await fetcherGet(`${VIEW_SUBURBS}${params}`);
    return response;
};

export const getVenueList = async (): Promise<AxiosResponse> => {
    const response = await fetcherGet(`${GET_VENUE}`);
    return response;
};

export const createVenue = async (payload: VenueForm): Promise<AxiosResponse> => {
    const response = await fetcherPost(`${CREATE_VENUE}`, payload);
    return response;
};
