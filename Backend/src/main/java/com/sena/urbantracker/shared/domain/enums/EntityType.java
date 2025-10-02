package com.sena.urbantracker.shared.domain.enums;

public enum EntityType {

    VEHICLE("Vehicle", "vehicles"),
    VEHICLE_TYPE("Vehicle Type", "vehicleTypes"),
    VEHICLE_ASSIGMENT("Vehicle Assigment", "vehicleAssigments"),
    DRIVER("Driver", "drivers"),
    COMPANY("Company", "companies"),
    IDENTIFICATION_TYPE("Identification Type", "identificationTypes"),
    USER_IDENTIFICATION("User Identification", "userIdentifications"),
    USER_PROFILE("User Profile", "userProfiles"),
    ROUTE("Route", "routes"),
    ROUTE_ASSIGNMENT("Route Assignment", "routeAssignments"),
    ROUTE_WAYPOINT("Route Waypoint", "routeWaypoints"),
    ROUTE_SCHEDULE("Route Schedule", "routeSchedules"),
    ROUTE_TRAJECTORY("Route Trajectory", "routeTrajectories"),
    USER("User", "users"),
    ADMIN("Admin", "admins"),
    ROLE("Role", "roles"),
    RECOVERY_REQUEST("Recovery Request", "recoveryRequests"),
    TRACKING("Tracking", "trackings");

    private final String displayName;
    private final String pluralName;

    EntityType(String displayName, String pluralName) {
        this.displayName = displayName;
        this.pluralName = pluralName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getPluralName() {
        return pluralName;
    }
}
