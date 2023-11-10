package com.consultorio.citasMedicas.interfaceService;

import com.consultorio.citasMedicas.model.Usuario;

public interface ILoginService {

    Usuario loginUser(String username,String password);
}
