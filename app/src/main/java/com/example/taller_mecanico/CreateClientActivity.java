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

public class CreateClientActivity extends AppCompatActivity {

    private EditText editTextNombre, editTextEmail, editTextDireccion;
    private Button btnGuardarCliente;
    private ApiService apiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_client);

        editTextNombre = findViewById(R.id.editTextNombre);
        editTextEmail = findViewById(R.id.editTextEmail);
        editTextDireccion = findViewById(R.id.editTextDireccion);
        btnGuardarCliente = findViewById(R.id.btnGuardarCliente);
        apiService = ApiClient.getApiService();

        btnGuardarCliente.setOnClickListener(v -> saveCliente());
    }

    private void saveCliente() {
        String nombre = editTextNombre.getText().toString().trim();
        String email = editTextEmail.getText().toString().trim();
        String direccion = editTextDireccion.getText().toString().trim();

        if (nombre.isEmpty() || email.isEmpty()) {
            Toast.makeText(this, "El nombre y el email son obligatorios", Toast.LENGTH_SHORT).show();
            return;
        }

        // El ID se ignora al crear, el backend lo genera.
        Client newClient = new Client(0, nombre, email, direccion);

        Call<Client> call = apiService.createCliente(newClient);
        call.enqueue(new Callback<Client>() {
            @Override
            public void onResponse(Call<Client> call, Response<Client> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(CreateClientActivity.this, "Cliente guardado con éxito", Toast.LENGTH_SHORT).show();
                    finish(); // Vuelve a la lista
                } else {
                    Toast.makeText(CreateClientActivity.this, "Error al guardar el cliente", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Client> call, Throwable t) {
                Log.e("RetrofitError", "Error en la petición POST: " + t.getMessage());
                Toast.makeText(CreateClientActivity.this, "Error de red al guardar", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
