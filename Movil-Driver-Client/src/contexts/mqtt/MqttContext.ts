import { createContext } from "react";
import type { MqttContextType } from "../types";

const MqttContext = createContext<MqttContextType | null>(null);

export default MqttContext;