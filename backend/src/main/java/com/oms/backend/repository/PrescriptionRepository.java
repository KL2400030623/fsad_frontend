package com.oms.backend.repository;

import com.oms.backend.models.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
  List<Prescription> findByPatient(String patient);
  List<Prescription> findByDoctor(String doctor);
}
