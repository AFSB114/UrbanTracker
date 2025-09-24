package com.sena.urbantracker.users.application.service;

import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.request.IdentificationTypeReqDto;
import com.sena.urbantracker.users.application.dto.response.IdentificationTypeResDto;
import com.sena.urbantracker.users.application.mapper.IdentificationTypeMapper;
import com.sena.urbantracker.users.domain.entity.IdentificationTypeDomain;
import com.sena.urbantracker.users.domain.repository.IdentificationTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IdentificationTypeService implements CrudOperations<IdentificationTypeReqDto, IdentificationTypeResDto, Long> {

    private final IdentificationTypeRepository identificationTypeRepository;

    @Override
    public CrudResponseDto<IdentificationTypeResDto> create(IdentificationTypeReqDto dto) {
        IdentificationTypeDomain entity = IdentificationTypeMapper.toEntity(dto);

        IdentificationTypeDomain saved = identificationTypeRepository.save(entity);
        return CrudResponseDto.success(IdentificationTypeMapper.toDto(saved), "Tipo de identificación creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<IdentificationTypeResDto>> findById(Long aLong) {
        IdentificationTypeDomain identificationType = identificationTypeRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de identificación con id " + aLong + " no encontrado."));

        return CrudResponseDto.success(Optional.of(IdentificationTypeMapper.toDto(identificationType)), "Tipo de identificación encontrado");
    }

    @Override
    public CrudResponseDto<List<IdentificationTypeResDto>> findAll() {
        List<IdentificationTypeDomain> identificationTypes = identificationTypeRepository.findAll();
        return CrudResponseDto.success(identificationTypes.stream().map(IdentificationTypeMapper::toDto).toList(), "Tipos de identificación encontrados");
    }

    @Override
    public CrudResponseDto<IdentificationTypeResDto> update(IdentificationTypeReqDto dto, Long id) {
        IdentificationTypeDomain identificationType = identificationTypeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de identificación con id " + id + " no encontrado."));

        identificationType.setTypeName(dto.getName());
        identificationType.setDescription(dto.getDescription());
//        identificationType.setCountry(dto.getCountry());

        IdentificationTypeDomain updated = identificationTypeRepository.save(identificationType);
        return CrudResponseDto.success(IdentificationTypeMapper.toDto(updated), "Tipo de identificación actualizado correctamente");
    }

    @Override
    public CrudResponseDto<IdentificationTypeResDto> deleteById(Long aLong) {
        if (!identificationTypeRepository.existsById(aLong)) {
            throw new EntityNotFoundException("Tipo de identificación con id " + aLong + " no encontrado.");
        }

        identificationTypeRepository.deleteById(aLong);
        return CrudResponseDto.success(IdentificationTypeMapper.toDto(null), "Tipo de identificación eliminado correctamente");
    }

    @Override
    public CrudResponseDto<IdentificationTypeResDto> activateById(Long aLong) {
        // IdentificationType doesn't have active field, so this might not apply
        throw new UnsupportedOperationException("Activate operation not supported for IdentificationType");
    }

    @Override
    public CrudResponseDto<IdentificationTypeResDto> deactivateById(Long aLong) {
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

}
