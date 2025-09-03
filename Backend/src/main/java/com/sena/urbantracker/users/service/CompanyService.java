package com.sena.urbantracker.users.service;


import com.sena.urbantracker.users.model.dto.response.CompanyDTO;
import com.sena.urbantracker.shared.model.dto.ResponseDTO;
import com.sena.urbantracker.users.repository.ICompany;
import com.sena.urbantracker.users.model.entity.Company;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final ICompany iCompany;

    public List<Company> getAllCompanies() {
        return iCompany.findAll();
    }

    //busca el user por el id
    public Optional<Company> findById(int id) {
        return iCompany.findById(id);
    }

    //borra el user segun el id
    public ResponseDTO deleteCompany(int id) {
        Optional<Company> companyOpt = findById(id);
        if (!companyOpt.isPresent()) {
            return new ResponseDTO("La compañia no existe", HttpStatus.NOT_FOUND.toString());
        }
        iCompany.deleteById(id);
        return new ResponseDTO("La compañia ha sido eliminada correctamente", HttpStatus.OK.toString());
    }

    // Guarda si el id es null/0, si es mayor lo actualiza
    public ResponseDTO save(CompanyDTO companyDTO) {
        try {
            // 🔹 Validar nombre
            if (!StringUtils.hasText(companyDTO.getName())) {
                return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                        "El nombre no puede ser nulo o vacío.");
            }
            if (companyDTO.getName().length() > 255) {
                return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                        "El nombre no puede superar los 255 caracteres.");
            }

            // 🔹 Validar NIT
            if (!StringUtils.hasText(companyDTO.getNit())) {
                return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                        "El NIT no puede ser nulo o vacío.");
            }
            if (!companyDTO.getNit().matches("^[0-9]+$")) {
                return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                        "El NIT solo puede contener números.");
            }

            // 🔹 Validar dirección
            if (!StringUtils.hasText(companyDTO.getAddress())) {
                return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                        "La dirección no puede ser nula o vacía.");
            }

            // 🔹 Validar teléfono de contacto
            if (StringUtils.hasText(companyDTO.getContactPhone())) {
                if (!companyDTO.getContactPhone().matches("^[0-9\\-+\\s]+$")) {
                    return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                            "El teléfono solo puede contener números, espacios, + o -.");
                }
            }

            // 🔹 Validar email de contacto
            if (StringUtils.hasText(companyDTO.getContactEmail())) {
                if (!companyDTO.getContactEmail().matches("^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$")) {
                    return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                            "El email de contacto no es válido.");
                }
            }

            // 🔹 Validar duplicados (si es nuevo)
            if ((companyDTO.getId() == null || companyDTO.getId() == 0) &&
                    iCompany.existsByNit(companyDTO.getNit())) {
                return new ResponseDTO(HttpStatus.CONFLICT.toString(),
                        "Ya existe una compañía con ese NIT.");
            }

            // 🔹 Crear o actualizar
            Company company;
            if (companyDTO.getId() == null || companyDTO.getId() == 0) {
                // Nuevo
                company = convertToModel(companyDTO);
            } else {
                // Actualización
                Optional<Company> existingCompany = iCompany.findById(companyDTO.getId());
                if (!existingCompany.isPresent()) {
                    return new ResponseDTO(HttpStatus.NOT_FOUND.toString(),
                            "La compañía con el ID proporcionado no existe.");
                }
                company = convertToModel(companyDTO);
            }

            // 🔹 Guardar
            iCompany.save(company);

            return new ResponseDTO(HttpStatus.OK.toString(),
                    "La compañía se guardó correctamente.");
        } catch (Exception e) {
            return new ResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR.toString(),
                    "Error al guardar: " + e.getMessage());
        }
    }

    // Convierte de DTO a Entidad (para guardar en BD)
    private Company convertToModel(CompanyDTO dto) {
        return Company.builder()
                .id(dto.getId())
                .name(dto.getName())
                .nit(dto.getNit())
                .address(dto.getAddress())
                .contactPhone(dto.getContactPhone())
                .contactEmail(dto.getContactEmail())
                .active(dto.isActive())
                .createAt(dto.getCreateAt() != null ? dto.getCreateAt() : LocalDateTime.now())
                .build();
    }

    // Convierte de Entidad a DTO (para responder en la API)
    private CompanyDTO convertToDTO(Company entity) {
        CompanyDTO dto = new CompanyDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setNit(entity.getNit());
        dto.setAddress(entity.getAddress());
        dto.setContactPhone(entity.getContactPhone());
        dto.setContactEmail(entity.getContactEmail());
        dto.setActive(entity.isActive());
        dto.setCreateAt(entity.getCreateAt());
        return dto;
    }

}
