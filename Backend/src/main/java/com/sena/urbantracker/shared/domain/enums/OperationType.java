package com.sena.urbantracker.shared.domain.enums;

public enum OperationType {

    CREATE("Create"),
    READ("Read"),
    UPDATE("Update"),
    DELETE("Delete"),
    ACTIVATE("Activate"),
    DEACTIVATE("Deactivate"),
    BATCH_CREATE("Batch Create"),
    BATCH_UPDATE("Batch Update"),
    BATCH_DELETE("Batch Delete");

    private final String displayName;

    OperationType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
