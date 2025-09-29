package com.sena.urbantracker.security.application.service;

import com.sena.urbantracker.security.application.dto.request.RoleReqDto;
import com.sena.urbantracker.security.application.dto.request.RoleResDto;
import com.sena.urbantracker.security.application.mapper.RoleMapper;
import com.sena.urbantracker.security.domain.entity.RoleDomain;
import com.sena.urbantracker.security.domain.repository.RoleRepository;
import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService implements CrudOperations<RoleReqDto, RoleResDto, Long> {

    private final RoleRepository roleRepository;

    @Override
    public CrudResponseDto<RoleResDto> create(RoleReqDto request) {
        if (roleRepository.existsByName(request.getName())) {
            throw new EntityAlreadyExistsException("Ya existe un rol con nombre: " + request.getName());
        }

        RoleDomain entity = RoleMapper.toEntity(request);
        RoleDomain saved = roleRepository.save(entity);

        return CrudResponseDto.success(RoleMapper.toDto(saved), "Rol creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<RoleResDto>> findById(Long id) {
        RoleDomain role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rol con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(RoleMapper.toDto(role)), "Rol encontrado");
    }

    @Override
    public CrudResponseDto<List<RoleResDto>> findAll() {
        List<RoleResDto> dtos = roleRepository.findAll()
                .stream()
                .map(RoleMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de roles");
    }

    @Override
    public CrudResponseDto<RoleResDto> update(RoleReqDto request, Long id) {
        RoleDomain role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Rol no encontrado."));

        role.setName(request.getName());
        role.setDescription(request.getDescription());

        RoleDomain updated = roleRepository.save(role);
        return CrudResponseDto.success(RoleMapper.toDto(updated), "Rol actualizado correctamente");
    }

    @Override
    public CrudResponseDto<RoleResDto> deleteById(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new EntityNotFoundException("Rol no encontrado.");
        }

        roleRepository.deleteById(id);
        return CrudResponseDto.success(RoleMapper.toDto(null), "Rol eliminado correctamente");
    }

    @Override
    public CrudResponseDto<RoleResDto> activateById(Long id) {
        RoleDomain role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rol no encontrado."));
        role.setActive(true);
        roleRepository.save(role);
        return CrudResponseDto.success(RoleMapper.toDto(role), "Rol activado");
    }

    @Override
    public CrudResponseDto<RoleResDto> deactivateById(Long id) {
        RoleDomain role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rol no encontrado."));
        role.setActive(false);
        roleRepository.save(role);
        return CrudResponseDto.success(RoleMapper.toDto(role), "Rol desactivado");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(roleRepository.existsById(id), "Verificación de existencia completada");
    }

}
