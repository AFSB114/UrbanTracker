package com.sena.urbantracker.users.service;

import com.sena.urbantracker.shared.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.users.model.dto.response.UserIdentificationDto;
import com.sena.urbantracker.users.model.entity.UserIdentification;
import com.sena.urbantracker.users.repository.IUserIdentification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserIdentificationService implements CrudOperations<UserIdentificationDto, Long> {

    private final IUserIdentification userIdentificationRepository;

    @Override
    public CrudResponseDto<UserIdentificationDto> create(UserIdentificationDto dto) {
        if (userIdentificationRepository.existsById(dto.getId())) {
            throw new EntityAlreadyExistsException("La identificación con id " + dto.getId() + " ya existe.");
        }
        UserIdentification entity = UserIdentificationMapper.toEntity(dto);
        entity.setActive(true);

        entity = userIdentificationRepository.save(entity);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(entity), "Identificación creada exitosamente.");
    }

    @Override
    public CrudResponseDto<Optional<UserIdentificationDto>> findById(Long aLong) {
        UserIdentification entity = userIdentificationRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Identificación con id " + aLong + " no encontrada."));

        return CrudResponseDto.success(Optional.of(UserIdentificationMapper.toDto(entity)), "Identificación encontrada");
    }

    @Override
    public CrudResponseDto<List<UserIdentificationDto>> findAll() {
        List<UserIdentification> entities = userIdentificationRepository.findAll();
        return CrudResponseDto.success(entities.stream().map(UserIdentificationMapper::toDto).toList(), "Identificaciones encontradas");
    }

    @Override
    public CrudResponseDto<UserIdentificationDto> update(UserIdentificationDto dto) {
        UserIdentification userIdentification = userIdentificationRepository.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Identificación con id " + dto.getId() + " no encontrada."));

        userIdentification.setActive(dto.getActive());
        userIdentification.setIdentificationNumber(dto.getIdentificationNumber());
        userIdentification.setIdentificationType(dto.getIdentificationType());
        userIdentification.setUser(dto.getUser());

        UserIdentification updated = userIdentificationRepository.save(userIdentification);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(updated), "Identificación actualizada exitosamente.");
    }

    @Override
    public CrudResponseDto<UserIdentificationDto> deleteById(Long aLong) {
        if (!userIdentificationRepository.existsById(aLong)) {
            throw new EntityNotFoundException("Identificación con id " + aLong + " no encontrada.");
        }
        userIdentificationRepository.deleteById(aLong);
        return CrudResponseDto.success(null, "Identificación eliminada exitosamente.");
    }

    @Override
    public CrudResponseDto<UserIdentificationDto> activateById(Long aLong) {
        UserIdentification userIdentification = userIdentificationRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Identificación con id " + aLong + " no encontrada."));

        userIdentification.setActive(true);
        userIdentificationRepository.save(userIdentification);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(userIdentification), "Identificación activada exitosamente.");
    }

    @Override
    public CrudResponseDto<UserIdentificationDto> deactivateById(Long aLong) {
        UserIdentification userIdentification = userIdentificationRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Identificación con id " + aLong + " no encontrada."));

        userIdentification.setActive(false);
        userIdentificationRepository.save(userIdentification);
        return CrudResponseDto.success(UserIdentificationMapper.toDto(userIdentification), "Identificación desactivada exitosamente.");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        if (userIdentificationRepository.existsById(aLong)) {
            return CrudResponseDto.success(true, "Identificación encontrada.");
        }
        return CrudResponseDto.success(false, "Identificación no encontrada.");
    }

    private static class UserIdentificationMapper {

        private static UserIdentificationDto toDto(UserIdentification entity) {
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
