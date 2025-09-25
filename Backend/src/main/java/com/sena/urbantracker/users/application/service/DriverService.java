package com.sena.urbantracker.users.application.service;

import com.sena.urbantracker.security.application.dto.request.UserReqDto;
import com.sena.urbantracker.security.application.dto.response.UserResDto;
import com.sena.urbantracker.security.application.service.UserService;
import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.security.domain.repository.UserRepository;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.request.DriverReqDto;
import com.sena.urbantracker.users.application.dto.request.UserProfileReqDto;
import com.sena.urbantracker.users.application.dto.response.DriverResDto;
import com.sena.urbantracker.users.application.dto.response.UserProfileResDto;
import com.sena.urbantracker.users.application.mapper.DriverMapper;
import com.sena.urbantracker.users.domain.entity.DriverDomain;
import com.sena.urbantracker.users.domain.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DriverService implements CrudOperations<DriverReqDto, DriverResDto, Long> {

    private final DriverRepository driverRepository;
    private final UserService userService;
    private final UserProfileService userProfileService;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public CrudResponseDto<DriverResDto> create(DriverReqDto request) {

        // 1. Crear User con su servicio
        UserReqDto userReq = new UserReqDto();
        userReq.setUserName(request.getIdNumber());
        userReq.setPassword(request.getPassword());
        userReq.setRoleId(request.getRoleId());

        CrudResponseDto<UserResDto> createdUser = userService.create(userReq);

        if (createdUser == null || createdUser.getData() == null) {
            throw new RuntimeException("Error al crear el usuario. No se puede continuar con la creación del conductor.");
        }

        // Obtener la referencia del User persistido
        UserDomain persistedUser = userRepository.findById(createdUser.getData().getId())
                .orElseThrow(() -> new EntityNotFoundException("El usuario recién creado no se encuentra en la base de datos"));

        // 2. Crear UserProfile asociado al User
        UserProfileReqDto profileDto = UserProfileReqDto.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .userId(persistedUser.getId()) // 🔑 se asocia al user real
                .build();

        CrudResponseDto<UserProfileResDto> createdProfile = userProfileService.create(profileDto);

        if (createdProfile == null || createdProfile.getData() == null) {
            throw new RuntimeException("Error al crear el perfil de usuario. No se puede continuar con la creación del conductor.");
        }

        // 3. Crear Driver enlazado al User
        DriverDomain driver = DriverMapper.toEntity(request);
        driver.setActive(true);
        driver.setUser(persistedUser); // 🔑 aquí sí ponemos el user persistido

        DriverDomain saved = driverRepository.save(driver);

        if (saved == null || saved.getId() == null) {
            throw new RuntimeException("Error al crear el conductor. Operación abortada.");
        }

        return CrudResponseDto.success(
                DriverMapper.toDto(saved),
                "Conductor creado correctamente"
        );
    }


    @Override
    public CrudResponseDto<Optional<DriverResDto>> findById(Long id) {
        DriverDomain driver = driverRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(DriverMapper.toDto(driver)), "Conductor encontrado");
    }

    @Override
    public CrudResponseDto<List<DriverResDto>> findAll() {
        List<DriverDomain> drivers = driverRepository.findAll();
        return CrudResponseDto.success(drivers.stream().map(DriverMapper::toDto).toList(), "Conductores encontrados");
    }

    @Override
    public CrudResponseDto<DriverResDto> update(DriverReqDto dto, Long id) {
        DriverDomain driver = driverRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + id + " no encontrado."));


        DriverDomain updated = driverRepository.save(driver);
        return CrudResponseDto.success(DriverMapper.toDto(updated), "Conductor actualizado correctamente");
    }

    @Override
    public CrudResponseDto<DriverResDto> deleteById(Long aLong) {
        if (!driverRepository.existsById(aLong)) {
            throw new EntityNotFoundException("Conductor con id " + aLong + " no encontrado.");
        }

        driverRepository.deleteById(aLong);
        return CrudResponseDto.success(DriverMapper.toDto(null), "Conductor eliminado correctamente");
    }

    @Override
    public CrudResponseDto<DriverResDto> activateById(Long aLong) {
        DriverDomain driver = driverRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + aLong + " no encontrado."));

        driver.setActive(true);
        driverRepository.save(driver);
        return CrudResponseDto.success(DriverMapper.toDto(driver), "Conductor activado correctamente");
    }

    @Override
    public CrudResponseDto<DriverResDto> deactivateById(Long aLong) {
        DriverDomain driver = driverRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + aLong + " no encontrado."));

        driver.setActive(false);
        driverRepository.save(driver);
        return CrudResponseDto.success(DriverMapper.toDto(driver), "Conductor desactivado correctamente");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        if (driverRepository.existsById(aLong)) {
            return CrudResponseDto.success(true, "Conductor con id " + aLong + " existe.");
        }
        return CrudResponseDto.success(false, "Conductor con id " + aLong + " no existe.");
    }
}
