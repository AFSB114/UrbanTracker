package com.sena.urbantracker.security.domain.entity;

import com.sena.urbantracker.users.domain.entity.UserProfile;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recovery_request", schema = "security")
public class RecoveryRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(name = "expiration_time", nullable = false)
    private LocalDateTime expirationTime;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserProfile user;

    // para asignar automaticamente la fecha de creación
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

}
