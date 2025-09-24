package com.sena.urbantracker.vehicles.application.service;

import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleResDtoA;
import com.sena.urbantracker.vehicles.domain.entity.Vehicle;
import com.sena.urbantracker.vehicles.domain.valueobject.VehicleStatusType;
import com.sena.urbantracker.vehicles.domain.repository.IVehicle;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleService implements CrudOperations<VehicleResDtoA, VehicleResDtoA, Long>{

    private final IVehicle vehicleRepository;

    @Override
    public CrudResponseDto<VehicleResDtoA> create(VehicleResDtoA dto) {
        if (vehicleRepository.existsByLicencePlate(dto.getLicencePlate())) {
            throw new EntityAlreadyExistsException("Ya existe un vehículo con placa: " + dto.getLicencePlate());
        }

        Vehicle entity = VehicleMapper.toEntity(dto);
        entity.setStatus(VehicleStatusType.ACTIVE);

        Vehicle saved = vehicleRepository.save(entity);
        return CrudResponseDto.success(VehicleMapper.toDto(saved), "Vehículo creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<VehicleResDtoA>> findById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vehículo con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(VehicleMapper.toDto(vehicle)), "Vehículo encontrado");
    }

    @Override
    public CrudResponseDto<List<VehicleResDtoA>> findAll() {
        List<VehicleResDtoA> dtos = vehicleRepository.findAll()
                .stream()
                .map(VehicleMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de vehículos");
    }


    @Override
    public CrudResponseDto<VehicleResDtoA> update(VehicleResDtoA dto, Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Vehículo no encontrado."));

        vehicle.setModel(dto.getModel());
        vehicle.setLicencePlate(dto.getLicencePlate());

        Vehicle updated = vehicleRepository.save(vehicle);
        return CrudResponseDto.success(VehicleMapper.toDto(updated), "Vehículo actualizado correctamente");
    }

    @Override
    public CrudResponseDto<VehicleResDtoA> deleteById(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new EntityNotFoundException("Vehículo no encontrado.");
        }

        vehicleRepository.deleteById(id);
        return CrudResponseDto.success(VehicleMapper.toDto(null), "Vehículo eliminado correctamente");
    }

    @Override
    public CrudResponseDto<VehicleResDtoA> activateById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vehículo no encontrado."));
        vehicle.setStatus(VehicleStatusType.ACTIVE);
        vehicleRepository.save(vehicle);
        return CrudResponseDto.success(VehicleMapper.toDto(vehicle), "Vehículo activado");
    }

    @Override
    public CrudResponseDto<VehicleResDtoA> deactivateById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vehículo no encontrado."));
        vehicle.setStatus(VehicleStatusType.INACTIVE);
        vehicleRepository.save(vehicle);
        return CrudResponseDto.success(VehicleMapper.toDto(vehicle), "Vehículo desactivado");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(vehicleRepository.existsById(id), "Verificación de existencia completada");
    }


    private static class VehicleMapper {
        public static VehicleResDtoA toDto(Vehicle entity) {
            if (entity == null) return null;

            VehicleResDtoA dto = new VehicleResDtoA();
            dto.setId(entity.getId());
            dto.setLicencePlate(entity.getLicencePlate());
            dto.setModel(entity.getModel());
            dto.setColor(entity.getColor());
            dto.setYear(entity.getYear());
            dto.setBrand(entity.getBrand());
            dto.setCompany(entity.getCompany());
            dto.setPassengerCapacity(entity.getPassengerCapacity());
            dto.setVehicleType(entity.getVehicleType());
            dto.setActive(entity.getStatus().equals(VehicleStatusType.ACTIVE));
            return dto;
        }

        public static Vehicle toEntity(VehicleResDtoA dto) {
            if (dto == null) return null;

            Vehicle entity = new Vehicle();
            entity.setId(dto.getId());
            entity.setLicencePlate(dto.getLicencePlate());
            entity.setModel(dto.getModel());
            entity.setColor(dto.getColor());
            entity.setYear(dto.getYear());
            entity.setBrand(dto.getBrand());
            entity.setCompany(dto.getCompany());
            entity.setPassengerCapacity(dto.getPassengerCapacity());
            entity.setVehicleType(dto.getVehicleType());
            entity.setStatus(dto.getActive() ? VehicleStatusType.ACTIVE : VehicleStatusType.INACTIVE);
            return entity;
        }
    }

}
