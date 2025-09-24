package com.sena.urbantracker.users.application.service;

import com.sena.urbantracker.users.application.dto.request.CompanyReqDto;
import com.sena.urbantracker.users.application.dto.response.CompanyResDto;
import com.sena.urbantracker.users.application.mapper.CompanyMapper;
import com.sena.urbantracker.users.domain.entity.CompanyDomain;
import com.sena.urbantracker.users.domain.repository.CompanyRepository;
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
public class CompanyService implements CrudOperations<CompanyReqDto, CompanyResDto, Long> {

    private final CompanyRepository companyRepository;

    @Override
    public CrudResponseDto<CompanyResDto> create(CompanyReqDto request) {
        if (companyRepository.existsByNit(request.getNit())) {
            throw new EntityAlreadyExistsException("Ya existe una compañía con NIT: " + request.getNit());
        }

        CompanyDomain entity = CompanyMapper.toEntity(request);
        CompanyDomain saved = companyRepository.save(entity);

        return CrudResponseDto.success(CompanyMapper.toDto(saved), "Compañía creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<CompanyResDto>> findById(Long id) {
        CompanyDomain company = companyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Compañía con id " + id + " no encontrada."));

        return CrudResponseDto.success(Optional.of(CompanyMapper.toDto(company)), "Compañía encontrada");
    }

    @Override
    public CrudResponseDto<List<CompanyResDto>> findAll() {
        List<CompanyResDto> dtos = companyRepository.findAll()
                .stream()
                .map(CompanyMapper::toDto)
                .toList();

        return CrudResponseDto.success(dtos, "Listado de compañías");
    }

    @Override
    public CrudResponseDto<CompanyResDto> update(CompanyReqDto request, Long id) {
        CompanyDomain company = companyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se puede actualizar. Compañía no encontrada."));

        company.setName(request.getName());
        company.setNit(request.getNit());
        company.setPhone(request.getPhone());
        company.setEmail(request.getEmail());
        company.setCountry(request.getCountry());

        CompanyDomain updated = companyRepository.save(company);
        return CrudResponseDto.success(CompanyMapper.toDto(updated), "Compañía actualizada correctamente");
    }

    @Override
    public CrudResponseDto<CompanyResDto> deleteById(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new EntityNotFoundException("Compañía no encontrada.");
        }

        companyRepository.deleteById(id);
        return CrudResponseDto.success(CompanyMapper.toDto(null), "Compañía eliminada correctamente");
    }

    @Override
    public CrudResponseDto<CompanyResDto> activateById(Long id) {
        CompanyDomain company = companyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Compañía no encontrada."));
        company.setActive(true);
        companyRepository.save(company);
        return CrudResponseDto.success(CompanyMapper.toDto(company), "Compañía activada");
    }

    @Override
    public CrudResponseDto<CompanyResDto> deactivateById(Long id) {
        CompanyDomain company = companyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Compañía no encontrada."));
        company.setActive(false);
        companyRepository.save(company);
        return CrudResponseDto.success(CompanyMapper.toDto(company), "Compañía desactivada");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(companyRepository.existsById(id), "Verificación de existencia completada");
    }

    public boolean existsByNit(String nit) {
        return companyRepository.existsByNit(nit);
    }
}
