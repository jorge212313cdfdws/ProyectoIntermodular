package com.taller.mecanica.model;

//imports
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Mecanico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long Id; 

    @Column (nullable = false)
    private String nombre; 
    
    @Column (nullable = false)
    private String especialidad;
    
    
    @Column (nullable = false)
    private LocalDate HorasTrabajadas; 
    
    @OneToMany(mappedBy = "mecanico")
    private List<OrdenDeTrabajo> ordenes;     



}