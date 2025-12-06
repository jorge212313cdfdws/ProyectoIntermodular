package com.example.taller_mecanico.network;

import com.example.taller_mecanico.model.Client;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface ApiService {

    // --- Rutas para Clientes ---

    @GET("api/clientes")
    Call<List<Client>> getClientes();

    @GET("api/clientes/{id}")
    Call<Client> getClienteById(@Path("id") long id);

    @POST("api/clientes")
    Call<Client> createCliente(@Body Client client);

    @PUT("api/clientes/{id}")
    Call<Client> updateCliente(@Path("id") long id, @Body Client client);

    @DELETE("api/clientes/{id}")
    Call<Void> deleteCliente(@Path("id") long id);
}
