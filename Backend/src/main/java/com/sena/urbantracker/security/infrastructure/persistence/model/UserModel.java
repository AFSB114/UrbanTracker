package com.sena.urbantracker.security.infrastructure.persistence.model;

import com.sena.urbantracker.shared.application.dto.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@Entity
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "user", schema = "security")
public class UserModel extends BaseEntity {

    @Column(name = "username", nullable = false, unique = true)
    private String userName;

    @Column(name = "password", nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private RoleModel role;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;
}