package com.example.taller_mecanico;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.example.taller_mecanico.model.AuthResponse;
import com.example.taller_mecanico.model.LoginRequest;
import com.example.taller_mecanico.network.ApiClient;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private TextInputEditText editTextEmail, editTextPassword;
    private MaterialButton btnLogin;
    private ProgressBar progressBar;
    private TextView tvError;
    private SessionManager sessionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        sessionManager = new SessionManager(this);

        // Si ya hay sesión activa, ir directamente a MainActivity
        if (sessionManager.isLoggedIn()) {
            ApiClient.setAuthToken(sessionManager.getToken());
            goToMain();
            return;
        }

        setContentView(R.layout.activity_login);

        editTextEmail = findViewById(R.id.editTextEmail);
        editTextPassword = findViewById(R.id.editTextPassword);
        btnLogin = findViewById(R.id.btnLogin);
        progressBar = findViewById(R.id.progressBar);
        tvError = findViewById(R.id.tvError);

        btnLogin.setOnClickListener(v -> handleLogin());
    }

    private void handleLogin() {
        String email = editTextEmail.getText() != null ? editTextEmail.getText().toString().trim() : "";
        String password = editTextPassword.getText() != null ? editTextPassword.getText().toString().trim() : "";

        if (email.isEmpty()) {
            showError("El email es obligatorio");
            return;
        }
        if (password.isEmpty()) {
            showError("La contraseña es obligatoria");
            return;
        }

        setLoading(true);
        tvError.setVisibility(View.GONE);

        LoginRequest loginRequest = new LoginRequest(email, password);

        ApiClient.getApiService().login(loginRequest).enqueue(new Callback<AuthResponse>() {
            @Override
            public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                setLoading(false);
                if (response.isSuccessful() && response.body() != null) {
                    AuthResponse auth = response.body();
                    // Guardar token en ApiClient y sesión en SharedPreferences
                    ApiClient.setAuthToken(auth.getToken());
                    sessionManager.saveSession(
                            auth.getToken(),
                            auth.getId(),
                            auth.getEmail(),
                            auth.getRole(),
                            auth.getNombreCompleto()
                    );
                    goToMain();
                } else {
                    int code = response.code();
                    if (code == 401) {
                        showError("Contraseña incorrecta");
                    } else if (code == 404) {
                        showError("No existe una cuenta con este email");
                    } else if (code == 400) {
                        showError("Datos de acceso inválidos");
                    } else {
                        showError("Error al iniciar sesión (código " + code + ")");
                    }
                }
            }

            @Override
            public void onFailure(Call<AuthResponse> call, Throwable t) {
                setLoading(false);
                showError("Error de conexión con el servidor");
            }
        });
    }

    private void goToMain() {
        Intent intent = new Intent(LoginActivity.this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }

    private void showError(String message) {
        tvError.setText(message);
        tvError.setVisibility(View.VISIBLE);
    }

    private void setLoading(boolean loading) {
        btnLogin.setEnabled(!loading);
        progressBar.setVisibility(loading ? View.VISIBLE : View.GONE);
        editTextEmail.setEnabled(!loading);
        editTextPassword.setEnabled(!loading);
    }
}
