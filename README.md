# Online Medical System (FSAD-PS20)

This project is a role-based virtual healthcare web application with four workspaces:

- Admin: manage users, platform settings, and security controls.
- Doctor: conduct virtual consultations, write consultation notes, and issue e-prescriptions.
- Patient: book virtual appointments, view records, and access lab reports and prescriptions.
- Pharmacist: process e-prescriptions, track fulfillment, and provide medication guidance.

## Features Implemented

- **Individual User Accounts**: Each staff member has unique login credentials with isolated data access.
- **Data Isolation**: Doctors only see their own appointments; patients only see their own records.
- **Role-Based Access Control**: Separate dashboards and permissions for each role.
- **Protected Routes**: Frontend-level route protection prevents unauthorized access and cross-role navigation.
- **Admin Approval System**: New doctor and pharmacist accounts require admin approval before activation.
- **Medical Records Management**: Patients can view, upload, and download lab reports and medical documents.
- **Authentication System**: Secure login with email/password validation and account status checking.
- Appointment booking and consultation management.
- E-prescription creation with automatic cost calculation.
- Pharmacist fulfillment workflow with medication pricing.
- Medical record and lab report access for patients.
- Admin controls for user account status and security settings.

## Backend Integration Architecture

**Current State:** The system simulates backend behavior using centralized React state and localStorage for persistence. This provides a complete frontend experience with realistic workflows.

**Backend-Ready Design:** The architecture is structured for seamless API integration without requiring frontend changes:

### Planned API Endpoints
- `/api/auth` - Authentication and authorization
- `/api/appointments` - Appointment CRUD operations
- `/api/prescriptions` - Prescription management
- `/api/users` - User account management

**Integration Approach:** Replace localStorage calls with fetch/axios API calls. State management and component logic remain unchanged, ensuring smooth transition to full-stack implementation.

## Login Credentials

**Important:** Each staff member has individual credentials assigned by the system administrator. Contact your administrator for your login credentials.

## Run the App

1. Install dependencies:

	```bash
	npm install
	```

2. Start development server:

	```bash
	npm start
	```

3. Run tests:

	```bash
	npm test
	```

4. Build production bundle:

	```bash
	npm run build
	```
