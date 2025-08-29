import { useContext } from "react";
import MqttContext from "../context/MqttContext";

export default function useMqtt() {
  const context = useContext(MqttContext);
  if (!context) {
    throw new Error("useMqtt must be used within a MqttProvider");
  }
  return context;
}