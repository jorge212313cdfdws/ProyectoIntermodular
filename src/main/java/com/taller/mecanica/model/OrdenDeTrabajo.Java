package com.taller.mecanica.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdenDeTrabajo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaCreacion;

    private String descripcion;

    private double costoTotal;

    // Relación con Cliente (N:1)
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    /*
    // Ejemplo de relación muchos a muchos con Servicio
    @ManyToMany
    @JoinTable(
        name = "orden_servicio",
        joinColumns = @JoinColumn(name = "orden_id"),
        inverseJoinColumns = @JoinColumn(name = "servicio_id")
    )
    private List<Servicio> servicios;
    */
}
