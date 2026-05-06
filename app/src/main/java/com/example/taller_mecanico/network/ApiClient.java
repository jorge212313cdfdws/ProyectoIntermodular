package com.example.taller_mecanico.network;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiClient {

    // Emulador: http://10.0.2.2:8080/   |   Dispositivo real: http://192.168.X.X:8080/
    private static final String BASE_URL = "http://10.0.2.2:8080/";

    private static String authToken = null;
    private static ApiService apiService;

    public static void setAuthToken(String token) {
        authToken = token;
        apiService = null; // Forzar recreación con el nuevo token
    }

    public static void clearAuthToken() {
        authToken = null;
        apiService = null;
    }

    public static ApiService getApiService() {
        if (apiService == null) {
            OkHttpClient.Builder httpClient = new OkHttpClient.Builder();

            if (authToken != null && !authToken.isEmpty()) {
                httpClient.addInterceptor(chain -> {
                    Request authenticated = chain.request().newBuilder()
                            .header("Authorization", "Bearer " + authToken)
                            .build();
                    return chain.proceed(authenticated);
                });
            }

            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(httpClient.build())
                    .build();
            apiService = retrofit.create(ApiService.class);
        }
        return apiService;
    }
}
