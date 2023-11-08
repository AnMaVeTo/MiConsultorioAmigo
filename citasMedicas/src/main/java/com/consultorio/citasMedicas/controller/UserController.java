package com.consultorio.citasMedicas.controller;

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

    @Autowired
    private AppConfig appConfig;

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

    @PostMapping("/search")
    public String searchByName(@ModelAttribute UserForm userForm, Model model) {
        String name = userForm.getName();
        String contrasena = userForm.getContrasena();
        System.out.println(name);
        System.out.println(contrasena);
        if (name != null && contrasena != null) {
            List<User> people = iUserServices.findByName(name);
            if (!people.isEmpty()) {
                User user = people.get(0);

                if (user.getContrasena().equals(contrasena)) {
                    appConfig.setIsLogin(true);
                    appConfig.setRol(user.getRoles());
                    System.out.println(appConfig.getRol()+" "+appConfig.isIsLogin());
                    return "index";
                } else {

                }
            }
        } return "search";

    }

    public class UserForm {
        private String name;
        private String contrasena;

        public UserForm(String name, String contrasena) {
            this.name = name;
            this.contrasena = contrasena;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getContrasena() {
            return contrasena;
        }

        public void setContrasena(String contrasena) {
            this.contrasena = contrasena;
        }
    }



}
