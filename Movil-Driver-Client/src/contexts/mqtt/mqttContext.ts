import { createContext } from "react";
import type { MqttContextType } from "@/types/mqtt";

const MqttContext = createContext<MqttContextType | undefined>(undefined);
export default MqttContext;