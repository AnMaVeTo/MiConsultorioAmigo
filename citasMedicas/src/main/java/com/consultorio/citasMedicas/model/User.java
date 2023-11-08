package com.consultorio.citasMedicas.model;

import jakarta.persistence.*;

import java.util.Collection;

@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String roles;
    private String name;

    private String Apellido;


    private String email;

    private  String contrasena;

    public User() {
    }

    public User(int id, String roles, String name, String apellido, String email, String contrasena) {
        this.id = id;
        this.roles = roles;
        this.name = name;
        Apellido = apellido;
        this.email = email;
        this.contrasena = contrasena;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getApellido() {
        return Apellido;
    }

    public void setApellido(String apellido) {
        Apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
}
