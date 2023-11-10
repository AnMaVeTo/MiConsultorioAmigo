package com.consultorio.citasMedicas.repository;

import com.consultorio.citasMedicas.model.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryCita extends JpaRepository<Cita, Integer> {
}
