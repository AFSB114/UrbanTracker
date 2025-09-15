package com.sena.urbantracker.users.service;

import com.sena.urbantracker.shared.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.users.model.dto.response.IdentificationTypeDto;
import com.sena.urbantracker.users.model.entity.IdentificationType;
import com.sena.urbantracker.users.repository.IIdentificationType;
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
            throw new EntityAlreadyExistsException("Tipo de identificación ya existe");
        }
        IdentificationType entity = IdentificationTypeMapper.toEntity(dto);

        IdentificationType saved = identificationTypeRepository.save(entity);
        return CrudResponseDto.success(IdentificationTypeMapper.toDto(saved), "Tipo de identificación creado");
    }

    @Override
    public CrudResponseDto<Optional<IdentificationTypeDto>> findById(Long aLong) {
        IdentificationType identificationType = identificationTypeRepository.findById(aLong)
            .orElseThrow(() -> new EntityNotFoundException("Tipo de identificación no encontrado"));

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
            .orElseThrow(() -> new EntityNotFoundException("Tipo de identificación no encontrado"));

        identificationType.setTypeName(dto.getTypeName());
        identificationType.setDescription(dto.getDescription());
        identificationType.setCountry(dto.getCountry());

        IdentificationType updated = identificationTypeRepository.save(identificationType);
        return CrudResponseDto.success(IdentificationTypeMapper.toDto(updated), "Tipo de identificación actualizado");
    }

    @Override
    public CrudResponseDto<IdentificationTypeDto> deleteById(Long aLong) {
        if (!identificationTypeRepository.existsById(aLong)) {
            throw new EntityNotFoundException("Tipo de identificación no encontrado");
        }
        identificationTypeRepository.deleteById(aLong);
        return CrudResponseDto.success(IdentificationTypeMapper.toDto(null), "Tipo de identificación eliminado");
    }

    @Override
    public CrudResponseDto<IdentificationTypeDto> activateById(Long aLong) {
        IdentificationType identificationType = identificationTypeRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de identificación no encontrado"));

        identificationTypeRepository.save(identificationType);
        return CrudResponseDto.success(IdentificationTypeMapper.toDto(identificationType), "Tipo de identificación activado");
    }

    @Override
    public CrudResponseDto<IdentificationTypeDto> deactivateById(Long aLong) {
        IdentificationType identificationType = identificationTypeRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de identificación no encontrado"));

        identificationTypeRepository.save(identificationType);
        return CrudResponseDto.success(IdentificationTypeMapper.toDto(identificationType), "Tipo de identificación desactivado");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        if (identificationTypeRepository.existsById(aLong)) {
            return CrudResponseDto.success(true, "Tipo de identificación existe");
        }
        return CrudResponseDto.success(false, "Tipo de identificación no existe");
    }

    private static class IdentificationTypeMapper {
        public static IdentificationTypeDto toDto(IdentificationType entity) {
            IdentificationTypeDto dto = new IdentificationTypeDto();
            dto.setId(entity.getId());
            dto.setTypeName(entity.getTypeName());
            dto.setDescription(entity.getDescription());
            dto.setCountry(entity.getCountry());
            return dto;
        }

        public static IdentificationType toEntity(IdentificationTypeDto dto) {
            IdentificationType entity = new IdentificationType();
            entity.setId(dto.getId());
            entity.setTypeName(dto.getTypeName());
            entity.setDescription(dto.getDescription());
            entity.setCountry(dto.getCountry());
            return entity;
        }
    }
}
