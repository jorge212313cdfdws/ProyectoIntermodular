package com.example.taller_mecanico;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.example.taller_mecanico.network.ApiClient;
import com.google.android.material.button.MaterialButton;

public class MainActivity extends AppCompatActivity {

    private MaterialButton btnVerClientes, btnAnadirCliente;
    private TextView tvWelcome;
    private SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        sessionManager = new SessionManager(this);

        // Verificar sesión activa; si no hay, ir al login
        if (!sessionManager.isLoggedIn()) {
            goToLogin();
            return;
        }

        setContentView(R.layout.activity_main);

        // Restaurar token JWT en ApiClient
        ApiClient.setAuthToken(sessionManager.getToken());

        btnVerClientes = findViewById(R.id.btnVerClientes);
        btnAnadirCliente = findViewById(R.id.btnAnadirCliente);
        tvWelcome = findViewById(R.id.tvWelcome);

        // Mostrar bienvenida con nombre y rol
        String nombre = sessionManager.getNombreCompleto();
        String role = sessionManager.getRole();
        tvWelcome.setText("Bienvenido, " + nombre + "\nRol: " + role);

        // Solo admin y mecánico pueden añadir clientes
        if ("cliente".equals(role)) {
            btnAnadirCliente.setVisibility(View.GONE);
        }

        btnVerClientes.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, ReadClientsActivity.class);
            startActivity(intent);
        });

        btnAnadirCliente.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, CreateClientActivity.class);
            startActivity(intent);
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_logout) {
            sessionManager.clearSession();
            ApiClient.clearAuthToken();
            goToLogin();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void goToLogin() {
        Intent intent = new Intent(MainActivity.this, LoginActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}

