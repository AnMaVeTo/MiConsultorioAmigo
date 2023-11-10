package com.consultorio.citasMedicas.controller;


import com.consultorio.citasMedicas.interfaceService.IMedicoService;
import com.consultorio.citasMedicas.model.Medico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/medico")
@CrossOrigin(origins = "http://localhost:5173")
public class ControllerMedico {

    @Autowired
    private IMedicoService iMedicoService;

    @GetMapping("/listar")
    public List<Medico> listarMedico() {
        List<Medico> medico = iMedicoService.listarMedico();
        return medico;
    }

    @GetMapping("/listar/{id}")
    public Optional<Medico> listarMedicoId(@PathVariable int id) {
        Optional<Medico> medico = iMedicoService.listIdMedico(id);
        return medico;
    }

    @PostMapping("/crear")
    public int crearMedico(@RequestBody Medico medico) {
        int newMedico = iMedicoService.saveMedico(medico);
        return newMedico;
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarMedico(@PathVariable int id) {
        iMedicoService.deleteMedico(id);
        return ResponseEntity.ok("Medico eliminada exitosamente");
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarMedico(@PathVariable int id, @RequestBody Medico medico) {
       Boolean existingMedico = iMedicoService.actualizarMedico(id, medico);

        if (existingMedico) {
            return ResponseEntity.ok("Medico actualizada exitosamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
