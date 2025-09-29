package com.sena.urbantracker.monitoring.application.service;

import com.sena.urbantracker.monitoring.application.dto.request.TrackingReqDto;
import com.sena.urbantracker.monitoring.application.dto.response.TrackingResDto;
import com.sena.urbantracker.monitoring.application.mapper.TrackingMapper;
import com.sena.urbantracker.monitoring.domain.entity.TrackingDomain;
import com.sena.urbantracker.monitoring.domain.repository.TrackingRepository;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrackingService implements CrudOperations<TrackingReqDto, TrackingResDto, Long> {

    private final TrackingRepository trackingRepository;

    @Override
    public CrudResponseDto<TrackingResDto> create(TrackingReqDto request) throws BadRequestException {
        TrackingDomain domain = TrackingMapper.toEntity(request);
        TrackingDomain saved = trackingRepository.save(domain);
        return CrudResponseDto.success(TrackingMapper.toDto(saved), "Tracking creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<TrackingResDto>> findById(Long id) {
        TrackingDomain domain = trackingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tracking con id " + id + " no encontrado."));
        return CrudResponseDto.success(Optional.of(TrackingMapper.toDto(domain)), "Tracking encontrado");
    }

    @Override
    public CrudResponseDto<List<TrackingResDto>> findAll() {
        List<TrackingDomain> domains = trackingRepository.findAll();
        List<TrackingResDto> dtos = domains.stream().map(TrackingMapper::toDto).toList();
        return CrudResponseDto.success(dtos, "Listado de trackings");
    }

    @Override
    public CrudResponseDto<TrackingResDto> update(TrackingReqDto request, Long id) throws BadRequestException {
        TrackingDomain domain = trackingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tracking no encontrado."));
        // Update fields
        TrackingDomain updated = trackingRepository.save(domain);
        return CrudResponseDto.success(TrackingMapper.toDto(updated), "Tracking actualizado correctamente");
    }

    @Override
    public CrudResponseDto<TrackingResDto> deleteById(Long id) {
        trackingRepository.deleteById(id);
        return CrudResponseDto.success(null, "Tracking eliminado correctamente");
    }

    @Override
    public CrudResponseDto<TrackingResDto> activateById(Long id) {
        TrackingDomain domain = trackingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tracking no encontrado."));
        domain.setActive(true);
        trackingRepository.save(domain);
        return CrudResponseDto.success(TrackingMapper.toDto(domain), "Tracking activado");
    }

    @Override
    public CrudResponseDto<TrackingResDto> deactivateById(Long id) {
        TrackingDomain domain = trackingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tracking no encontrado."));
        domain.setActive(false);
        trackingRepository.save(domain);
        return CrudResponseDto.success(TrackingMapper.toDto(domain), "Tracking desactivado");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(trackingRepository.existsById(id), "Verificación completada");
    }
}