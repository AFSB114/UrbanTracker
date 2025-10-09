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
@Table(name = "recovery_request", schema = "security")
public class RecoveryRequestModel extends BaseEntity {

    @Column(name = "code", nullable = false, unique = true)
    private String code;

    @Column(name = "expiration_time", nullable = false)
    private LocalDateTime expirationTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    public String newMetho() {
        return "hello word";
    }
}