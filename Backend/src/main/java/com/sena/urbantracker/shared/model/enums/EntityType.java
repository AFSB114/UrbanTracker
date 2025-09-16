package com.sena.urbantracker.shared.model.enums;

public enum EntityType {

    VEHICLE("Vehicle", "vehicles"),
    VEHICLE_TYPE("Vehicle Type", "vehicleTypes"),
    VEHICLE_ASSIGMENT("Vehicle Assigment", "vehicleAssigments"),
    DRIVER("Driver", "drivers"),
    COMPANY("Company", "companies"),
    IDENTIFICATION_TYPE("Identification Type", "identificationTypes"),
    USER_IDENTIFICATION("User Identification", "userIdentifications"),
    ROUTE("Route", "routes"),
    ROUTE_WAYPOINT("Route Waypoint", "routeWaypoints"),
    USER("User", "users"),
    ADMIN("Admin", "admins"),
    ROLE("Role", "roles");

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
