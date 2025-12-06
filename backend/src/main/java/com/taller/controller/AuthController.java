package com.taller.controller;

import com.taller.model.Cliente;
import com.taller.repository.ClienteRepository;
import com.taller.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        // Validar que los campos no estén vacíos
        if (email == null || email.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "El email es obligatorio");
            return ResponseEntity.status(400).body(error);
        }

        if (password == null || password.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "La contraseña es obligatoria");
            return ResponseEntity.status(400).body(error);
        }

        Cliente cliente = clienteRepository.findByEmail(email).orElse(null);

        if (cliente == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "No existe una cuenta con este email");
            return ResponseEntity.status(404).body(error);
        }

        if (cliente.getPassword() == null || !cliente.getPassword().equals(password)) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "La contraseña es incorrecta");
            return ResponseEntity.status(401).body(error);
        }

        // Generar token JWT
        String token = jwtUtil.generateToken(
            cliente.getId(),
            cliente.getEmail(),
            cliente.getRole() != null ? cliente.getRole() : "cliente"
        );

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Inicio de sesión exitoso");
        response.put("token", token);
        response.put("email", cliente.getEmail());
        response.put("role", cliente.getRole() != null ? cliente.getRole() : "cliente");
        response.put("id", cliente.getId());
        response.put("nombreCompleto", cliente.getNombreCompleto());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userData) {
        String email = userData.get("email");
        String password = userData.get("password");
        String nombreCompleto = userData.get("nombreCompleto");
        String direccion = userData.get("direccion");

        // Validar campos obligatorios
        if (email == null || email.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "El email es obligatorio");
            return ResponseEntity.status(400).body(error);
        }

        if (password == null || password.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "La contraseña es obligatoria");
            return ResponseEntity.status(400).body(error);
        }

        if (nombreCompleto == null || nombreCompleto.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "El nombre completo es obligatorio");
            return ResponseEntity.status(400).body(error);
        }

        if (direccion == null || direccion.trim().isEmpty()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "La dirección es obligatoria");
            return ResponseEntity.status(400).body(error);
        }

        // Validar formato de email
        if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "El formato del email no es válido");
            return ResponseEntity.status(400).body(error);
        }

        // Verificar si el email ya existe
        if (clienteRepository.findByEmail(email).isPresent()) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Ya existe una cuenta con este email");
            return ResponseEntity.status(400).body(error);
        }

        // Validar longitud de contraseña
        if (password.length() < 6) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "La contraseña debe tener al menos 6 caracteres");
            return ResponseEntity.status(400).body(error);
        }

        Cliente cliente = new Cliente();
        cliente.setEmail(email);
        cliente.setPassword(password);
        cliente.setNombreCompleto(nombreCompleto);
        cliente.setDireccion(direccion);
        cliente.setRole("cliente");

        try {
            clienteRepository.save(cliente);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Cuenta creada exitosamente. Ya puedes iniciar sesión.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error al crear la cuenta. Intenta nuevamente.");
            return ResponseEntity.status(500).body(error);
        }
    }
}
