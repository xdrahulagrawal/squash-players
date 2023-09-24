export interface Venue {
    name: string;
    state: string;
    physical_address: string;
    country: string;
}


export interface VenueForm {
    name: string;
    physical_address: string;
    country_code: string;
    state: string;
    suburb: string;
}

export interface Country {
    country: string;
    country_id: string;
    country_code: string;
    total_venues: string;
}


