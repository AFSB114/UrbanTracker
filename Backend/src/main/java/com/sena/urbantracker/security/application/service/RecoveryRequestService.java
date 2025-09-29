package com.sena.urbantracker.security.application.service;

import com.sena.urbantracker.security.application.dto.request.RecoveryRequestReqDto;
import com.sena.urbantracker.security.application.dto.request.RecoveryRequestResDto;
import com.sena.urbantracker.security.application.mapper.RecoveryRequestMapper;
import com.sena.urbantracker.security.domain.entity.RecoveryRequestDomain;
import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.security.domain.repository.RecoveryRequestRepository;
import com.sena.urbantracker.security.domain.repository.UserRepository;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecoveryRequestService implements CrudOperations<RecoveryRequestReqDto, RecoveryRequestResDto, Long> {

    private final RecoveryRequestRepository recoveryRequestRepository;
    private final UserRepository userRepository;

    @Override
    public CrudResponseDto<RecoveryRequestResDto> create(RecoveryRequestReqDto request) {
        UserDomain user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        RecoveryRequestDomain entity = RecoveryRequestMapper.toEntity(request);
        entity.setUser(user);
        RecoveryRequestDomain saved = recoveryRequestRepository.save(entity);

        return CrudResponseDto.success(RecoveryRequestMapper.toDto(saved), "Solicitud de recuperación creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<RecoveryRequestResDto>> findById(Long id) {
        RecoveryRequestDomain recoveryRequest = recoveryRequestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Solicitud de recuperación con id " + id + " no encontrada."));

        return CrudResponseDto.success(Optional.of(RecoveryRequestMapper.toDto(recoveryRequest)), "Solicitud encontrada");
    }

    @Override
    public CrudResponseDto<List<RecoveryRequestResDto>> findAll() {
        List<RecoveryRequestResDto> dtos = recoveryRequestRepository.findAll()
                .stream()
                .map(RecoveryRequestMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de solicitudes de recuperación");
    }

    @Override
    public CrudResponseDto<RecoveryRequestResDto> update(RecoveryRequestReqDto request, Long id) {
        RecoveryRequestDomain recoveryRequest = recoveryRequestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Solicitud no encontrada."));

        recoveryRequest.setCode(request.getCode());
        recoveryRequest.setExpirationTime(request.getExpirationTime());

        UserDomain user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));
        recoveryRequest.setUser(user);

        RecoveryRequestDomain updated = recoveryRequestRepository.save(recoveryRequest);
        return CrudResponseDto.success(RecoveryRequestMapper.toDto(updated), "Solicitud actualizada correctamente");
    }

    @Override
    public CrudResponseDto<RecoveryRequestResDto> deleteById(Long id) {
        if (!recoveryRequestRepository.existsById(id)) {
            throw new EntityNotFoundException("Solicitud no encontrada.");
        }

        recoveryRequestRepository.deleteById(id);
        return CrudResponseDto.success(RecoveryRequestMapper.toDto(null), "Solicitud eliminada correctamente");
    }

    @Override
    public CrudResponseDto<RecoveryRequestResDto> activateById(Long id) {
        RecoveryRequestDomain recoveryRequest = recoveryRequestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Solicitud no encontrada."));
        recoveryRequest.setActive(true);
        recoveryRequestRepository.save(recoveryRequest);
        return CrudResponseDto.success(RecoveryRequestMapper.toDto(recoveryRequest), "Solicitud activada");
    }

    @Override
    public CrudResponseDto<RecoveryRequestResDto> deactivateById(Long id) {
        RecoveryRequestDomain recoveryRequest = recoveryRequestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Solicitud no encontrada."));
        recoveryRequest.setActive(false);
        recoveryRequestRepository.save(recoveryRequest);
        return CrudResponseDto.success(RecoveryRequestMapper.toDto(recoveryRequest), "Solicitud desactivada");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(recoveryRequestRepository.existsById(id), "Verificación de existencia completada");
    }

}