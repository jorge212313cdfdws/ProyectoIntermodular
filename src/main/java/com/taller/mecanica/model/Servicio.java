package com.taller.mecanica.model;

import java.text.DecimalFormat;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Servicio {
    
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id_servicio; 

    @Column (nullable = false)
    private String nombre; 

    @Column (nullable = false)
    private String descrpcion; 

    @Column (nullable = false)
    private DecimalFormat costo_hora; 

    @ManyToMany(mappedBy = "servicios")
    private List<OrdenDeTrabajo> ordenes;




}
