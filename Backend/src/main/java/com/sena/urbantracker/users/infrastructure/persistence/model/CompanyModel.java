package com.sena.urbantracker.users.infrastructure.persistence.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "companies", schema = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CompanyModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "company_name", nullable = false, length = 200 ,unique = true)
    private String name;

    @Column(name = "nit", length = 20, nullable = false, unique = true)
    private String nit;

    @Column(length = 20)
    private String phone;

    @Column(length = 100)
    private String email;

    @Column(length = 50, nullable = false)
    @Builder.Default
    private String country = "Colombia";

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}