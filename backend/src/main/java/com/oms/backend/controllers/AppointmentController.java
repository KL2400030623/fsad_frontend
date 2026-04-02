package com.oms.backend.controllers;

import com.oms.backend.models.Appointment;
import com.oms.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

  @Autowired
  AppointmentRepository appointmentRepository;

  @GetMapping
  public List<Appointment> getAllAppointments() {
    return appointmentRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Appointment> getAppointmentById(@PathVariable("id") long id) {
    Optional<Appointment> appointmentData = appointmentRepository.findById(id);

    if (appointmentData.isPresent()) {
      return ResponseEntity.ok(appointmentData.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  public Appointment createAppointment(@RequestBody Appointment appointment) {
    return appointmentRepository.save(appointment);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Appointment> updateAppointment(@PathVariable("id") long id, @RequestBody Appointment appointmentDetails) {
    Optional<Appointment> appointmentData = appointmentRepository.findById(id);

    if (appointmentData.isPresent()) {
      Appointment _appointment = appointmentData.get();
      if(appointmentDetails.getStatus() != null) _appointment.setStatus(appointmentDetails.getStatus());
      if(appointmentDetails.getMeetingLink() != null) _appointment.setMeetingLink(appointmentDetails.getMeetingLink());
      if(appointmentDetails.getConsultationNote() != null) _appointment.setConsultationNote(appointmentDetails.getConsultationNote());
      return ResponseEntity.ok(appointmentRepository.save(_appointment));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteAppointment(@PathVariable("id") long id) {
    try {
      appointmentRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    } catch (Exception e) {
      return ResponseEntity.internalServerError().build();
    }
  }
  
  @GetMapping("/patient/{name}")
  public List<Appointment> getAppointmentsByPatient(@PathVariable String name) {
     return appointmentRepository.findByPatient(name);
  }
  
  @GetMapping("/doctor/{name}")
  public List<Appointment> getAppointmentsByDoctor(@PathVariable String name) {
     return appointmentRepository.findByDoctor(name);
  }
}
