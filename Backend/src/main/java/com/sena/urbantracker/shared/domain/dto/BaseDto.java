package com.sena.urbantracker.shared.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@SuperBuilder
public abstract class BaseDto {

    @Positive(message = "El ID debe ser un número positivo")
    private Long id;

//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
//    @PastOrPresent(message = "La fecha de creación no puede ser futura")
//    private LocalDateTime createdAt;
//
//    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
//    @PastOrPresent(message = "La fecha de actualización no puede ser futura")
//    private LocalDateTime updatedAt;

    @NotNull(message = "Active status is required")
    private Boolean active = true;

    public boolean isNew() {
        return this.id == null;
    }

    public boolean isActiveEntity() {
        return Boolean.TRUE.equals(this.active);
    }
}
