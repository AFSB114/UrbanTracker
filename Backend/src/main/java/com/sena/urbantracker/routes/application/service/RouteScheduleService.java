package com.sena.urbantracker.routes.application.service;

import com.sena.urbantracker.routes.application.dto.request.RouteScheduleReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteScheduleResDto;
import com.sena.urbantracker.routes.application.mapper.RouteScheduleMapper;
import com.sena.urbantracker.routes.domain.entity.RouteDomain;
import com.sena.urbantracker.routes.domain.entity.RouteScheduleDomain;
import com.sena.urbantracker.routes.domain.repository.RouteScheduleRepository;
import com.sena.urbantracker.routes.domain.valueobject.DayOfWeekType;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RouteScheduleService implements CrudOperations<RouteScheduleReqDto, RouteScheduleResDto, Long> {

    private final RouteScheduleRepository routeScheduleRepository;

    @PostConstruct
    public void init() {
        log.info("RouteScheduleService bean created");
    }

    @Override
    public CrudResponseDto<RouteScheduleResDto> create(RouteScheduleReqDto request) {
        if (request.getStartTime() == null || request.getEndTime() == null || !request.getStartTime().before(request.getEndTime())) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
        RouteScheduleDomain entity = RouteScheduleMapper.toEntity(request);
        RouteScheduleDomain saved = routeScheduleRepository.save(entity);
        return CrudResponseDto.success(RouteScheduleMapper.toDto(saved), "Horario de ruta creado correctamente");
    }

    public CrudResponseDto<List<RouteScheduleResDto>> createAll(List<RouteScheduleReqDto> request) {
        List<RouteScheduleDomain> entityList = request.stream()
            .peek(dto -> {
                if (dto.getStartTime() == null || dto.getEndTime() == null || !dto.getStartTime().before(dto.getEndTime())) {
                    throw new IllegalArgumentException("Start time must be before end time");
                }
            })
            .map(RouteScheduleMapper::toEntity)
            .toList();
        List<RouteScheduleDomain> savedList = routeScheduleRepository.saveAll(entityList);
        return CrudResponseDto.success(savedList.stream().map(RouteScheduleMapper::toDto).toList(), "Horario de ruta creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<RouteScheduleResDto>> findById(Long id) {
        RouteScheduleDomain routeSchedule = routeScheduleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Horario de ruta con id " + id + " no encontrado."));
        return CrudResponseDto.success(Optional.of(RouteScheduleMapper.toDto(routeSchedule)), "Horario de ruta encontrado");
    }

    @Override
    public CrudResponseDto<List<RouteScheduleResDto>> findAll() {
        List<RouteScheduleResDto> dtos = routeScheduleRepository.findAll()
                .stream()
                .map(RouteScheduleMapper::toDto)
                .toList();
        return CrudResponseDto.success(dtos, "Listado de horarios de ruta");
    }

    @Override
    public CrudResponseDto<RouteScheduleResDto> update(RouteScheduleReqDto request, Long id) {
        RouteScheduleDomain routeSchedule = routeScheduleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Horario de ruta no encontrado."));
        if (request.getStartTime() == null || request.getEndTime() == null || !request.getStartTime().before(request.getEndTime())) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
        routeSchedule.setDayOfWeek(request.getDayOfWeek());
        routeSchedule.setStartTime(request.getStartTime());
        routeSchedule.setEndTime(request.getEndTime());
        RouteScheduleDomain updated = routeScheduleRepository.save(routeSchedule);
        return CrudResponseDto.success(RouteScheduleMapper.toDto(updated), "Horario de ruta actualizado correctamente");
    }

    @Override
    public CrudResponseDto<RouteScheduleResDto> deleteById(Long id) {
        if (!routeScheduleRepository.existsById(id)) {
            throw new EntityNotFoundException("Horario de ruta no encontrado.");
        }
        routeScheduleRepository.deleteById(id);
        return CrudResponseDto.success(RouteScheduleMapper.toDto(null), "Horario de ruta eliminado correctamente");
    }

    @Override
    public CrudResponseDto<RouteScheduleResDto> activateById(Long id) {
        RouteScheduleDomain routeSchedule = routeScheduleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Horario de ruta no encontrado."));
        routeSchedule.setActive(true);
        routeScheduleRepository.save(routeSchedule);
        return CrudResponseDto.success(RouteScheduleMapper.toDto(routeSchedule), "Horario de ruta activado");
    }

    @Override
    public CrudResponseDto<RouteScheduleResDto> deactivateById(Long id) {
        RouteScheduleDomain routeSchedule = routeScheduleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Horario de ruta no encontrado."));
        routeSchedule.setActive(false);
        routeScheduleRepository.save(routeSchedule);
        return CrudResponseDto.success(RouteScheduleMapper.toDto(routeSchedule), "Horario de ruta desactivado");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(routeScheduleRepository.existsById(id), "Verificación de existencia completada");
    }

    public CrudResponseDto<List<RouteScheduleResDto>> updateAll(List<RouteScheduleReqDto> dtos, Long id) {
        List<RouteScheduleDomain> existing = routeScheduleRepository.findByRoute_Id(id);

        // Índices por día
        Set<String> dtoDays = dtos.stream()
                .map(RouteScheduleReqDto::getDayOfWeek)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        Map<String, RouteScheduleDomain> existingByDay = existing.stream()
                .filter(e -> e.getDayOfWeek() != null)
                .collect(Collectors.toMap(RouteScheduleDomain::getDayOfWeek, e -> e));

        // 1) updated: existentes que sí vienen en dto (coincide día)
        List<RouteScheduleDomain> updated = new ArrayList<>();
        for (RouteScheduleReqDto dto : dtos) {
            if (dto.getDayOfWeek() == null) continue;
            if (dto.getStartTime() == null || dto.getEndTime() == null || !dto.getStartTime().before(dto.getEndTime())) {
                throw new IllegalArgumentException("Start time must be before end time");
            }
            RouteScheduleDomain match = existingByDay.get(dto.getDayOfWeek());
            if (match != null) {
                match.setStartTime(dto.getStartTime());
                match.setEndTime(dto.getEndTime());
                updated.add(match);
            }
        }

        List<RouteScheduleDomain> missingInDto = existing.stream()
                .filter(e -> e.getDayOfWeek() != null && !dtoDays.contains(e.getDayOfWeek()))
                .toList();

        List<RouteScheduleDomain> newInDto = dtos.stream()
                .filter(d -> d.getDayOfWeek() != null && !existingByDay.containsKey(d.getDayOfWeek()))
                .peek(d -> {
                    if (d.getStartTime() == null || d.getEndTime() == null || !d.getStartTime().before(d.getEndTime())) {
                        throw new IllegalArgumentException("Start time must be before end time");
                    }
                })
                .map(d -> {
                    RouteScheduleDomain ne = RouteScheduleMapper.toEntity(d);
                    RouteDomain routeRef = new RouteDomain();
                    routeRef.setId(id);
                    ne.setRoute(routeRef);
                    return ne;
                })
                .toList();

        if (!updated.isEmpty()) routeScheduleRepository.saveAll(updated);
        if (!missingInDto.isEmpty()) routeScheduleRepository.deleteAll(missingInDto);
        if (!newInDto.isEmpty()) routeScheduleRepository.saveAll(newInDto);

        List<RouteScheduleResDto> result = routeScheduleRepository.findByRoute_Id(id).stream()
                .map(RouteScheduleMapper::toDto)
                .toList();

        return CrudResponseDto.success(result, "Horario actualizado correctamente");
    }
}