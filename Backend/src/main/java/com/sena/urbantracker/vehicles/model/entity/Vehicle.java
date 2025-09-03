package com.sena.urbantracker.vehicles.model.entity;

import com.sena.urbantracker.vehicles.model.enums.VehicleStatusType;
import com.sena.urbantracker.users.model.entity.Company;
import com.sena.urbantracker.security.model.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "vehicle")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(name = "licence_plate", nullable = false)
    private String licencePlate;

    @Column(name = "brand", nullable = false)
    private String brand;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "status",nullable = false)
    @Enumerated(EnumType.STRING)
    private VehicleStatusType status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
