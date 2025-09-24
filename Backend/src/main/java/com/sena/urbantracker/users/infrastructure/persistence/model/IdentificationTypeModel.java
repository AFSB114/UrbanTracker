package com.sena.urbantracker.users.infrastructure.persistence.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "identification_type", schema = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class IdentificationTypeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type", updatable = false, nullable = false)
    private Long id;

    @Column(name = "type_name", length = 50, nullable = false, unique = true)
    private String typeName;

    @Column(length = 200)
    private String description;

    @Column(length = 50, nullable = false)
    @Builder.Default
    private String country = "Colombia";
}