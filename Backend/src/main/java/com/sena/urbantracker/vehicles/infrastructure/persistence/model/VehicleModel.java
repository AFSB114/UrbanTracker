package com.sena.urbantracker.vehicles.infrastructure.persistence.model;

import com.sena.urbantracker.monitoring.infrastructure.persistence.model.TrackingModel;
import com.sena.urbantracker.routes.infrastructure.persistence.model.RouteTrajectoryModel;
import com.sena.urbantracker.shared.application.dto.BaseEntity;
import com.sena.urbantracker.users.infrastructure.persistence.model.CompanyModel;
import com.sena.urbantracker.vehicles.domain.valueobject.VehicleStatusType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@Entity
@SuperBuilder
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "vehicle", schema = "vehicles")
public class VehicleModel extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private CompanyModel company;

    @ManyToOne
    @JoinColumn(name = "vehicle_type_id", nullable = false)
    private VehicleTypeModel vehicleType;

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

    @Column(name = "passenger_capacity", nullable = false)
    private Integer passengerCapacity;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private VehicleStatusType status = VehicleStatusType.ACTIVE;

    @Column(name = "in_service", nullable = false)
    @Builder.Default
    private boolean inService = false;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    private List<VehicleAssignmentModel> vehicleAssignments;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    private List<TrackingModel> trackingModels;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL)
    private List<RouteTrajectoryModel> routeTrajectories;
}