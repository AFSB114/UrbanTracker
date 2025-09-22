package com.sena.urbantracker.vehicles.domain.entity;

import com.sena.urbantracker.users.domain.entity.Driver;
import com.sena.urbantracker.vehicles.domain.valueobject.AssigmentStatusType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "vehicle_assignment", schema = "vehicles")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VehicleAssigments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private Driver driver;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private AssigmentStatusType assignmentStatus;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;
}
