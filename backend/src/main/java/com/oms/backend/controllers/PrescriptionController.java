package com.oms.backend.controllers;

import com.oms.backend.models.Prescription;
import com.oms.backend.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

  @Autowired
  PrescriptionRepository prescriptionRepository;

  @GetMapping
  public List<Prescription> getAllPrescriptions() {
    return prescriptionRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Prescription> getPrescriptionById(@PathVariable("id") long id) {
    Optional<Prescription> presData = prescriptionRepository.findById(id);
    return presData.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public Prescription createPrescription(@RequestBody Prescription prescription) {
    return prescriptionRepository.save(prescription);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Prescription> updatePrescription(@PathVariable("id") long id, @RequestBody Prescription details) {
    Optional<Prescription> data = prescriptionRepository.findById(id);

    if (data.isPresent()) {
      Prescription _pres = data.get();
      if(details.getStatus() != null) _pres.setStatus(details.getStatus());
      if(details.getPharmacistNote() != null) _pres.setPharmacistNote(details.getPharmacistNote());
      return ResponseEntity.ok(prescriptionRepository.save(_pres));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping("/patient/{name}")
  public List<Prescription> getPrescriptionsByPatient(@PathVariable String name) {
     return prescriptionRepository.findByPatient(name);
  }
}
