
export interface UserInterface {
    email: string;
    password: string;
    device_type: string
    device_token: string
}

export interface RegisterInterface extends UserInterface {
    first_name: string;
    last_name: string;
    mobile: string;
}

export interface LoginInterface extends UserInterface { }



