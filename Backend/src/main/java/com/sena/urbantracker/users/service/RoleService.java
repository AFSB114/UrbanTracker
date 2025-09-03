package com.sena.urbantracker.users.service;

import com.sena.urbantracker.security.model.dto.response.RoleDTO;
import com.sena.urbantracker.shared.model.dto.ResponseDTO;
import com.sena.urbantracker.security.model.entity.Role;
import com.sena.urbantracker.users.repository.IRole;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final IRole data;

    //lista el rol
    public List<Role> getAllRoles() {
        return data.findAll();
    }

    //guarda el rol si el id es cero si es mayor lo actualiza
    public ResponseDTO save(RoleDTO roleDTO) {

        // Validaciones
        if (!StringUtils.hasText(roleDTO.getName())) {
            return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                    "El nombre del rol no puede ser nulo o vacío.");
        }

        if (roleDTO.getName().length() > 50) {
            return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                    "El nombre del usuario no puede superar los 50 caracteres.");
        }

        if (!roleDTO.getName().matches("^[a-zA-Z\\s]+$")) {
            return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                    "El nombre solo puede contener letras y espacios.");
        }

        // Validar duplicados
        if (data.existsByName(roleDTO.getName())) {
            return new ResponseDTO(HttpStatus.CONFLICT.toString(),
                    "Ya existe un rol con ese nombre.");
        }

        // Crear o actualizar
        Role role;
        if (roleDTO.getId() == null || roleDTO.getId() == 0) {
            // crear nuevo
            role = convertToModel(roleDTO);
        } else {
            // actualizar existente
            Optional<Role> existingRole = data.findById(roleDTO.getId());
            if (!existingRole.isPresent()) {
                return new ResponseDTO(HttpStatus.BAD_REQUEST.toString(),
                        "El rol con el ID proporcionado no existe.");
            }
            role = convertToModel(roleDTO);
        }

        // Guardar
        data.save(role);

        return new ResponseDTO(HttpStatus.OK.toString(),
                "El rol se guardó correctamente.");
    }

    //busca el rol por el id
    public Optional<Role> findById(Long id) {
        return data.findById(id);
    }

    //borro el rol segun el id
    public ResponseDTO deleteRole(Long id) {
        Optional<Role> roleOpt = findById(id);
        if (!roleOpt.isPresent()) {
            return new ResponseDTO("El rol no existe", HttpStatus.NOT_FOUND.toString());
        }
        data.deleteById(id);
        return new ResponseDTO("Rol eliminado correctamente", HttpStatus.OK.toString());
    }

    public RoleDTO convertToDTO(Role rol) {
        return new RoleDTO(
                rol.getId(),
                rol.getName());
    }

    public Role convertToModel(RoleDTO roleDTO) {
        return Role.builder()
                .id(roleDTO.getId()) // o null si es nuevo
                .name(roleDTO.getName())
                .build(); // users quedará vacío automáticamente
    }

}
