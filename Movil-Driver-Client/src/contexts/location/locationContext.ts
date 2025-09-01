import { createContext } from "react";
import type { LocationContextType } from "@Types/location";

const locationContext = createContext<LocationContextType | null>(null);

export default locationContext;