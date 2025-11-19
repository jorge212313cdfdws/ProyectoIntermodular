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
    private Stirng descripcion; 
    private double costoTotal;

    //Relacion con cliente (N:1)

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente; 
    
    
    //ejemplo de relacion de muchos a muchos 
    //Relacion con servicios (N:M)
    /*
    @ManyToMany
    @JointTable(
    name = "orden_servicio",
    joinColumns = @JoinColumn(name = "orde_id"),
    inverseJoinColumns = @JoinColumn(name = "servicio_id")
    )
    private List<Servicio> servicios; 
    */

}