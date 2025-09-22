package com.sena.urbantracker.users.application.service;

import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.response.IdentificationTypeDto;
import com.sena.urbantracker.users.domain.repository.IIdentificationType;
import com.sena.urbantracker.users.domain.entity.IdentificationType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IdentificationTypeService implements CrudOperations<IdentificationTypeDto, Long> {

    private final IIdentificationType identificationTypeRepository;

    @Override
    public CrudResponseDto<IdentificationTypeDto> create(IdentificationTypeDto dto) {
        if (identificationTypeRepository.existsById(dto.getId())) {
            throw new EntityAlreadyExistsException("El tipo de identificación con id " + dto.getId() + " ya existe.");
        }
        IdentificationType entity = IdentificationTypeMapper.toEntity(dto);

        IdentificationType saved = identificationTypeRepository.save(entity);
        return CrudResponseDto.success(IdentificationTypeMapper.toDto(saved), "Tipo de identificación creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<IdentificationTypeDto>> findById(Long aLong) {
        IdentificationType identificationType = identificationTypeRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de identificación con id " + aLong + " no encontrado."));

        return CrudResponseDto.success(Optional.of(IdentificationTypeMapper.toDto(identificationType)), "Tipo de identificación encontrado");
    }

    @Override
    public CrudResponseDto<List<IdentificationTypeDto>> findAll() {
        List<IdentificationType> identificationTypes = identificationTypeRepository.findAll();
        return CrudResponseDto.success(identificationTypes.stream().map(IdentificationTypeMapper::toDto).toList(), "Tipos de identificación encontrados");
    }

    @Override
    public CrudResponseDto<IdentificationTypeDto> update(IdentificationTypeDto dto) {
        IdentificationType identificationType = identificationTypeRepository.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Tipo de identificación con id " + dto.getId() + " no encontrado."));

        identificationType.setTypeName(dto.getTypeName());
        identificationType.setDescription(dto.getDescription());
        identificationType.setCountry(dto.getCountry());

        IdentificationType updated = identificationTypeRepository.save(identificationType);
        return CrudResponseDto.success(IdentificationTypeMapper.toDto(updated), "Tipo de identificación actualizado correctamente");
    }

    @Override
    public CrudResponseDto<IdentificationTypeDto> deleteById(Long aLong) {
        if (!identificationTypeRepository.existsById(aLong)) {
            throw new EntityNotFoundException("Tipo de identificación con id " + aLong + " no encontrado.");
        }

        identificationTypeRepository.deleteById(aLong);
        return CrudResponseDto.success(IdentificationTypeMapper.toDto(null), "Tipo de identificación eliminado correctamente");
    }

    @Override
    public CrudResponseDto<IdentificationTypeDto> activateById(Long aLong) {
        // IdentificationType doesn't have active field, so this might not apply
        throw new UnsupportedOperationException("Activate operation not supported for IdentificationType");
    }

    @Override
    public CrudResponseDto<IdentificationTypeDto> deactivateById(Long aLong) {
        // IdentificationType doesn't have active field, so this might not apply
        throw new UnsupportedOperationException("Deactivate operation not supported for IdentificationType");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        if (identificationTypeRepository.existsById(aLong)) {
            return CrudResponseDto.success(true, "Tipo de identificación con id " + aLong + " existe.");
        }
        return CrudResponseDto.success(false, "Tipo de identificación con id " + aLong + " no existe.");
    }

    private static class IdentificationTypeMapper {

        private static IdentificationTypeDto toDto(IdentificationType entity) {
            if (entity == null) return null;
            IdentificationTypeDto dto = new IdentificationTypeDto();
            dto.setId(entity.getId());
            dto.setTypeName(entity.getTypeName());
            dto.setDescription(entity.getDescription());
            dto.setCountry(entity.getCountry());
            return dto;
        }

        private static IdentificationType toEntity(IdentificationTypeDto dto) {
            IdentificationType entity = new IdentificationType();
            entity.setId(dto.getId());
            entity.setTypeName(dto.getTypeName());
            entity.setDescription(dto.getDescription());
            entity.setCountry(dto.getCountry());
            return entity;
        }
    }

}
