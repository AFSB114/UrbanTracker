package com.sena.urbantracker.routes.domain.valueobject;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class DayOfWeekTypeConverter implements AttributeConverter<DayOfWeekType, String> {

    @Override
    public String convertToDatabaseColumn(DayOfWeekType attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.name().toLowerCase();
    }

    @Override
    public DayOfWeekType convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        return DayOfWeekType.valueOf(dbData.toUpperCase());
    }
}