package com.sena.urbantracker.security.application.service;

import com.sena.urbantracker.security.application.dto.response.RoleResDtoA;
import com.sena.urbantracker.security.domain.entity.Role;
import com.sena.urbantracker.security.domain.repository.RoleRepository;
import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoleService implements CrudOperations<RoleResDtoA, RoleResDtoA, Long> {

    private final RoleRepository roleRepository;

    @Override
    public CrudResponseDto<RoleResDtoA> create(RoleResDtoA dto) {
        if (roleRepository.existsByName(dto.getName())) {
            throw new EntityAlreadyExistsException("El rol con nombre " + dto.getName() + " ya existe.");
        }

        Role entity = RoleMapper.toEntity(dto);
        entity.setActive(true);

        Role saved = roleRepository.save(entity);
        return CrudResponseDto.success(RoleMapper.toDto(saved), "Rol creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<RoleResDtoA>> findById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rol con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(RoleMapper.toDto(role)), "Rol encontrado");
    }

    @Override
    public CrudResponseDto<List<RoleResDtoA>> findAll() {
        log.info("Entrando a findAll de RoleService...");
        List<RoleResDtoA> dtos = roleRepository.findAll()
                .stream()
                .map(RoleMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de roles");
    }


    @Override
    public CrudResponseDto<RoleResDtoA> update(RoleResDtoA dto, Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rol con id " + id + " no encontrado."));

        role.setName(dto.getName());
        role.setDescription(dto.getDescription());
        role.setActive(dto.getActive());

        Role updated = roleRepository.save(role);
        return CrudResponseDto.success(RoleMapper.toDto(updated), "Rol actualizado correctamente");
    }

    @Override
    public CrudResponseDto<RoleResDtoA> deleteById(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new EntityNotFoundException("Rol con id " + id + " no encontrado.");
        }

        roleRepository.deleteById(id);
        return CrudResponseDto.success(null, "Rol eliminado correctamente");
    }

    @Override
    public CrudResponseDto<RoleResDtoA> activateById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rol con id " + id + " no encontrado."));

        role.setActive(true);
        roleRepository.save(role);
        return CrudResponseDto.success(RoleMapper.toDto(role), "Rol activado");
    }

    @Override
    public CrudResponseDto<RoleResDtoA> deactivateById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rol con id " + id + " no encontrado."));

        role.setActive(false);
        roleRepository.save(role);
        return CrudResponseDto.success(RoleMapper.toDto(role), "Rol desactivado");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(roleRepository.existsById(id), "Verificación de existencia completada");
    }

    // Método específico para obtener todos los roles (mantener compatibilidad)
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    private static class RoleMapper {

        private static RoleResDtoA toDto(Role entity) {
            if (entity == null) return null;
            RoleResDtoA dto = new RoleResDtoA();
            dto.setId(entity.getId());
            dto.setName(entity.getName());
            dto.setDescription(entity.getDescription());
            dto.setActive(entity.getActive());
            return dto;
        }

        private static Role toEntity(RoleResDtoA dto) {
            if (dto == null) return null;
            Role entity = new Role();
            entity.setId(dto.getId());
            entity.setName(dto.getName());
            entity.setDescription(dto.getDescription());
            entity.setActive(dto.getActive());
            return entity;
        }
    }
}
