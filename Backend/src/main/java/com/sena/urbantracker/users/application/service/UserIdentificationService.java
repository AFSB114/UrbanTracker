package com.sena.urbantracker.users.application.service;

import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.response.UserIdentificationDto;
import com.sena.urbantracker.users.domain.repository.IUserIdentification;
import com.sena.urbantracker.users.domain.entity.UserIdentification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserIdentificationService implements CrudOperations<UserIdentificationDto, UserIdentificationDto, Long> {

    private final IUserIdentification userIdentificationRepository;

    @Override
    public CrudResponseDto<UserIdentificationDto> create(UserIdentificationDto dto) {
        if (userIdentificationRepository.existsById(dto.getId())) {
            throw new EntityAlreadyExistsException("La identificación de usuario con id " + dto.getId() + " ya existe.");
        }
        UserIdentification entity = UserIdentificationMapper.toEntity(dto);
        entity.setActive(true);

        UserIdentification saved = userIdentificationRepository.save(entity);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(saved), "Identificación de usuario creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<UserIdentificationDto>> findById(Long aLong) {
        UserIdentification userIdentification = userIdentificationRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Identificación de usuario con id " + aLong + " no encontrada."));

        return CrudResponseDto.success(Optional.of(UserIdentificationMapper.toDto(userIdentification)), "Identificación de usuario encontrada");
    }

    @Override
    public CrudResponseDto<List<UserIdentificationDto>> findAll() {
        List<UserIdentification> userIdentifications = userIdentificationRepository.findAll();
        return CrudResponseDto.success(userIdentifications.stream().map(UserIdentificationMapper::toDto).toList(), "Identificaciones de usuario encontradas");
    }

    @Override
    public CrudResponseDto<UserIdentificationDto> update(UserIdentificationDto dto) {
        UserIdentification userIdentification = userIdentificationRepository.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Identificación de usuario con id " + dto.getId() + " no encontrada."));

        userIdentification.setUser(dto.getUser());
        userIdentification.setIdentificationType(dto.getIdentificationType());
        userIdentification.setIdentificationNumber(dto.getIdentificationNumber());
        userIdentification.setActive(dto.getActive());

        UserIdentification updated = userIdentificationRepository.save(userIdentification);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(updated), "Identificación de usuario actualizada correctamente");
    }

    @Override
    public CrudResponseDto<UserIdentificationDto> deleteById(Long aLong) {
        if (!userIdentificationRepository.existsById(aLong)) {
            throw new EntityNotFoundException("Identificación de usuario con id " + aLong + " no encontrada.");
        }

        userIdentificationRepository.deleteById(aLong);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(null), "Identificación de usuario eliminada correctamente");
    }

    @Override
    public CrudResponseDto<UserIdentificationDto> activateById(Long aLong) {
        UserIdentification userIdentification = userIdentificationRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Identificación de usuario con id " + aLong + " no encontrada."));

        userIdentification.setActive(true);
        userIdentificationRepository.save(userIdentification);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(userIdentification), "Identificación de usuario activada correctamente");
    }

    @Override
    public CrudResponseDto<UserIdentificationDto> deactivateById(Long aLong) {
        UserIdentification userIdentification = userIdentificationRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Identificación de usuario con id " + aLong + " no encontrada."));

        userIdentification.setActive(false);
        userIdentificationRepository.save(userIdentification);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(userIdentification), "Identificación de usuario desactivada correctamente");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        if (userIdentificationRepository.existsById(aLong)) {
            return CrudResponseDto.success(true, "Identificación de usuario con id " + aLong + " existe.");
        }
        return CrudResponseDto.success(false, "Identificación de usuario con id " + aLong + " no existe.");
    }

    private static class UserIdentificationMapper {

        private static UserIdentificationDto toDto(UserIdentification entity) {
            if (entity == null) return null;
            UserIdentificationDto dto = new UserIdentificationDto();
            dto.setId(entity.getId());
            dto.setUser(entity.getUser());
            dto.setIdentificationType(entity.getIdentificationType());
            dto.setIdentificationNumber(entity.getIdentificationNumber());
            dto.setActive(entity.getActive());
            return dto;
        }

        private static UserIdentification toEntity(UserIdentificationDto dto) {
            UserIdentification entity = new UserIdentification();
            entity.setId(dto.getId());
            entity.setUser(dto.getUser());
            entity.setIdentificationType(dto.getIdentificationType());
            entity.setIdentificationNumber(dto.getIdentificationNumber());
            entity.setActive(dto.getActive());
            return entity;
        }
    }

}
