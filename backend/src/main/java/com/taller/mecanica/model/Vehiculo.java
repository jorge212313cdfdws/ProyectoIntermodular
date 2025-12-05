package com.taller.mecanica.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehiculo {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @Column(nullable = false)
    private String marca; 

    @Column(nullable = false)
    private String modelo; 

    @Column(nullable = false)
    private int año;

    @Column(nullable = false)
    private String placa; 

    // Relación con Cliente (Dueño de la relación)
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonIgnoreProperties("vehiculos") // Rompe el ciclo con Cliente
    private Cliente cliente;

    // Relación con Orden de trabajo
    @OneToMany(mappedBy = "vehiculo")
    @JsonIgnoreProperties("vehiculo") // Rompe el ciclo con OrdenDeTrabajo
    private List<OrdenDeTrabajo> ordenes;
}
