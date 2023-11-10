package com.consultorio.citasMedicas.controller;

import com.consultorio.citasMedicas.interfaceService.IPacienteService;
import com.consultorio.citasMedicas.model.Paciente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/paciente")
public class ControllerPaciente {

    @Autowired
    private IPacienteService iPacienteServices;

    @GetMapping("/listar")
    public List<Paciente> listarPaciente(){
        List<Paciente> paciente = iPacienteServices.listarPaciente();
        return paciente;
    }

    @GetMapping("/listar/{id}")
    public Optional<Paciente> listarPacienteId(@PathVariable int id){
        Optional<Paciente> paciente = iPacienteServices.listIdPaciente(id);
        return paciente;
    }

    @PostMapping("/crear")
    public int crearPaciente(@RequestBody Paciente paciente) {
        int newPaciente = iPacienteServices.savePaciente(paciente);
        return newPaciente;
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarPaciente(@PathVariable int id) {
        iPacienteServices.deletePaciente(id);
        return ResponseEntity.ok("Paciente eliminada exitosamente");
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarPaciente(@PathVariable int id, @RequestBody Paciente paciente) {
        boolean pacienteUpdate = iPacienteServices.actualizarPaciente(id, paciente);
        if (pacienteUpdate) {
            return ResponseEntity.ok("Paciente actualizada exitosamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
