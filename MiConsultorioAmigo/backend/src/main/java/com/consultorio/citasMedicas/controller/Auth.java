package com.consultorio.citasMedicas.controller;

import com.consultorio.citasMedicas.interfaceService.ILoginService;
import com.consultorio.citasMedicas.interfaceService.IRolService;
import com.consultorio.citasMedicas.model.Rol;
import com.consultorio.citasMedicas.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class Auth {

    @Autowired
    private ILoginService iLoginService;

    @Autowired
    private IRolService iRolService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> requestBody) {
        String username = requestBody.get("username");
        String password = requestBody.get("password");

        Usuario usuario = iLoginService.loginUser(username, password);

        Map<String, Object> response = new HashMap<>();
        if (usuario != null) {
            Optional<Rol> rol = iRolService.listIdRol(usuario.getRol());
            System.out.println(usuario.getRol());
            if (rol != null) {
                response.put("rol", rol);
            }
            response.put("success", true);
            response.put("message", "Inicio de sesión exitoso");
            response.put("usuario", usuario);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Credenciales incorrectas");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}
