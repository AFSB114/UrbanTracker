import { createContext } from "react";
import type { LocationContextType } from "@/location/types";

const LocationContext = createContext<LocationContextType | null>(null);

export default LocationContext;