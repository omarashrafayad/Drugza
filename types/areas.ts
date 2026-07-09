export interface Area {
    id: string;
    name: string;
    type: "main" | "secondary";
    description: string;
    population: number;
    establishedDate: string;
    isActive: boolean;
    mainAreaId?: string;
}

export type AreaType = "main" | "secondary";

export interface AreaFilters {
    type?: AreaType;
    isActive?: boolean;
    name?: string;
}


export interface MainArea {
    id?: string;
    regionName: string;
    isDeleted?: boolean;
    lang: string;
    lat: string;
}


//////////// SubArea //////////////
export interface SubArea {
    id?: string;
    name: string;
    regionId?: string;
    regionName?: string;
    isDeleted?: boolean;
}