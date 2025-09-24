package com.sena.urbantracker.users.application.service;

import com.sena.urbantracker.security.domain.entity.UserDomain;
import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.request.DriverReqDto;
import com.sena.urbantracker.users.application.dto.response.DriverResDto;
import com.sena.urbantracker.users.application.mapper.DriverMapper;
import com.sena.urbantracker.users.domain.entity.DriverDomain;
import com.sena.urbantracker.users.domain.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DriverService implements CrudOperations<DriverReqDto, DriverResDto, Long> {

    private final DriverRepository driverRepository;

    @Override
    public CrudResponseDto<DriverResDto> create(DriverReqDto request) {
        if (driverRepository.existsByUserId(request.getUserId())) {
            throw new EntityAlreadyExistsException("Ya existe un conductor para el usuario con id: " + request.getUserId());
        }
        DriverDomain entity = DriverMapper.toEntity(request);
        entity.setActive(true);
        DriverDomain saved = driverRepository.save(entity);

        return CrudResponseDto.success(DriverMapper.toDto(saved), "Conductor creado correctamente");
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

        driver.setUser(UserDomain.builder().id(dto.getUserId()).build());
//        driver.setActive(dto.getActive());

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
