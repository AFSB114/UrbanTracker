package com.sena.urbantracker.security.service;

import com.sena.urbantracker.security.model.dto.response.RoleDto;
import com.sena.urbantracker.security.model.entity.Role;
import com.sena.urbantracker.security.repository.IRole;
import com.sena.urbantracker.shared.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.model.enums.OperationType;
import com.sena.urbantracker.shared.repository.CrudOperations;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService implements CrudOperations<RoleDto, Long> {

    private final IRole roleRepository;

    @Override
    public CrudResponseDto<RoleDto> create(RoleDto dto) {
        if (roleRepository.existsByName(dto.getName())) {
            throw new EntityAlreadyExistsException("El rol con nombre " + dto.getName() + " ya existe.");
        }

        Role entity = RoleMapper.toEntity(dto);
        entity.setActive(true);

        Role saved = roleRepository.save(entity);
        return CrudResponseDto.success(RoleMapper.toDto(saved), OperationType.CREATE, "Role");
    }

    @Override
    public CrudResponseDto<Optional<RoleDto>> findById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rol con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(RoleMapper.toDto(role)), OperationType.READ, "Role");
    }

    @Override
    public CrudResponseDto<List<RoleDto>> findAll() {
        List<RoleDto> dtos = roleRepository.findAll()
                .stream()
                .map(RoleMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, OperationType.READ, "Role");
    }

    @Override
    public CrudResponseDto<RoleDto> update(RoleDto dto) {
        Role role = roleRepository.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Rol con id " + dto.getId() + " no encontrado."));

        role.setName(dto.getName());
        role.setDescription(dto.getDescription());
        role.setActive(dto.getActive());

        Role updated = roleRepository.save(role);
        return CrudResponseDto.success(RoleMapper.toDto(updated), OperationType.UPDATE, "Role");
    }

    @Override
    public CrudResponseDto<RoleDto> deleteById(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new EntityNotFoundException("Rol con id " + id + " no encontrado.");
        }

        roleRepository.deleteById(id);
        return CrudResponseDto.success(null, OperationType.DELETE, "Role");
    }

    @Override
    public CrudResponseDto<RoleDto> activateById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rol con id " + id + " no encontrado."));

        role.setActive(true);
        roleRepository.save(role);
        return CrudResponseDto.success(RoleMapper.toDto(role), OperationType.ACTIVATE, "Role");
    }

    @Override
    public CrudResponseDto<RoleDto> deactivateById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rol con id " + id + " no encontrado."));

        role.setActive(false);
        roleRepository.save(role);
        return CrudResponseDto.success(RoleMapper.toDto(role), OperationType.DEACTIVATE, "Role");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        if (roleRepository.existsById(id)) {
            return CrudResponseDto.success(true, "Rol con id " + id + " existe.");
        }
        return CrudResponseDto.success(false, "Rol con id " + id + " no existe.");
    }

    // Método específico para obtener todos los roles (mantener compatibilidad)
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    private static class RoleMapper {

        private static RoleDto toDto(Role entity) {
            RoleDto dto = new RoleDto();
            dto.setId(entity.getId());
            dto.setName(entity.getName());
            dto.setDescription(entity.getDescription());
            dto.setActive(entity.getActive());
            dto.setCreatedAt(entity.getCreatedAt());
            dto.setUpdatedAt(entity.getUpdatedAt());
            return dto;
        }

        private static Role toEntity(RoleDto dto) {
            Role entity = new Role();
            entity.setId(dto.getId());
            entity.setName(dto.getName());
            entity.setDescription(dto.getDescription());
            entity.setActive(dto.getActive());
            return entity;
        }
    }
}
