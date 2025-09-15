package com.sena.urbantracker.security.service;

import com.sena.urbantracker.security.model.entity.Role;
import com.sena.urbantracker.security.repository.IRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final IRole data;

    //lista los roles
    public List<Role> getAllRoles() {
        return data.findAll();
    }

}
