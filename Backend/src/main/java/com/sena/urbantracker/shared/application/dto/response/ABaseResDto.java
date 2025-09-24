package com.sena.urbantracker.shared.application.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
public abstract class ABaseResDto {

    @Positive(message = "El ID debe ser un número positivo")
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    @PastOrPresent(message = "La fecha de creación no puede ser futura")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")
    @PastOrPresent(message = "La fecha de actualización no puede ser futura")
    private LocalDateTime updatedAt;

    @NotNull(message = "Active status is required")
    @Builder.Default
    private Boolean active = true;
}
