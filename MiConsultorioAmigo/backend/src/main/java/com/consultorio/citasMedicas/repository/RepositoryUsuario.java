package com.consultorio.citasMedicas.repository;

import com.consultorio.citasMedicas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryUsuario extends JpaRepository<Usuario, Integer> {
    Usuario findByUsername(String username);
}
