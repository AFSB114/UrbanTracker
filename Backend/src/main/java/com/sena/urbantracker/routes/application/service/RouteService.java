package com.sena.urbantracker.routes.application.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sena.urbantracker.routes.application.dto.request.RouteReqDto;
import com.sena.urbantracker.routes.application.dto.request.RouteWaypointReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteResDto;
import com.sena.urbantracker.routes.application.mapper.RouteMapper;
import com.sena.urbantracker.routes.application.mapper.RouteWaypointMapper;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteWaypointDomain;
import com.sena.urbantracker.routes.domain.repository.RouteRepository;
import com.sena.urbantracker.routes.domain.repository.RouteWaypointRepository;
import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RouteService implements CrudOperations<RouteReqDto, RouteResDto, Long> {

    private final RouteRepository routeRepository;
    private final RouteWaypointRepository routeWaypointRepository;
    private final ObjectMapper objectMapper;

    @Transactional(rollbackFor = BadRequestException.class)
    @Override
    public CrudResponseDto<RouteResDto> create(RouteReqDto request) throws BadRequestException {
        Integer numberRouteInt = Integer.valueOf(request.getNumberRoute());
        if (routeRepository.existsByNumberRoute(numberRouteInt)) {
            throw new EntityAlreadyExistsException("Ya existe una ruta con número: " + request.getNumberRoute());
        }

        // Parseo temprano para evitar guardar la ruta si el JSON es inválido
        List<RouteWaypointReqDto> waypointDtos = parseJson(request.getWaypoints());

        RouteDomain route = RouteMapper.toEntity(request);
        String outboundImageUrl = saveImage(request.getOutboundImage(), numberRouteInt, "outbound");
        String returnImageUrl   = saveImage(request.getReturnImage(),   numberRouteInt, "return");
        route.setOutboundImageUrl(outboundImageUrl);
        route.setReturnImageUrl(returnImageUrl);

        // 1) Guarda la ruta y fuerza el INSERT si necesitas el ID ya mismo
        RouteDomain savedRoute = routeRepository.saveAndFlush(route); // <-- aquí "esperas" efectivamente

        // 2) Mapea y guarda los waypoints con la FK a la ruta ya persistida
        List<RouteWaypointDomain> waypoints = waypointDtos.stream()
                .map(dto -> {
                    RouteWaypointDomain e = RouteWaypointMapper.toEntity(dto, savedRoute.getId());
                    e.setRoute(savedRoute);
                    return e;
                })
                .toList();

        routeWaypointRepository.saveAll(waypoints);

        return CrudResponseDto.success(RouteMapper.toDto(savedRoute), "Ruta creada correctamente");
    }


    @Override
    public CrudResponseDto<Optional<RouteResDto>> findById(Long id) {
        RouteDomain route = routeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ruta con id " + id + " no encontrada."));

        return CrudResponseDto.success(Optional.of(RouteMapper.toDto(route)), "Ruta encontrada");
    }

    @Override
    public CrudResponseDto<List<RouteResDto>> findAll() {
        List<RouteResDto> dtos = routeRepository.findAll()
                .stream()
                .map(RouteMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de rutas");
    }

    @Override
    public CrudResponseDto<RouteResDto> update(RouteReqDto request, Long id) {
        RouteDomain route = routeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Ruta no encontrada."));

        route.setNumberRoute(Integer.valueOf(request.getNumberRoute()));
        route.setDescription(request.getDescription());
        route.setTotalDistance(request.getTotalDistance());

        RouteDomain updated = routeRepository.save(route);
        return CrudResponseDto.success(RouteMapper.toDto(updated), "Ruta actualizada correctamente");
    }

    @Override
    public CrudResponseDto<RouteResDto> deleteById(Long id) {
        if (!routeRepository.existsById(id)) {
            throw new EntityNotFoundException("Ruta no encontrada.");
        }

        routeRepository.deleteById(id);
        return CrudResponseDto.success(RouteMapper.toDto(null), "Ruta eliminada correctamente");
    }

    @Override
    public CrudResponseDto<RouteResDto> activateById(Long id) {
        RouteDomain route = routeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));
        route.setActive(true);
        routeRepository.save(route);
        return CrudResponseDto.success(RouteMapper.toDto(route), "Ruta activada");
    }

    @Override
    public CrudResponseDto<RouteResDto> deactivateById(Long id) {
        RouteDomain route = routeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ruta no encontrada."));
        route.setActive(false);
        routeRepository.save(route);
        return CrudResponseDto.success(RouteMapper.toDto(route), "Ruta desactivada");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(routeRepository.existsById(id), "Verificación de existencia completada");
    }

    private String saveImage(MultipartFile file, Integer routeNumber, String type) {
        if (file == null || file.isEmpty()) {
            return null;
        }
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : ".png";
            String filename = "route_" + routeNumber + "_" + type + extension;
            Path path = Paths.get("src/main/resources/static/images/routes/" + filename);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            return "/images/routes/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar la imagen: " + e.getMessage());
        }
    }

    private List<RouteWaypointReqDto> parseJson(String json) throws BadRequestException {
        List<RouteWaypointReqDto> waypointDtos;
        try {
            waypointDtos = objectMapper.readValue(
                    json, new TypeReference<List<RouteWaypointReqDto>>() {});
        } catch (JsonProcessingException e) {
            throw new BadRequestException("El JSON de waypoints es inválido: " + e.getMessage());
        }

        return waypointDtos;
    }

}
