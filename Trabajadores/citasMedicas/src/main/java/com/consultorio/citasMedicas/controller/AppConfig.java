package com.consultorio.citasMedicas.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppConfig {

    @Value("${miapp.rol}")
    private String rol;

    @Value("${miapp.isLogin}")
    private boolean isLogin;

    public String getRol() {
        return rol;
    }

    public boolean isIsLogin() {
        return isLogin;
    }

    public void setRol(String newRol) {
        this.rol = newRol;
    }

    // Método para modificar el valor de 'isLogin'
    public void setIsLogin(boolean newIsLogin) {
        this.isLogin = newIsLogin;
    }
}
