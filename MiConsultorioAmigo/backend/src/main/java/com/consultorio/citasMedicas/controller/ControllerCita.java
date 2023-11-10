package com.consultorio.citasMedicas.controller;

import com.consultorio.citasMedicas.interfaceService.ICitaServices;
import com.consultorio.citasMedicas.model.Cita;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cita")
public class ControllerCita {

    @Autowired
    private ICitaServices iCitaServices;

    @GetMapping("/listar")
    public List<Cita> listarCita(){
        List<Cita> citas = iCitaServices.listarCita();
        return citas;
    }

    @GetMapping("/listar/{id}")
    public Optional<Cita> listarCitaId(@PathVariable int id){
        Optional<Cita> cita = iCitaServices.listIdCita(id);
        return cita;
    }

    @PostMapping("/crear")
    public int crearEstado(@RequestBody Cita cita) {
        int newCita = iCitaServices.saveCita(cita);
        return newCita;
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarEstado(@PathVariable int id) {
        iCitaServices.deleteCita(id);
        return ResponseEntity.ok("Cita eliminada exitosamente");
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarCita(@PathVariable int id, @RequestBody Cita cita) {
        boolean citaUpdate = iCitaServices.actualizarCita(id, cita);
        System.out.println(id);
        if (citaUpdate) {
            return ResponseEntity.ok("Cita actualizada exitosamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
