package com.sena.urbantracker.security.application.service;

import com.sena.urbantracker.security.application.dto.request.UserReqDto;
import com.sena.urbantracker.security.application.dto.request.UserResDto;
import com.sena.urbantracker.security.application.mapper.UserMapper;
import com.sena.urbantracker.security.domain.entity.RoleDomain;
import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.security.domain.repository.RoleRepository;
import com.sena.urbantracker.security.domain.repository.UserRepository;
import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements CrudOperations<UserReqDto, UserResDto, Long> {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public CrudResponseDto<UserResDto>create(UserReqDto request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            throw new EntityAlreadyExistsException("Ya existe un usuario con nombre: " + request.getUserName());
        }

        RoleDomain role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new EntityNotFoundException("Rol no encontrado"));

        UserDomain entity = UserMapper.toEntity(request);
        entity.setRole(role);

        //se codifica la contraseña
        entity.setPassword(passwordEncoder.encode(request.getPassword()));

        UserDomain saved = userRepository.save(entity);

        return CrudResponseDto.success(UserMapper.toDto(saved), "Usuario creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<UserResDto>> findById(Long id) {
        UserDomain user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(UserMapper.toDto(user)), "Usuario encontrado");
    }

    @Override
    public CrudResponseDto<List<UserResDto>> findAll() {
        List<UserResDto> dtos = userRepository.findAll()
                .stream()
                .map(UserMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de usuarios");
    }

    @Override
    public CrudResponseDto<UserResDto> update(UserReqDto request, Long id) {
        UserDomain user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Usuario no encontrado."));

        user.setUserName(request.getUserName());
        user.setPassword(request.getPassword());

        RoleDomain role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new EntityNotFoundException("Rol no encontrado"));
        user.setRole(role);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        UserDomain updated = userRepository.save(user);
        return CrudResponseDto.success(UserMapper.toDto(updated), "Usuario actualizado correctamente");
    }

    @Override
    public CrudResponseDto<UserResDto> deleteById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("Usuario no encontrado.");
        }

        userRepository.deleteById(id);
        return CrudResponseDto.success(UserMapper.toDto(null), "Usuario eliminado correctamente");
    }

    @Override
    public CrudResponseDto<UserResDto> activateById(Long id) {
        UserDomain user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado."));
        user.setActive(true);
        userRepository.save(user);
        return CrudResponseDto.success(UserMapper.toDto(user), "Usuario activado");
    }

    @Override
    public CrudResponseDto<UserResDto> deactivateById(Long id) {
        UserDomain user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado."));
        user.setActive(false);
        userRepository.save(user);
        return CrudResponseDto.success(UserMapper.toDto(user), "Usuario desactivado");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(userRepository.existsById(id), "Verificación de existencia completada");
    }

}