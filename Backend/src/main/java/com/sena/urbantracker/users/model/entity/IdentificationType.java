package com.sena.urbantracker.users.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "identification_type", schema = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class IdentificationType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type", updatable = false, nullable = false)
    private Integer id;

    @Column(name = "type_name", length = 50, nullable = false, unique = true)
    private String typeName;

    @Column(length = 200)
    private String description;

    @Column(length = 50, nullable = false)
    @Builder.Default
    private String country = "Colombia";
}
