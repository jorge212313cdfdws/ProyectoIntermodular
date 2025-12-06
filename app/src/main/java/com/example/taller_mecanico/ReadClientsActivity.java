package com.example.taller_mecanico;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.taller_mecanico.adapter.ClientAdapter;
import com.example.taller_mecanico.model.Client;
import com.example.taller_mecanico.network.ApiClient;
import com.example.taller_mecanico.network.ApiService;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ReadClientsActivity extends AppCompatActivity implements ClientAdapter.OnItemClickListener {

    private RecyclerView recyclerView;
    private ClientAdapter clientAdapter;
    private List<Client> clientList;
    private ApiService apiService;
    private FloatingActionButton fabAddClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_read_clients);

        recyclerView = findViewById(R.id.recyclerViewClientes);
        fabAddClient = findViewById(R.id.fab_add_client);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        clientList = new ArrayList<>();
        apiService = ApiClient.getApiService();

        clientAdapter = new ClientAdapter(clientList, this);
        recyclerView.setAdapter(clientAdapter);

        fabAddClient.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(ReadClientsActivity.this, CreateClientActivity.class);
                startActivity(intent);
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        getClientes();
    }

    private void getClientes() {
        apiService.getClientes().enqueue(new Callback<List<Client>>() {
            @Override
            public void onResponse(Call<List<Client>> call, Response<List<Client>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    clientList.clear();
                    clientList.addAll(response.body());
                    clientAdapter.notifyDataSetChanged();
                } else {
                    try {
                        String errorBody = response.errorBody().string();
                        Log.e("RetrofitError", "Error al obtener clientes. Código: " + response.code() + " Body: " + errorBody);
                        Toast.makeText(ReadClientsActivity.this, "Error " + response.code() + ": No se pudo obtener la lista", Toast.LENGTH_LONG).show();
                    } catch (Exception e) {
                        Log.e("RetrofitError", "Error al leer el cuerpo del error de la respuesta.");
                        Toast.makeText(ReadClientsActivity.this, "Respuesta no exitosa del servidor", Toast.LENGTH_SHORT).show();
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Client>> call, Throwable t) {
                Log.e("RetrofitError", "Fallo en la petición GET: " + t.getMessage());
                Toast.makeText(ReadClientsActivity.this, "Fallo de red al obtener la lista", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onEditClick(Client client) {
        Intent intent = new Intent(ReadClientsActivity.this, UpdateClientActivity.class);
        intent.putExtra("CLIENT_ID", client.getId());
        startActivity(intent);
    }

    @Override
    public void onDeleteClick(Client client) {
        new AlertDialog.Builder(this)
                .setTitle("Confirmar Borrado")
                .setMessage("¿Estás seguro de que quieres eliminar a " + client.getNombreCompleto() + "?")
                .setPositiveButton("Sí, Eliminar", (dialog, which) -> deleteCliente(client.getId()))
                .setNegativeButton("No", null)
                .show();
    }

    private void deleteCliente(long clienteId) {
        apiService.deleteCliente(clienteId).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(ReadClientsActivity.this, "Cliente eliminado con éxito", Toast.LENGTH_SHORT).show();
                    getClientes();
                } else {
                    try {
                        String errorBody = response.errorBody().string();
                        Log.e("RetrofitError", "Error al eliminar. Código: " + response.code() + " Body: " + errorBody);
                        Toast.makeText(ReadClientsActivity.this, "Error " + response.code() + ": No se pudo eliminar", Toast.LENGTH_LONG).show();
                    } catch (IOException e) {
                        Log.e("RetrofitError", "Error al leer el cuerpo del error de la respuesta.");
                    }
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.e("RetrofitError", "Fallo en la petición DELETE: " + t.getMessage());
                Toast.makeText(ReadClientsActivity.this, "Fallo de red al intentar eliminar.", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
