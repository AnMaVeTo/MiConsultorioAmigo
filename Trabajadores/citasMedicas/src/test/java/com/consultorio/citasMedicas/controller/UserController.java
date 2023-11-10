package com.consultorio.citasMedicas.controller;

import com.consultorio.citasMedicas.AppConfig;
import com.consultorio.citasMedicas.interfaceService.IUserServices;
import com.consultorio.citasMedicas.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping ("/user")
public class UserController {

    @Autowired
    private IUserServices iUserServices;

    private final AppConfig appConfig;

    @Autowired
    public UserController(AppConfig appConfig) {
        this.appConfig = appConfig;
    }

    @GetMapping("/config")
    public String showConfig(Model model) {
        model.addAttribute("rol", appConfig.getRol());
        model.addAttribute("isLogin", appConfig.isIsLogin());
        return "config";
    }

    @GetMapping("/index")
    public String showLoginForm() {
        return "search";
    }

    @GetMapping("/search")
    public String searchByName(@RequestParam(name = "name", required = false) String name, Model model, String contrasena) {
        if (name != null) {
            List<User> people = iUserServices.findByName(name);
            if (!people.isEmpty()) {
                User user = people.get(0);
                if (user.getContrasena().equals(contrasena)) {
                    model.addAttribute("people", people);
                } else {
                    return "search";
                }
            }
        }
        return "index";
    }

}
