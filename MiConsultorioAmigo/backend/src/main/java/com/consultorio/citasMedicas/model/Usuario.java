package com.consultorio.citasMedicas.model;

import jakarta.persistence.*;

@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int rol;

    private String username;

    private String password;

    private int idMedico;


    public Usuario() {
    }

    public Usuario(int id, int rol, String username, String password, int idMedico) {
        this.id = id;
        this.rol = rol;
        this.username = username;
        this.password = password;
        this.idMedico = idMedico;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRol() {
        return rol;
    }

    public void setRol(int rol) {
        this.rol = rol;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getIdMedico() {
        return idMedico;
    }

    public void setIdMedico(int idMedico) {
        this.idMedico = idMedico;
    }
}
