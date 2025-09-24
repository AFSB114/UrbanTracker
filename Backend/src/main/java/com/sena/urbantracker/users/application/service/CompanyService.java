package com.sena.urbantracker.users.application.service;


import com.sena.urbantracker.shared.infrastructure.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.infrastructure.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.application.dto.CrudResponseDto;
import com.sena.urbantracker.shared.domain.repository.CrudOperations;
import com.sena.urbantracker.users.application.dto.request.CompanyReqDto;
import com.sena.urbantracker.users.application.dto.response.CompanyResDTOA;
import com.sena.urbantracker.users.domain.repository.ICompany;
import com.sena.urbantracker.users.domain.entity.Company;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyService implements CrudOperations<CompanyReqDto, CompanyResDTOA, Long> {

    private final ICompany companyRepository;

    @Override
    public CrudResponseDto<CompanyResDTOA> create(CompanyReqDto dto) {
       if (companyRepository.existsByNit(dto.getNit())) {
           throw new EntityAlreadyExistsException("La empresa con NIT " + dto.getNit() + " ya existe.");
       }
       Company entity = CompanyMapper.toEntity(dto);
       entity.setActive(true);

       Company saved = companyRepository.save(entity);
       return CrudResponseDto.success(CompanyMapper.toDto(saved), "Empresa creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<CompanyResDTOA>> findById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empresa con id " + id + " no encontrada."));

        return CrudResponseDto.success(Optional.of(CompanyMapper.toDto(company)), "Empresa encontrada");
    }

    @Override
    public CrudResponseDto<List<CompanyResDTOA>> findAll() {
        List<Company> companies = companyRepository.findAll();
        return CrudResponseDto.success(companies.stream().map(CompanyMapper::toDto).toList(), "Empresas encontradas");
    }

    @Override
    public CrudResponseDto<CompanyResDTOA> update(CompanyReqDto dto, Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empresa con id " + id + " no encontrada."));

        company.setName(dto.getName());
        company.setNit(dto.getNit());
        company.setPhone(dto.getPhone());
        company.setEmail(dto.getEmail());
        company.setCountry(dto.getCountry());
//        company.setActive(dto.getActive());

        Company updated = companyRepository.save(company);
        return CrudResponseDto.success(CompanyMapper.toDto(updated), "Empresa actualizada correctamente");
    }

    @Override
    public CrudResponseDto<CompanyResDTOA> deleteById(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new EntityNotFoundException("Empresa con id " + id + " no encontrada.");
        }

        companyRepository.deleteById(id);
        return CrudResponseDto.success(null, "Empresa eliminada correctamente");
    }

    @Override
    public CrudResponseDto<CompanyResDTOA> activateById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empresa con id " + id + " no encontrada."));

        company.setActive(true);
        companyRepository.save(company);
        return CrudResponseDto.success(CompanyMapper.toDto(company), "Empresa activada");
    }

    @Override
    public CrudResponseDto<CompanyResDTOA> deactivateById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empresa con id " + id + " no encontrada."));

        company.setActive(false);
        companyRepository.save(company);
        return CrudResponseDto.success(CompanyMapper.toDto(company), "Empresa desactivada");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long id) {
        return CrudResponseDto.success(companyRepository.existsById(id), "Verificación de existencia completada");
    }


    private static class CompanyMapper {

        private static CompanyResDTOA toDto(Company entity) {
            if (entity == null) return null;
            CompanyResDTOA dto = new CompanyResDTOA();
            dto.setId(entity.getId());
            dto.setName(entity.getName());
            dto.setNit(entity.getNit());
            dto.setEmail(entity.getEmail());
            dto.setPhone(entity.getPhone());
            dto.setCountry(entity.getCountry());
            dto.setActive(entity.getActive());
            return dto;
        }

        private static Company toEntity(CompanyReqDto dto) {
            if (dto == null) return null;
            Company entity = new Company();
            entity.setName(dto.getName());
            entity.setNit(dto.getNit());
            entity.setPhone(dto.getPhone());
            entity.setEmail(dto.getEmail());
            entity.setCountry(dto.getCountry());
            return entity;
        }
    }

}
