package com.consultorio.citasMedicas.controller;

import com.consultorio.citasMedicas.interfaceService.IRolService;
import com.consultorio.citasMedicas.model.Rol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rol")
public class ControllerRol {
    
    @Autowired
    private IRolService iRolService;

    @GetMapping("/listar")
    public List<Rol> listarRol() {
        List<Rol> roles = iRolService.listarRol();
        return roles;
    }

    @GetMapping("/listar/{id}")
    public Optional<Rol> listarRolId(@PathVariable int id) {
        Optional<Rol> rolId = iRolService.listIdRol(id);
        return rolId;
    }

    @PostMapping("/crear")
    public int crearRol(@RequestBody Rol rol) {
        int newRol = iRolService.saveRol(rol);
        return newRol;
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarRol(@PathVariable int id) {
        iRolService.deleteRol(id);
        return ResponseEntity.ok("Rol eliminada exitosamente");
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarRol(@PathVariable int id, @RequestBody Rol rol) {
        Boolean existingRol = iRolService.actualizarRol(id, rol);

        if (existingRol) {
            return ResponseEntity.ok("Rol actualizada exitosamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
