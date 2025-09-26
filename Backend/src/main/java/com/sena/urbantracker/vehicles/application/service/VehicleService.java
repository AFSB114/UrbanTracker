package com.sena.urbantracker.vehicles.application.service;

import com.sena.urbantracker.vehicles.application.dto.request.VehicleReqDto;
import com.sena.urbantracker.vehicles.application.dto.response.VehicleResDto;
import com.sena.urbantracker.vehicles.application.mapper.VehicleMapper;
import com.sena.urbantracker.vehicles.domain.entity.VehicleDomain;
import com.sena.urbantracker.vehicles.domain.repository.VehicleRepository;
import com.sena.urbantracker.vehicles.domain.repository.VehicleTypeRepository;
import com.sena.urbantracker.users.domain.entity.CompanyDomain;
import com.sena.urbantracker.users.domain.repository.CompanyRepository;
import com.sena.urbantracker.vehicles.domain.entity.VehicleTypeDomain;
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
public class VehicleService implements CrudOperations<VehicleReqDto, VehicleResDto, Long> {

    private final VehicleRepository vehicleRepository;
    private final CompanyRepository companyRepository;
    private final VehicleTypeRepository vehicleTypeRepository;

    @Override
    public CrudResponseDto<VehicleResDto> create(VehicleReqDto request) {
        if (vehicleRepository.existsByLicencePlate(request.getLicencePlate())) {
            throw new EntityAlreadyExistsException("Ya existe un vehículo con placa: " + request.getLicencePlate());
        }

        VehicleDomain entity = VehicleMapper.toEntity(request);

        CompanyDomain company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new EntityNotFoundException("Compañía no encontrada"));
        VehicleTypeDomain vehicleType = vehicleTypeRepository.findById(request.getVehicleTypeId())
                .orElseThrow(() -> new EntityNotFoundException("Tipo de vehículo no encontrado"));

        entity.setCompany(company);
        entity.setVehicleType(vehicleType);

        VehicleDomain saved = vehicleRepository.save(entity);

        return CrudResponseDto.success(VehicleMapper.toDto(saved), "Vehículo creado correctamente");
    }

    @Override
    public CrudResponseDto<Optional<VehicleResDto>> findById(Long id) {
        VehicleDomain vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vehículo con id " + id + " no encontrado."));

        return CrudResponseDto.success(Optional.of(VehicleMapper.toDto(vehicle)), "Vehículo encontrado");
    }

    @Override
    public CrudResponseDto<List<VehicleResDto>> findAll() {
        List<VehicleResDto> dtos = vehicleRepository.findAll()
                .stream()
                .map(VehicleMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de vehículos");
    }

    @Override
    public CrudResponseDto<VehicleResDto> update(VehicleReqDto request, Long id) {
        VehicleDomain vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Vehículo no encontrado."));

        vehicle.setLicencePlate(request.getLicencePlate());
        vehicle.setBrand(request.getBrand());
        vehicle.setModel(request.getModel());
        vehicle.setYear(request.getYear());
        vehicle.setColor(request.getColor());
        vehicle.setPassengerCapacity(request.getPassengerCapacity());
        vehicle.setStatus(request.getStatus());
        vehicle.setInService(request.isInService());

        VehicleDomain updated = vehicleRepository.save(vehicle);
        return CrudResponseDto.success(VehicleMapper.toDto(updated), "Vehículo actualizado correctamente");
    }

    @Override
    public CrudResponseDto<VehicleResDto> deleteById(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new EntityNotFoundException("Vehículo no encontrado.");
        }

        vehicleRepository.deleteById(id);
        return CrudResponseDto.success(VehicleMapper.toDto(null), "Vehículo eliminado correctamente");
    }

    @Override
    public CrudResponseDto<VehicleResDto> activateById(Long id) {
        VehicleDomain vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vehículo no encontrado."));
        vehicle.setActive(true);
        vehicleRepository.save(vehicle);
        return CrudResponseDto.success(VehicleMapper.toDto(vehicle), "Vehículo activado");
    }

    @Override
    public CrudResponseDto<VehicleResDto> deactivateById(Long id) {
        VehicleDomain vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vehículo no encontrado."));
        vehicle.setActive(false);
        vehicleRepository.save(vehicle);
        return CrudResponseDto.success(VehicleMapper.toDto(vehicle), "Vehículo desactivado");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(vehicleRepository.existsById(id), "Verificación de existencia completada");
    }

}
