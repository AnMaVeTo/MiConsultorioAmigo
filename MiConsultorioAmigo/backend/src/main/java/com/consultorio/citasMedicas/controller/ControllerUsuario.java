package com.consultorio.citasMedicas.controller;

import com.consultorio.citasMedicas.interfaceService.IUsuarioService;
import com.consultorio.citasMedicas.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:5173")
public class ControllerUsuario {

    @Autowired
    private IUsuarioService itodoService;

    @GetMapping("/listar")
    public List<Usuario> listarUsuario() {
        List<Usuario> usuarios = itodoService.listarUsuario();
        return usuarios;
    }

    @PostMapping("/crear")
    public int crearUsuario(@RequestBody Usuario usuario) {
        int newUsuario = itodoService.saveUsuario(usuario);
        return newUsuario;
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable int id) {
        itodoService.deleteUsuario(id);
        return ResponseEntity.ok("Usuario eliminada exitosamente");
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarUsuario(@PathVariable int id, @RequestBody Usuario usuario) {
        boolean existingUsuario = itodoService.actualizarUsuario(id, usuario);

        if (existingUsuario) {

            return ResponseEntity.ok("Tarea actualizada exitosamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
