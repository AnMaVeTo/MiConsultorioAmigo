package com.consultorio.citasMedicas.repository;

import com.consultorio.citasMedicas.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryPaciente extends JpaRepository<Paciente, Integer> {
}
