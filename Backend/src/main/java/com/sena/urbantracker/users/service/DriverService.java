package com.sena.urbantracker.users.service;

import com.sena.urbantracker.shared.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.users.model.dto.response.DriverDto;
import com.sena.urbantracker.users.model.entity.Driver;
import com.sena.urbantracker.users.repository.IDriver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DriverService implements CrudOperations<DriverDto, Long> {

    private final IDriver driverRepository;

    @Override
    public CrudResponseDto<DriverDto> create(DriverDto dto) {
        if (driverRepository.existsById(dto.getId())) {
            throw new EntityAlreadyExistsException("Ya existe un conductor con id: " + dto.getId());
        }

        Driver entity = DriverMapper.toEntity(dto);
        entity.setActive(true);

        Driver saved = driverRepository.save(entity);
        return CrudResponseDto.success(DriverMapper.toDto(saved), "Conductor creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<DriverDto>> findById(Long id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Conductor con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(DriverMapper.toDto(driver)), "Conductor encontrado");
    }

    @Override
    public CrudResponseDto<List<DriverDto>> findAll() {
        List<Driver> drivers = driverRepository.findAll();
        return CrudResponseDto.success(drivers.stream().map(DriverMapper::toDto).toList(), "Conductores encontrados");
    }

    @Override
    public CrudResponseDto<DriverDto> update(DriverDto dto) {
        Driver driver = driverRepository.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Conductor no encontrado."));

        driver.setActive(dto.getActive());

        Driver updated = driverRepository.save(driver);
        return CrudResponseDto.success(DriverMapper.toDto(updated), "Conductor actualizado correctamente");
    }

    @Override
    public CrudResponseDto<DriverDto> deleteById(Long id) {
        if (!driverRepository.existsById(id)) {
            throw new EntityNotFoundException("Conductor no encontrado.");
        }

        driverRepository.deleteById(id);
        return CrudResponseDto.success(DriverMapper.toDto(null), "Conductor eliminado correctamente");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Conductor no encontrado."));
        return CrudResponseDto.success(driverRepository.existsById(id), "Conductor encontrado");
    }

    @Override
    public CrudResponseDto<DriverDto> activateById(Long id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Conductor no encontrado."));
        driver.setActive(true);
        driverRepository.save(driver);
        return CrudResponseDto.success(DriverMapper.toDto(driver), "Conductor activado");
    }

    @Override
    public CrudResponseDto<DriverDto> deactivateById(Long id) {
        Driver driver = driverRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Conductor no encontrado."));
        driver.setActive(false);
        driverRepository.save(driver);
        return CrudResponseDto.success(DriverMapper.toDto(driver), "Conductor desactivado");
    }

    public static class DriverMapper {
        public static DriverDto toDto(Driver entity) {
            DriverDto dto = new DriverDto();
            dto.setId(entity.getId());
            dto.setActive(entity.getActive());
            return dto;
        }

        public static Driver toEntity(DriverDto dto) {
            Driver entity = new Driver();
            entity.setId(dto.getId());
            entity.setActive(dto.getActive());
            return entity;
        }
    }
}
