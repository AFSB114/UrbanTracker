package com.sena.urbantracker.routes.application.dto.request;

import com.sena.urbantracker.shared.application.dto.request.ABaseReqDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Data
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RouteReqDto extends ABaseReqDto {
    @NotBlank(message = "El número de ruta es obligatorio")
    @Size(min = 1, max = 50, message = "El número de ruta debe tener entre 1 y 50 caracteres")
    private String numberRoute;

    @NotNull
    @Size(max = 500, message = "La descripción no puede exceder los 500 caracteres")
    private String description;

    @NotNull
    @NotBlank(message = "La distancia total es obligatoria")
    private String totalDistance;

    @NotNull
    @NotBlank(message = "Los puntos de ruta son obligatorios")
    private String waypoints;

    @NotNull
    private MultipartFile outboundImage;

    @NotNull
    private MultipartFile returnImage;

    @Null
    private String outboundImageUrl;

    @Null
    private String returnImageUrl;
}
