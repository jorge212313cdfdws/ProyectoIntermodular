package com.taller.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mecanico")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"ordenes", "hibernateLazyInitializer", "handler"})
public class Mecanico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id; 

    @Column(nullable = false)
    private String nombre; 
    
    @Column(nullable = false)
    private String especialidad;
    
    @Column(nullable = false)
    private int horasTrabajadas; 
    
    @JsonIgnore
    @OneToMany(mappedBy = "mecanico", fetch = FetchType.LAZY)
    private List<OrdenDeTrabajo> ordenes;
}
