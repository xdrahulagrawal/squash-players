import { AxiosResponse } from 'axios';
import { fetcherPost } from '../../utils/fetcher'
import { REGISTER } from '../../utils/network';
import { RegisterInterface } from '../../types';

export const register = async (payload: RegisterInterface): Promise<AxiosResponse> => {
    const response = await fetcherPost(`${REGISTER}`, payload);
    return response 
};
