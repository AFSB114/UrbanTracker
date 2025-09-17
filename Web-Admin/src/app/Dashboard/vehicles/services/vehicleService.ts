
import type { Vehicle } from '../types/vehiculeTypes';

const ApiUrl = 'http://localhost:3000/api/v1/public/vehicle';

export async function getVehicles(): Promise<Vehicle[]> {

    try {
        const response = await fetch(ApiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener drivers: ${response.status}`);
        }

        const data : Vehicle[] = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



