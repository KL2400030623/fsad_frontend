package com.oms.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "prescriptions")
@Data
@NoArgsConstructor
public class Prescription {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String patient;
  private String doctor;
  private String date;
  private String diagnosis;
  private String medication;
  private String dosage;
  private Double quantity;
  private String instructions;
  private String status = "Pending Fulfillment";
  private String pharmacistNote;
  private Double unitPrice;
  private Double totalCost;
}
