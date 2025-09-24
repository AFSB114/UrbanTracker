package com.sena.urbantracker.security.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "user", schema = "security")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String userName;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @ManyToOne()
    @JoinColumn(name = "role_id")
    private Role role;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (role == null) {
            return List.of(); // O lanzar excepción, pero para evitar problemas, devolver lista vacía
        }
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.getName()));
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // logica para indicar si la cuenta está expirada.
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Lo mismo: lógica si se bloquean cuentas
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Lógica de expiración de contraseña
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
