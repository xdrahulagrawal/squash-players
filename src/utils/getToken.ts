import { getLocalStorageItem } from "./storage";

export const authorizationToken = () => {
    const authData = getLocalStorageItem('auth');
    let authorization: string | null = null;

    if (authData !== null) {
        const parsedAuthData = JSON.parse(authData);
        authorization = parsedAuthData.authorization;
    }
    return authorization
}


