package com.taller.mecanica.model;

import java.util.List;

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
    private long id; 

    @Column(nullable = false)
    private String marca; 

    @Column (nullable = false)
    private String modelo; 

    @Column (nullable = false)
    private int año;
    
    @Column (nullable = false)
    private String placa; 

    // Relación con Cliente 
    @ManyToOne
    @JoinColumn(name = "cliente_id") // FK en la tabla Vehiculo
    private Cliente cliente;

    //Relación con Orden de trabajo 
    @OneToMany(mappedBy = "servicios")
    private List<OrdenDeTrabajo> ordenes;

    
}
