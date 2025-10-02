export interface VehicleAssignment {
  id: string;
  vehicleId: string;
  driverId: string;
  assignmentStatus: 'ACTIVE' | 'INACTIVE';
  vehicle?: {
    id: string;
    licensePlate: string;
    model: string;
    brand?: string;
    year?: number;
  };
  driver?: {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface RouteAssignment {
  id: string;
  routeId: string;
  vehicleId: string;
  route?: {
    id: string;
    name: string;
    description?: string;
    origin?: string;
    destination?: string;
    distance?: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface DriverInfo {
  userId: string;
  vehicleId?: string;
  routeId?: string;
  vehicleAssignment?: VehicleAssignment;
  routeAssignments?: RouteAssignment[];
}