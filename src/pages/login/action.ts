import { AxiosResponse } from 'axios';
import { fetcherPost } from '../../utils/fetcher'
import { LOGIN } from '../../utils/network';
import { LoginInterface } from '../../types';


export const login = async (credentials: LoginInterface): Promise<AxiosResponse> => {
    const response = await fetcherPost(`${LOGIN}`, credentials);
    return response
};
