package com.sena.urbantracker.vehicles.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicle_types")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VehicleType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column( length = 200)
    private String description;

    @Column(nullable = false)
    private Boolean active;
}
