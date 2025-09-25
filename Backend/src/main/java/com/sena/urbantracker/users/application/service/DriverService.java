package com.sena.urbantracker.users.application.service;

import com.sena.urbantracker.security.domain.entity.RoleDomain;
import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.security.domain.repository.RoleRepository;
import com.sena.urbantracker.security.domain.repository.UserRepository;
import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.request.DriverReqDto;
import com.sena.urbantracker.users.application.dto.response.DriverResDto;
import com.sena.urbantracker.users.application.mapper.DriverMapper;
import com.sena.urbantracker.users.domain.entity.DriverDomain;
import com.sena.urbantracker.users.domain.entity.UserProfileDomain;
import com.sena.urbantracker.users.domain.repository.DriverRepository;
import com.sena.urbantracker.users.domain.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DriverService implements CrudOperations<DriverReqDto, DriverResDto, Long> {

    private final DriverRepository driverRepository;
    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public CrudResponseDto<DriverResDto> create(DriverReqDto request) {

        // Check if user exists
        if (userRepository.existsByUserName(request.getIdNumber())) {
            throw new EntityAlreadyExistsException("Ya existe un usuario con nombre: " + request.getIdNumber());
        }

        // Get role
        RoleDomain role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new EntityNotFoundException("Rol no encontrado"));

        // Create User
        UserDomain user = UserDomain.builder()
                .userName(request.getIdNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .active(true)
                .build();

        UserDomain savedUser = userRepository.save(user);

        // Create UserProfile
        UserProfileDomain profile = UserProfileDomain.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .user(savedUser)
                .active(true)
                .build();

        UserProfileDomain savedProfile = userProfileRepository.save(profile);

        // Create Driver
        DriverDomain driver = DriverDomain.builder()
                .user(savedUser)
                .active(true)
                .build();

        DriverDomain saved = driverRepository.save(driver);

        return CrudResponseDto.success(
                DriverMapper.toDto(saved, savedProfile),
                "Conductor creado correctamente"
        );
    }


    @Override
    public CrudResponseDto<Optional<DriverResDto>> findById(Long id) {
        DriverDomain driver = driverRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + id + " no encontrado."));

        UserProfileDomain profile = userProfileRepository.findByUserId(driver.getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));

        return CrudResponseDto.success(Optional.of(DriverMapper.toDto(driver, profile)), "Conductor encontrado");
    }

    @Override
    public CrudResponseDto<List<DriverResDto>> findAll() {
        List<DriverDomain> drivers = driverRepository.findAll();
        List<DriverResDto> dtos = drivers.stream().map(driver -> {
            UserProfileDomain profile = userProfileRepository.findByUserId(driver.getUser().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));
            return DriverMapper.toDto(driver, profile);
        }).toList();
        return CrudResponseDto.success(dtos, "Conductores encontrados");
    }

    @Override
    public CrudResponseDto<DriverResDto> update(DriverReqDto dto, Long id) {
        DriverDomain driver = driverRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + id + " no encontrado."));

        UserDomain user = driver.getUser();

        // Update user
        user.setUserName(dto.getIdNumber());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        RoleDomain role = roleRepository.findById(dto.getRoleId())
                .orElseThrow(() -> new EntityNotFoundException("Rol no encontrado"));
        user.setRole(role);

        // Update profile
        UserProfileDomain profile = userProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));
        profile.setFirstName(dto.getFirstName());
        profile.setLastName(dto.getLastName());
        profile.setEmail(dto.getEmail());
        profile.setPhone(dto.getPhone());

        userProfileRepository.save(profile);
        userRepository.save(user);
        DriverDomain updated = driverRepository.save(driver);

        return CrudResponseDto.success(DriverMapper.toDto(updated, profile), "Conductor actualizado correctamente");
    }

    @Override
    public CrudResponseDto<DriverResDto> deleteById(Long aLong) {
        DriverDomain driver = driverRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + aLong + " no encontrado."));

        UserDomain user = driver.getUser();

        // Delete profile first
        UserProfileDomain profile = userProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));
        userProfileRepository.deleteById(profile.getId());

        // Delete driver (which cascades to user)
        driverRepository.deleteById(aLong);

        return CrudResponseDto.success(null, "Conductor eliminado correctamente");
    }

    @Override
    public CrudResponseDto<DriverResDto> activateById(Long aLong) {
        DriverDomain driver = driverRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + aLong + " no encontrado."));

        driver.setActive(true);
        driverRepository.save(driver);

        UserProfileDomain profile = userProfileRepository.findByUserId(driver.getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));

        return CrudResponseDto.success(DriverMapper.toDto(driver, profile), "Conductor activado correctamente");
    }

    @Override
    public CrudResponseDto<DriverResDto> deactivateById(Long aLong) {
        DriverDomain driver = driverRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + aLong + " no encontrado."));

        driver.setActive(false);
        driverRepository.save(driver);

        UserProfileDomain profile = userProfileRepository.findByUserId(driver.getUser().getId())
                .orElseThrow(() -> new EntityNotFoundException("Perfil de usuario no encontrado"));

        return CrudResponseDto.success(DriverMapper.toDto(driver, profile), "Conductor desactivado correctamente");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        if (driverRepository.existsById(aLong)) {
            return CrudResponseDto.success(true, "Conductor con id " + aLong + " existe.");
        }
        return CrudResponseDto.success(false, "Conductor con id " + aLong + " no existe.");
    }
}
