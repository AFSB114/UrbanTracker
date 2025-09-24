package com.sena.urbantracker.routes.application.service;

import com.sena.urbantracker.routes.application.dto.request.RouteScheduleReqDto;
import com.sena.urbantracker.routes.application.dto.response.RouteScheduleResDto;
import com.sena.urbantracker.routes.application.mapper.RouteScheduleMapper;
import com.sena.urbantracker.routes.domain.entity.RouteScheduleDomain;
import com.sena.urbantracker.routes.domain.repository.RouteScheduleRepository;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.util.List;
import java.util.Optional;

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
        RouteScheduleDomain entity = RouteScheduleMapper.toEntity(request);
        RouteScheduleDomain saved = routeScheduleRepository.save(entity);
        return CrudResponseDto.success(RouteScheduleMapper.toDto(saved), "Horario de ruta creado correctamente");
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
}