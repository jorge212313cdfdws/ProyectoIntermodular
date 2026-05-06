package com.example.taller_mecanico;

import android.content.Context;
import android.content.SharedPreferences;

public class SessionManager {
    private static final String PREF_NAME = "TallerSession";
    private static final String KEY_TOKEN = "authToken";
    private static final String KEY_EMAIL = "email";
    private static final String KEY_ROLE = "role";
    private static final String KEY_ID = "userId";
    private static final String KEY_NOMBRE = "nombreCompleto";

    private final SharedPreferences prefs;

    public SessionManager(Context context) {
        prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
    }

    public void saveSession(String token, long id, String email, String role, String nombreCompleto) {
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(KEY_TOKEN, token);
        editor.putLong(KEY_ID, id);
        editor.putString(KEY_EMAIL, email);
        editor.putString(KEY_ROLE, role);
        editor.putString(KEY_NOMBRE, nombreCompleto);
        editor.apply();
    }

    public boolean isLoggedIn() {
        String token = getToken();
        return token != null && !token.isEmpty();
    }

    public String getToken() {
        return prefs.getString(KEY_TOKEN, null);
    }

    public String getRole() {
        return prefs.getString(KEY_ROLE, null);
    }

    public String getNombreCompleto() {
        return prefs.getString(KEY_NOMBRE, null);
    }

    public long getId() {
        return prefs.getLong(KEY_ID, -1);
    }

    public String getEmail() {
        return prefs.getString(KEY_EMAIL, null);
    }

    public void clearSession() {
        prefs.edit().clear().apply();
    }
}
