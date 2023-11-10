package com.consultorio.citasMedicas.repository;

import com.consultorio.citasMedicas.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryMedico extends JpaRepository<Medico, Integer> {
}
