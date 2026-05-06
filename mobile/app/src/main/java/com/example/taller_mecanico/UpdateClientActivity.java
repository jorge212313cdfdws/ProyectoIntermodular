package com.example.taller_mecanico;

import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.example.taller_mecanico.model.Client;
import com.example.taller_mecanico.network.ApiClient;
import com.example.taller_mecanico.network.ApiService;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import java.io.IOException;

public class UpdateClientActivity extends AppCompatActivity {

    private EditText editTextNombre, editTextEmail, editTextDireccion;
    private Button btnActualizarCliente;
    private ApiService apiService;
    private long clientId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_client);

        editTextNombre = findViewById(R.id.editTextNombre);
        editTextEmail = findViewById(R.id.editTextEmail);
        editTextDireccion = findViewById(R.id.editTextDireccion);
        btnActualizarCliente = findViewById(R.id.btnActualizarCliente);
        apiService = ApiClient.getApiService();

        clientId = getIntent().getLongExtra("CLIENT_ID", -1);
        if (clientId == -1) {
            Toast.makeText(this, "Error: ID de cliente no encontrado", Toast.LENGTH_LONG).show();
            finish();
            return;
        }

        loadClientData();

        btnActualizarCliente.setOnClickListener(v -> updateClientData());
    }

    private void loadClientData() {
        apiService.getClienteById(clientId).enqueue(new Callback<Client>() {
            @Override
            public void onResponse(Call<Client> call, Response<Client> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Client client = response.body();
                    editTextNombre.setText(client.getNombreCompleto());
                    editTextEmail.setText(client.getEmail());
                    editTextDireccion.setText(client.getDireccion());
                } else {
                    Toast.makeText(UpdateClientActivity.this, "Error al cargar los datos del cliente", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Client> call, Throwable t) {
                Log.e("RetrofitError", "Error en la petición GET by ID: " + t.getMessage());
                Toast.makeText(UpdateClientActivity.this, "Error de red al cargar los datos", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void updateClientData() {
        String nombre = editTextNombre.getText().toString().trim();
        String email = editTextEmail.getText().toString().trim();
        String direccion = editTextDireccion.getText().toString().trim();

        if (nombre.isEmpty() || email.isEmpty()) {
            Toast.makeText(this, "El nombre y el email son obligatorios", Toast.LENGTH_SHORT).show();
            return;
        }

        Client updatedClient = new Client(clientId, nombre, email, direccion);

        apiService.updateCliente(clientId, updatedClient).enqueue(new Callback<Client>() {
            @Override
            public void onResponse(Call<Client> call, Response<Client> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(UpdateClientActivity.this, "Cliente actualizado con éxito", Toast.LENGTH_SHORT).show();
                    finish();
                } else {
                    try {
                        // Log del error detallado
                        String errorBody = response.errorBody().string();
                        Log.e("RetrofitError", "Error al actualizar. Código: " + response.code() + " Body: " + errorBody);
                        Toast.makeText(UpdateClientActivity.this, "Error " + response.code() + ": " + errorBody, Toast.LENGTH_LONG).show();
                    } catch (IOException e) {
                        Log.e("RetrofitError", "Error al leer el cuerpo del error de la respuesta.");
                    }
                }
            }

            @Override
            public void onFailure(Call<Client> call, Throwable t) {
                Log.e("RetrofitError", "Fallo en la petición PUT: " + t.getMessage());
                Toast.makeText(UpdateClientActivity.this, "Fallo de red al actualizar", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
