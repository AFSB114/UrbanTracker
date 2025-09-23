package com.sena.urbantracker.users.application.service;

import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.domain.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.response.UserProfileDto;
import com.sena.urbantracker.users.domain.repository.IUserProfile;
import com.sena.urbantracker.users.domain.entity.UserProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserProfileService implements CrudOperations<UserProfileDto, UserProfileDto, Long> {

    private final IUserProfile userProfileRepository;

    @Override
    public CrudResponseDto<UserProfileDto> create(UserProfileDto dto) {
        if (userProfileRepository.existsById(dto.getId())) {
            throw new EntityAlreadyExistsException("El perfil de usuario con id " + dto.getId() + " ya existe.");
        }
        UserProfile entity = UserProfileMapper.toEntity(dto);

        UserProfile saved = userProfileRepository.save(entity);
        return CrudResponseDto.success(UserProfileMapper.toDto(saved), "Perfil de usuario creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<UserProfileDto>> findById(Long id) {
        UserProfile userProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario con id " + id + " no encontrado."));
        return CrudResponseDto.success(Optional.of(UserProfileMapper.toDto(userProfile)), "Perfil de usuario encontrado");
    }

    @Override
    public CrudResponseDto<List<UserProfileDto>> findAll() {
        List<UserProfileDto> dtos = userProfileRepository.findAll()
                .stream()
                .map(UserProfileMapper::toDto)
                .toList();
        return CrudResponseDto.success(dtos, "Lista de perfiles de usuario");
    }

    @Override
    public CrudResponseDto<UserProfileDto> update(UserProfileDto dto, Long id) {
        UserProfile userProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario con id " + dto.getId() + " no encontrado."));
        userProfile.setFirstName(dto.getFirstName());
        userProfile.setLastName(dto.getLastName());
        userProfile.setEmail(dto.getEmail());
        userProfile.setPhone(dto.getPhone());
        UserProfile updated = userProfileRepository.save(userProfile);
        return CrudResponseDto.success(UserProfileMapper.toDto(updated), "Perfil de usuario actualizado correctamente");
    }

    @Override
    public CrudResponseDto<UserProfileDto> deleteById(Long id) {
        if (!userProfileRepository.existsById(id)) {
            throw new EntityNotFoundException("Perfil de usuario no encontrado.");
        }
        userProfileRepository.deleteById(id);
        return CrudResponseDto.success(UserProfileMapper.toDto(null), "Perfil de usuario eliminado correctamente");
    }


    @Override
    public CrudResponseDto<UserProfileDto> activateById(Long id) {
        throw new UnsupportedOperationException("Activate not supported for UserProfile");
    }

    @Override
    public CrudResponseDto<UserProfileDto> deactivateById(Long id) {
        throw new UnsupportedOperationException("Deactivate not supported for UserProfile");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(userProfileRepository.existsById(id), "Verificación de existencia completada");
    }

    private static class UserProfileMapper {
        public static UserProfileDto toDto(UserProfile entity) {
            if (entity == null) return null;
            UserProfileDto dto = new UserProfileDto();
            dto.setId(entity.getId());
            dto.setFirstName(entity.getFirstName());
            dto.setLastName(entity.getLastName());
            dto.setEmail(entity.getEmail());
            dto.setPhone(entity.getPhone());
            dto.setCreatedAt(entity.getCreatedAt());
            dto.setUpdatedAt(entity.getUpdatedAt());
            return dto;
        }

        public static UserProfile toEntity(UserProfileDto dto) {
            UserProfile entity = new UserProfile();
            entity.setId(dto.getId());
            entity.setFirstName(dto.getFirstName());
            entity.setLastName(dto.getLastName());
            entity.setEmail(dto.getEmail());
            entity.setPhone(dto.getPhone());
            return entity;
        }
    }

}
