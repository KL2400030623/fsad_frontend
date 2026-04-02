export const roleLabels = {
  admin: 'Admin',
  doctor: 'Doctor',
  patient: 'Patient',
  pharmacist: 'Pharmacist',
};

// Individual user credentials - each staff member has their own login
export const userCredentials = {
  'admin@medical.com': { password: 'admin123', name: 'Platform Admin', role: 'admin' },
  'maya.patel@medical.com': { password: 'maya123', name: 'Dr. Maya Patel', role: 'doctor' },
  'john.smith@medical.com': { password: 'john123', name: 'Dr. John Smith', role: 'doctor' },
  'sarah.johnson@medical.com': { password: 'sarah123', name: 'Dr. Sarah Johnson', role: 'doctor' },
  'robert.chen@medical.com': { password: 'robert123', name: 'Dr. Robert Chen', role: 'doctor' },
  'emily.williams@medical.com': { password: 'emily123', name: 'Dr. Emily Williams', role: 'doctor' },
  'michael.brown@medical.com': { password: 'michael123', name: 'Dr. Michael Brown', role: 'doctor' },
  'lisa.anderson@medical.com': { password: 'lisa123', name: 'Dr. Lisa Anderson', role: 'doctor' },
  'david.lee@medical.com': { password: 'david123', name: 'Dr. David Lee', role: 'doctor' },
  'alice.brown@medical.com': { password: 'alice123', name: 'Alice Brown', role: 'patient' },
  'john.mensah@medical.com': { password: 'mensah123', name: 'John Mensah', role: 'patient' },
  'lena.kim@medical.com': { password: 'lena123', name: 'Pharm. Lena Kim', role: 'pharmacist' },
  // Pending approval accounts (credentials exist but accounts are not active)
  'james.wilson@medical.com': { password: 'james123', name: 'Dr. James Wilson', role: 'doctor' },
  'maria.garcia@medical.com': { password: 'maria123', name: 'Dr. Maria Garcia', role: 'doctor' },
  'david.park@medical.com': { password: 'park123', name: 'Pharm. David Park', role: 'pharmacist' },
};

// Legacy - kept for backward compatibility
export const roleCredentials = {
  admin: {
    email: 'admin@medical.com',
    password: 'admin123',
    name: 'Platform Admin',
  },
  doctor: {
    email: 'doctor@medical.com',
    password: 'doctor123',
    name: 'Dr. Maya Patel',
  },
  patient: {
    email: 'patient@medical.com',
    password: 'patient123',
    name: 'Alice Brown',
  },
  pharmacist: {
    email: 'pharmacist@medical.com',
    password: 'pharmacist123',
    name: 'Pharm. Lena Kim',
  },
};

export const staffByRole = {
  admin: ['Platform Admin'],
  doctor: [
    'Dr. Maya Patel',
    'Dr. John Smith',
    'Dr. Sarah Johnson',
    'Dr. Robert Chen',
    'Dr. Emily Williams',
    'Dr. Michael Brown',
    'Dr. Lisa Anderson',
    'Dr. David Lee',
  ],
  patient: ['Alice Brown', 'John Mensah'],
  pharmacist: ['Pharm. Lena Kim'],
};

export const initialUsers = [
  { id: 1, name: 'Platform Admin', role: 'admin', status: 'Active', contact: '555-0100' },
  { id: 2, name: 'Dr. Maya Patel', role: 'doctor', status: 'Active', contact: '555-0201' },
  { id: 3, name: 'Dr. John Smith', role: 'doctor', status: 'Active', contact: '555-0202' },
  { id: 4, name: 'Dr. Sarah Johnson', role: 'doctor', status: 'Active', contact: '555-0203' },
  { id: 5, name: 'Dr. Robert Chen', role: 'doctor', status: 'Active', contact: '555-0204' },
  { id: 6, name: 'Dr. Emily Williams', role: 'doctor', status: 'Active', contact: '555-0205' },
  { id: 7, name: 'Dr. Michael Brown', role: 'doctor', status: 'Active', contact: '555-0206' },
  { id: 8, name: 'Dr. Lisa Anderson', role: 'doctor', status: 'Active', contact: '555-0207' },
  { id: 9, name: 'Dr. David Lee', role: 'doctor', status: 'Active', contact: '555-0208' },
  { id: 10, name: 'Alice Brown', role: 'patient', status: 'Active', contact: '555-0101' },
  { id: 11, name: 'John Mensah', role: 'patient', status: 'Active', contact: '555-0102' },
  { id: 12, name: 'Pharm. Lena Kim', role: 'pharmacist', status: 'Active', contact: '555-0301' },
  // Pending approval accounts
  { id: 13, name: 'Dr. James Wilson', role: 'doctor', status: 'Pending', contact: '555-0209' },
  { id: 14, name: 'Dr. Maria Garcia', role: 'doctor', status: 'Pending', contact: '555-0210' },
  { id: 15, name: 'Pharm. David Park', role: 'pharmacist', status: 'Pending', contact: '555-0302' },
];

export const initialAppointments = [
  {
    id: 1,
    patient: 'Alice Brown',
    doctor: 'Dr. Maya Patel',
    date: '2026-02-21',
    time: '10:30',
    reason: 'Follow-up on blood pressure',
    status: 'Approved',
    meetingLink: 'https://telemed.example.com/room/A1',
    consultationNote: '',
  },
  {
    id: 2,
    patient: 'John Mensah',
    doctor: 'Dr. Emily Williams',
    date: '2026-02-21',
    time: '14:00',
    reason: 'Skin allergy assessment',
    status: 'Pending',
    meetingLink: 'https://telemed.example.com/room/J2',
    consultationNote: '',
  },
];

export const initialRecords = [
  {
    patient: 'Alice Brown',
    age: 45,
    bloodType: 'A+',
    allergies: 'Penicillin',
    conditions: 'Hypertension',
    lastVisit: '2026-01-12',
  },
  {
    patient: 'John Mensah',
    age: 32,
    bloodType: 'O-',
    allergies: 'None',
    conditions: 'Seasonal dermatitis',
    lastVisit: '2026-01-28',
  },
];

export const initialLabReports = [
  {
    id: 1,
    patient: 'Alice Brown',
    test: 'Lipid Profile',
    date: '2026-02-10',
    result: 'Borderline high LDL',
    status: 'Reviewed',
  },
  {
    id: 2,
    patient: 'John Mensah',
    test: 'IgE Panel',
    date: '2026-02-11',
    result: 'Mild pollen sensitivity',
    status: 'Reviewed',
  },
];

export const medicationPricing = {
  'Amlodipine 5mg': { unitPrice: 2.50, unit: 'tablet' },
  'Amlodipine 10mg': { unitPrice: 3.00, unit: 'tablet' },
  'Metformin 500mg': { unitPrice: 1.80, unit: 'tablet' },
  'Metformin 850mg': { unitPrice: 2.20, unit: 'tablet' },
  'Cetirizine 10mg': { unitPrice: 1.50, unit: 'tablet' },
  'Lisinopril 10mg': { unitPrice: 2.80, unit: 'tablet' },
  'Lisinopril 20mg': { unitPrice: 3.50, unit: 'tablet' },
  'Atorvastatin 20mg': { unitPrice: 4.00, unit: 'tablet' },
  'Omeprazole 20mg': { unitPrice: 2.00, unit: 'capsule' },
  'Levothyroxine 50mcg': { unitPrice: 1.20, unit: 'tablet' },
  'Amoxicillin 500mg': { unitPrice: 3.50, unit: 'capsule' },
  'Ibuprofen 400mg': { unitPrice: 0.80, unit: 'tablet' },
  'Paracetamol 500mg': { unitPrice: 0.50, unit: 'tablet' },
  'Aspirin 75mg': { unitPrice: 0.60, unit: 'tablet' },
  'Salbutamol Inhaler': { unitPrice: 15.00, unit: 'inhaler' },
};

export const initialPrescriptions = [
  {
    id: 1,
    patient: 'Alice Brown',
    patientAge: 45,
    patientContact: '555-0101',
    doctor: 'Dr. Maya Patel',
    date: '2026-02-21',
    diagnosis: 'Hypertension',
    medication: 'Amlodipine 5mg',
    dosage: '1 tablet daily',
    quantity: 30,
    instructions: 'Take after breakfast',
    status: 'Pending Fulfillment',
    pharmacistNote: '',
    unitPrice: 2.50,
    totalCost: 75.00,
  },
  {
    id: 2,
    patient: 'John Mensah',
    patientAge: 32,
    patientContact: '555-0102',
    doctor: 'Dr. Emily Williams',
    date: '2026-02-21',
    diagnosis: 'Seasonal allergies',
    medication: 'Cetirizine 10mg',
    dosage: '1 tablet daily',
    quantity: 14,
    instructions: 'Take at bedtime for allergy relief',
    status: 'Pending Fulfillment',
    pharmacistNote: '',
    unitPrice: 1.50,
    totalCost: 21.00,
  },
];