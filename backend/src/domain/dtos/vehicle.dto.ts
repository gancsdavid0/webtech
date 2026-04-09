export interface CreateVehicleDto {
    licensePlate: string;
    make?: string | null;
    model?: string | null;
    ownerId: number;
}

export interface UpdateVehicleDto {
    make?: string;
    model?: string;
}

export interface VehicleResponse {
    id: number;
    licensePlate: string;
    make: string | null;
    model: string | null;
    ownerId: number;
}