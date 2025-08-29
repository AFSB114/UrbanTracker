package com.sena.urbantracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

import static org.aspectj.weaver.tools.cache.SimpleCacheFactory.enabled;

@Entity(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String userName;

    @Column(nullable = false, length = 50)
    private String password;

    @ManyToOne()
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @Column(name = "id_driver", nullable = false, unique = true, length = 15)
    private String idDriver;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Vehicle> vehicles;

    // --- Métodos obligatorios de UserDetails ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.getName()));
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
        return enabled;
    }
}
