package com.sena.urbantracker.users.application.service;

import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.response.DriverResDtoA;
import com.sena.urbantracker.users.domain.repository.IDriver;
import com.sena.urbantracker.users.domain.entity.Driver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DriverService implements CrudOperations<DriverResDtoA, DriverResDtoA, Long> {

    private final IDriver driverRepository;

    @Override
    public CrudResponseDto<DriverResDtoA> create(DriverResDtoA dto) {
        if (driverRepository.existsById(dto.getId())) {
            throw new EntityAlreadyExistsException("El conductor con id " + dto.getId() + " ya existe.");
        }
        Driver entity = DriverMapper.toEntity(dto);
        entity.setActive(true);

        Driver saved = driverRepository.save(entity);
        return CrudResponseDto.success(DriverMapper.toDto(saved), "Conductor creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<DriverResDtoA>> findById(Long aLong) {
        Driver driver = driverRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + aLong + " no encontrado."));

        return CrudResponseDto.success(Optional.of(DriverMapper.toDto(driver)), "Conductor encontrado");
    }

    @Override
    public CrudResponseDto<List<DriverResDtoA>> findAll() {
        List<Driver> drivers = driverRepository.findAll();
        return CrudResponseDto.success(drivers.stream().map(DriverMapper::toDto).toList(), "Conductores encontrados");
    }

    @Override
    public CrudResponseDto<DriverResDtoA> update(DriverResDtoA dto, Long id) {
        Driver driver = driverRepository.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + dto.getId() + " no encontrado."));

        driver.setUser(dto.getUser());
        driver.setActive(dto.getActive());

        Driver updated = driverRepository.save(driver);
        return CrudResponseDto.success(DriverMapper.toDto(updated), "Conductor actualizado correctamente");
    }

    @Override
    public CrudResponseDto<DriverResDtoA> deleteById(Long aLong) {
        if (!driverRepository.existsById(aLong)) {
            throw new EntityNotFoundException("Conductor con id " + aLong + " no encontrado.");
        }

        driverRepository.deleteById(aLong);
        return CrudResponseDto.success(DriverMapper.toDto(null), "Conductor eliminado correctamente");
    }

    @Override
    public CrudResponseDto<DriverResDtoA> activateById(Long aLong) {
        Driver driver = driverRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + aLong + " no encontrado."));

        driver.setActive(true);
        driverRepository.save(driver);
        return CrudResponseDto.success(DriverMapper.toDto(driver), "Conductor activado correctamente");
    }

    @Override
    public CrudResponseDto<DriverResDtoA> deactivateById(Long aLong) {
        Driver driver = driverRepository.findById(aLong)
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

    private static class DriverMapper {

        private static DriverResDtoA toDto(Driver entity) {
            if (entity == null) return null;
            DriverResDtoA dto = new DriverResDtoA();
            dto.setId(entity.getId());
            dto.setUser(entity.getUser());
            dto.setActive(entity.getActive());
            return dto;
        }

        private static Driver toEntity(DriverResDtoA dto) {
            Driver entity = new Driver();
            entity.setId(dto.getId());
            entity.setUser(dto.getUser());
            entity.setActive(dto.getActive());
            return entity;
        }
    }

}
