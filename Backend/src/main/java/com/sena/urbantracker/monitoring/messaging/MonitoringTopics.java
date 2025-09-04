package com.sena.urbantracker.monitoring.messaging;

/**
 * Centralized topic definitions and helpers for Monitoring domain.
 */
public final class MonitoringTopics {

    private MonitoringTopics() {}

    public static final String BASE = "urbantracker/monitoring";

    // Real-time locations
    public static final String VEHICLES = BASE + "/vehicles";
    public static final String ALL_REALTIME_LOCATIONS = VEHICLES + "/+/location"; // wildcard

    public static String realTimeLocationOfVehicle(String vehicleId) {
        if (vehicleId == null || vehicleId.isBlank()) {
            throw new IllegalArgumentException("vehicleId must not be null or blank");
        }
        return VEHICLES + "/" + vehicleId + "/location";
    }

    // Alerts (optional, prepared for future use)
    public static final String ALERTS = BASE + "/alerts";
    public static String alertForVehicle(String vehicleId) {
        if (vehicleId == null || vehicleId.isBlank()) {
            throw new IllegalArgumentException("vehicleId must not be null or blank");
        }
        return ALERTS + "/" + vehicleId;
    }
}
