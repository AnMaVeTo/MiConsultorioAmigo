package com.consultorio.citasMedicas.repository;

import com.consultorio.citasMedicas.model.Especialidad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryEspecialidad extends JpaRepository<Especialidad, Integer> {
}
