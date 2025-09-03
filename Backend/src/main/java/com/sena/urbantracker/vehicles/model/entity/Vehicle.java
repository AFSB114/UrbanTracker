package com.sena.urbantracker.vehicles.model.entity;

import com.sena.urbantracker.vehicles.model.enums.VehicleStatusType;
import com.sena.urbantracker.users.model.entity.Company;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "vehicle", schema = "vehicles")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne
    @JoinColumn(name = "vehicle_type_id", nullable = false)
    private VehicleType vehicleType;

    @Column(name = "licence_plate", nullable = false, length = 10, unique = true)
    private String licencePlate;

    @Column(nullable = false, length = 50)
    private String brand;

    @Column(nullable = false, length = 50)
    private String model;

    @Column(nullable = false)
    private Integer year;

    @Column(length = 30)
    private String color;

    @Column(name = "passenger_capacity",nullable = false)
    private Integer passengerCapacity;

    @Column(name = "status",nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private VehicleStatusType status = VehicleStatusType.ACTIVE;

    @Column(name = "in_service", nullable = false)
    @Builder.Default
    private boolean inService = false;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
