package com.sena.urbantracker.users.service;


import com.sena.urbantracker.shared.exception.EntityAlreadyExistsException;
import com.sena.urbantracker.shared.exception.EntityNotFoundException;
import com.sena.urbantracker.shared.model.dto.CrudResponseDto;
import com.sena.urbantracker.shared.repository.CrudOperations;
import com.sena.urbantracker.users.model.dto.response.CompanyDTO;
import com.sena.urbantracker.users.repository.ICompany;
import com.sena.urbantracker.users.model.entity.Company;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyService implements CrudOperations<CompanyDTO, Long> {

    private final ICompany companyRepository;

    @Override
    public CrudResponseDto<CompanyDTO> create(CompanyDTO dto) {
       if (companyRepository.existsById(dto.getId())) {
           throw new EntityAlreadyExistsException("La empresa con id " + dto.getId() + " ya existe.");
       }
        System.out.println("se guardo en base de datos");
       Company entity = CompanyMapper.toEntity(dto);
       entity.setActive(true);

       Company saved = companyRepository.save(entity);
       return CrudResponseDto.success(CompanyMapper.toDto(saved), "Empresa creada correctamente");
    }

    @Override
    public CrudResponseDto<Optional<CompanyDTO>> findById(Long aLong) {
        Company company = companyRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Empresa con id " + aLong + " no encontrada."));

        return CrudResponseDto.success(Optional.of(CompanyMapper.toDto(company)), "Empresa encontrada");
    }

    @Override
    public CrudResponseDto<List<CompanyDTO>> findAll() {
        List<Company> companies = companyRepository.findAll();
        return CrudResponseDto.success(companies.stream().map(CompanyMapper::toDto).toList(), "Empresas encontradas");
    }

    @Override
    public CrudResponseDto<CompanyDTO> update(CompanyDTO dto) {
        Company company = companyRepository.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Empresa con id " + dto.getId() + " no encontrada."));

        company.setName(dto.getName());
        company.setNit(dto.getNit());
        company.setPhone(dto.getPhone());
        company.setEmail(dto.getEmail());
        company.setCountry(dto.getCountry());
        company.setActive(dto.getActive());

        Company updated = companyRepository.save(company);
        return CrudResponseDto.success(CompanyMapper.toDto(updated), "Empresa actualizada correctamente");
    }

    @Override
    public CrudResponseDto<CompanyDTO> deleteById(Long aLong) {
        if (!companyRepository.existsById(aLong)) {
            throw new EntityNotFoundException("Empresa con id " + aLong + " no encontrada.");
        }

        companyRepository.deleteById(aLong);
        return CrudResponseDto.success(CompanyMapper.toDto(null), "Empresa eliminada correctamente");
    }

    @Override
    public CrudResponseDto<CompanyDTO> activateById(Long aLong) {
        Company company = companyRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Empresa con id " + aLong + " no encontrada."));

        company.setActive(true);
        companyRepository.save(company);
        return CrudResponseDto.success(CompanyMapper.toDto(company), "Empresa activada correctamente");
    }

    @Override
    public CrudResponseDto<CompanyDTO> deactivateById(Long aLong) {
        Company company = companyRepository.findById(aLong)
                .orElseThrow(() -> new EntityNotFoundException("Empresa con id " + aLong + " no encontrada."));

        company.setActive(false);
        companyRepository.save(company);
        return CrudResponseDto.success(CompanyMapper.toDto(company), "Empresa desactivada correctamente");
    }

    @Override
    public CrudResponseDto<Boolean> existsById(Long aLong) {
        if (companyRepository.existsById(aLong)) {
            return CrudResponseDto.success(true, "Empresa con id " + aLong + " existe.");
        }
        return CrudResponseDto.success(false, "Empresa con id " + aLong + " no existe.");
    }


    private static class CompanyMapper {

        private static CompanyDTO toDto(Company entity) {
            CompanyDTO dto = new CompanyDTO();
            dto.setId(entity.getId());
            dto.setName(entity.getName());
            dto.setNit(entity.getNit());
            dto.setEmail(entity.getEmail());
            dto.setPhone(entity.getPhone());
            dto.setCountry(entity.getCountry());
            dto.setActive(entity.getActive());
            return dto;
        }

        private static Company toEntity(CompanyDTO dto) {
            Company entity = new Company();
            entity.setId(dto.getId());
            entity.setName(dto.getName());
            entity.setNit(dto.getNit());
            entity.setPhone(dto.getPhone());
            entity.setEmail(dto.getEmail());
            entity.setCountry(dto.getCountry());
            entity.setActive(dto.getActive());
            return entity;
        }
    }

}
