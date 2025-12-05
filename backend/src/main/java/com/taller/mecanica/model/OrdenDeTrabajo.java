package com.taller.mecanica.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

@Getter
public class OrdenDeTrabajo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate fechaCreacion;

    private String descripcion;

    private double costoTotal;

    @ManyToOne
    @JsonIgnoreProperties({"vehiculos", "ordenesDeTrabajo"})
    private Cliente cliente;

    @ManyToOne
    @JsonIgnoreProperties("ordenes")
    private Mecanico mecanico;

    @ManyToOne
    @JsonIgnoreProperties("ordenes")
    private Vehiculo vehiculo;

    @ManyToMany
    @JoinTable(
        name = "orden_servicio",
        joinColumns = @JoinColumn(name = "orden_id"),
        inverseJoinColumns = @JoinColumn(name = "servicio_id")
    )
    private List<Servicio> servicios;

}
