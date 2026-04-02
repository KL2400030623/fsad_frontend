import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, NavLink, Route, Routes, useLocation, useNavigate, Outlet } from 'react-router-dom';
import './App.css';
import WorkspaceSummary from './components/WorkspaceSummary';
import BrandLogo from './components/BrandLogo';
import EmergencyCall from './components/EmergencyCall';
import AdminPanel from './features/AdminPanel';
import DoctorPanel from './features/DoctorPanel';
import DoctorConsultations from './features/DoctorConsultations';
import DoctorPrescriptions from './features/DoctorPrescriptions';
import DoctorFollowUp from './features/DoctorFollowUp';
import PatientPanel from './features/PatientPanel';
import PharmacistPanel from './features/PharmacistPanel';
import AppointmentsPage from './pages/AppointmentsPage';
import UsersPage from './pages/UsersPage';
import HomePage from './pages/HomePage';
import DashboardAccessPortal from './pages/DashboardAccessPortal';
import DashboardPortalPage from './pages/DashboardPortalPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MedicinesPage from './pages/MedicinesPage';
import InstantConsultPage from './pages/InstantConsultPage';
import LabTestsPage from './pages/LabTestsPage';
import ServicesPage from './pages/ServicesPage';
import ProcessPage from './pages/ProcessPage';
import {
  initialAppointments,
  initialLabReports,
  initialPrescriptions,
  initialRecords,
  initialUsers,
  roleLabels,
  roleCredentials,
  staffByRole,
  medicationPricing,
  userCredentials,
} from './constants/data';

const STORAGE_KEYS = {
  activeRole: 'oms.activeRole',
  isAuthenticated: 'oms.isAuthenticated',
  currentUser: 'oms.currentUser',
  activeActor: 'oms.activeActor',
  users: 'oms.users',
  appointments: 'oms.appointments',
  records: 'oms.records',
  prescriptions: 'oms.prescriptions',
  platformSettings: 'oms.platformSettings',
  roleAccounts: 'oms.roleAccounts',
};

const ROLE_PATHS = {
  admin: '/admin/dashboard',
  doctor: '/doctor/dashboard',
  patient: '/patient/dashboard',
  pharmacist: '/pharmacist/dashboard',
};

const ROLE_ICONS = {
  admin: '⚙️',
  doctor: '🩺',
  patient: '👤',
  pharmacist: '💊',
};

const ROLE_COLORS = {
  admin: { bg: 'bg-purple-900', border: 'border-purple-700', text: 'text-purple-200', badge: 'bg-purple-700' },
  doctor: { bg: 'bg-blue-900', border: 'border-blue-700', text: 'text-blue-200', badge: 'bg-blue-700' },
  patient: { bg: 'bg-emerald-900', border: 'border-emerald-700', text: 'text-emerald-200', badge: 'bg-emerald-700' },
  pharmacist: { bg: 'bg-amber-900', border: 'border-amber-700', text: 'text-amber-200', badge: 'bg-amber-700' },
};

const ROLE_TITLES = {
  admin: 'Administrator Dashboard',
  doctor: 'Doctor Dashboard',
  patient: 'Patient Portal',
  pharmacist: 'Pharmacist Dashboard',
};

const ROLE_MENUS = {
  admin: {
    quickLinks: [
      { label: 'Dashboard', to: ROLE_PATHS.admin },
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
    sections: ['User Accounts', 'Security Settings', 'Data Controls'],
  },
  doctor: {
    quickLinks: [
      { label: 'Dashboard', to: ROLE_PATHS.doctor },
      { label: 'Consultations', to: `${ROLE_PATHS.doctor}/consultations` },
      { label: 'Prescriptions', to: `${ROLE_PATHS.doctor}/prescriptions` },
      { label: 'Follow-up', to: `${ROLE_PATHS.doctor}/followup` },
    ],
    sections: ['Virtual Consultations', 'Prescription Creation', 'Patient Follow-up'],
  },
  patient: {
    quickLinks: [{ label: 'Dashboard', to: ROLE_PATHS.patient }],
    sections: ['Book Appointment', 'Medical Records', 'Lab Reports & Prescriptions'],
  },
  pharmacist: {
    quickLinks: [{ label: 'Dashboard', to: ROLE_PATHS.pharmacist }],
    sections: ['Prescription Queue', 'Order Fulfillment', 'Dispensing Notes'],
  },
};

function generatePrescriptionId() {
  return 'RX-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function getStoredValue(key, fallback) {
  let rawValue = null;
  try {
    rawValue = localStorage.getItem(key);
  } catch {
    return fallback;
  }

  if (!rawValue) {
    return fallback;
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    return parsedValue ?? fallback;
  } catch {
    return fallback;
  }
}

function setStoredValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeStoredValue(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function TopRightNav({ visible = true, isAuthenticated = false, authenticatedDashboardPath = '/' }) {
  const location = useLocation();
  const handleBrandClick = (event) => {
    if (location.pathname === '/') {
      event.preventDefault();
      window.location.reload();
    }
  };

  return (
    <nav className={`fixed left-0 right-0 top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur-md transition-all duration-300 ${
      visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
    }`}>
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <NavLink
          to="/"
          onClick={handleBrandClick}
          className="cursor-text"
        >
          <BrandLogo />
        </NavLink>
        <div className="flex flex-wrap items-center justify-end gap-4">
          {isAuthenticated && (
            <NavLink
              to={authenticatedDashboardPath}
              className={({ isActive }) => `rounded-xl px-6 py-3 text-xl font-bold transition ${
                isActive ? 'bg-indigo-500 text-white shadow-md' : 'bg-indigo-400/90 text-white hover:bg-indigo-500'
              }`}
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to="/dashboard-portal"
            className={({ isActive }) => `rounded-xl px-6 py-3 text-xl font-bold transition ${
              isActive ? 'bg-blue-500 text-white shadow-md' : 'bg-blue-400/90 text-white hover:bg-blue-500'
            }`}
          >
            Portal
          </NavLink>
          <NavLink
            to="/"
            onClick={(event) => {
              if (location.pathname === '/') {
                event.preventDefault();
                window.location.reload();
              }
            }}
            className={({ isActive }) => `rounded-xl px-6 py-3 text-xl font-bold transition ${
              isActive ? 'bg-emerald-500 text-white shadow-md' : 'bg-emerald-400/90 text-white hover:bg-emerald-500'
            }`}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `rounded-xl px-6 py-3 text-xl font-bold transition ${
              isActive ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-400/90 text-white hover:bg-amber-500'
            }`}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `rounded-xl px-6 py-3 text-xl font-bold transition ${
              isActive ? 'bg-cyan-500 text-white shadow-md' : 'bg-cyan-400/90 text-white hover:bg-cyan-500'
            }`}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showTopNav, setShowTopNav] = useState(true);

  const defaultActiveActor = {
    admin: 'Platform Admin',
    doctor: 'Dr. Maya Patel',
    patient: 'Alice Brown',
    pharmacist: 'Pharm. Lena Kim',
  };

  const defaultPlatformSettings = {
    enforce2FA: true,
    encryptAtRest: true,
    retentionMonths: 24,
  };

  const defaultBookingForm = {
    doctor: 'Dr. Maya Patel',
    date: '2026-02-22',
    time: '09:00',
    reason: '',
  };

  const defaultNewPrescription = {
    patient: 'Alice Brown',
    diagnosis: '',
    medication: 'Amlodipine 5mg',
    dosage: '1 tablet daily',
    quantity: 30,
    instructions: '',
  };

  const [activeRole, setActiveRole] = useState(() => getStoredValue(STORAGE_KEYS.activeRole, 'patient'));
  const [isAuthenticated, setIsAuthenticated] = useState(() => getStoredValue(STORAGE_KEYS.isAuthenticated, false));
  const [currentUser, setCurrentUser] = useState(() => getStoredValue(STORAGE_KEYS.currentUser, null));
  const [activeActor, setActiveActor] = useState(() => getStoredValue(STORAGE_KEYS.activeActor, defaultActiveActor));

  const [users, setUsers] = useState(() => getStoredValue(STORAGE_KEYS.users, initialUsers));
  const [appointments, setAppointments] = useState(() => getStoredValue(STORAGE_KEYS.appointments, initialAppointments));
  const [records, setRecords] = useState(() => getStoredValue(STORAGE_KEYS.records, initialRecords));
  const [labReports] = useState(initialLabReports);
  const [prescriptions, setPrescriptions] = useState(() => getStoredValue(STORAGE_KEYS.prescriptions, initialPrescriptions));

  const [platformSettings, setPlatformSettings] = useState(() =>
    getStoredValue(STORAGE_KEYS.platformSettings, defaultPlatformSettings)
  );

  const [bookingForm, setBookingForm] = useState(defaultBookingForm);
  const [newPrescription, setNewPrescription] = useState(defaultNewPrescription);

  const [consultationDrafts, setConsultationDrafts] = useState({});
  const [pharmacistNotes, setPharmacistNotes] = useState({});
  const [activeAdminSection, setActiveAdminSection] = useState('dashboard');
  const [activeDoctorSection, setActiveDoctorSection] = useState('consultations');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'doctor' });
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [storageErrorMessage, setStorageErrorMessage] = useState('');
  const [prescriptionSuccessMessage, setPrescriptionSuccessMessage] = useState('');
  const [roleAccounts, setRoleAccounts] = useState(() => getStoredValue(STORAGE_KEYS.roleAccounts, {}));
  const [detectedRole, setDetectedRole] = useState(null);

  const normalizedActiveRole = roleLabels[activeRole] ? activeRole : 'patient';
  const authenticatedRole = isAuthenticated && currentUser ? currentUser.role : null;
  const authenticatedDashboardPath = authenticatedRole ? ROLE_PATHS[authenticatedRole] : ROLE_PATHS.patient;
  const activeRoleMenu = authenticatedRole ? ROLE_MENUS[authenticatedRole] : ROLE_MENUS.patient;

  // Enhanced role guard that checks authentication status
  const withRoleGuard = (allowedRoles, element) => {
    // If not authenticated, redirect to login
    if (!isAuthenticated || !currentUser) {
      return <Navigate to="/login" replace />;
    }

    // If authenticated but role not in allowed roles, redirect to user's dashboard
    if (!allowedRoles.includes(authenticatedRole)) {
      return <Navigate to={authenticatedDashboardPath} replace />;
    }

    // User is authenticated and has correct role
    return element;
  };

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.currentUser, currentUser);
  }, [currentUser]);

  useEffect(() => {
    setStoredValue(STORAGE_KEYS.roleAccounts, roleAccounts);
  }, [roleAccounts]);

  useEffect(() => {
    if (currentUser?.role && currentUser.role !== activeRole) {
      setActiveRole(currentUser.role);
    }
  }, [currentUser, activeRole]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.activeRole, activeRole);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [activeRole]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.isAuthenticated, isAuthenticated);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.activeActor, activeActor);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [activeActor]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.users, users);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [users]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.appointments, appointments);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [appointments]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.records, records);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [records]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.prescriptions, prescriptions);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [prescriptions]);

  useEffect(() => {
    const success = setStoredValue(STORAGE_KEYS.platformSettings, platformSettings);
    if (!success) {
      setStorageErrorMessage('Unable to save local changes. Please check browser storage settings.');
    }
  }, [platformSettings]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopNav(window.scrollY <= 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!resetMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setResetMessage('');
    }, 2500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [resetMessage]);

  useEffect(() => {
    if (!prescriptionSuccessMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPrescriptionSuccessMessage('');
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [prescriptionSuccessMessage]);

  // Route protection effect - redirect unauthorized access
  useEffect(() => {
    const currentPath = location.pathname;
    
    // If not authenticated and trying to access protected routes
    if (!isAuthenticated || !currentUser) {
      // Allow access to public routes (no login required)
      if (currentPath === '/' || currentPath === '/login' || currentPath === '/register-patient' || currentPath === '/about' || currentPath === '/services' || currentPath === '/contact' || currentPath === '/process' || currentPath === '/medicines' || currentPath === '/medicine' || currentPath === '/lab-tests' || currentPath === '/instant-consult') {
        return;
      }
      // Redirect to login for any other route
      navigate('/login', { replace: true });
      return;
    }

    // If authenticated but wrong role for current route
    const routeRoleMap = {
      '/admin/dashboard': 'admin',
      '/doctor/dashboard': 'doctor', 
      '/patient/dashboard': 'patient',
      '/pharmacist/dashboard': 'pharmacist',
    };

    const requiredRole = routeRoleMap[currentPath];
    if (requiredRole && authenticatedRole !== requiredRole) {
      // Redirect to user's correct dashboard
      navigate(authenticatedDashboardPath, { replace: true });
    }
  }, [isAuthenticated, currentUser, authenticatedRole, location.pathname, navigate, authenticatedDashboardPath]);

  // Component-level authentication wrapper
  const AuthenticatedRoute = ({ children, allowedRoles }) => {
    // Check if user is authenticated
    if (!isAuthenticated || !currentUser) {
      return <Navigate to="/login" replace />;
    }

    // Check if user has required role
    if (!allowedRoles.includes(authenticatedRole)) {
      return <Navigate to={authenticatedDashboardPath} replace />;
    }

    return children;
  };

  // Doctor Layout Component
  const DoctorLayout = () => (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      {/* Doctor Sidebar */}
      <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">Navigation</h2>
        <nav className="space-y-2">
          {activeRoleMenu.quickLinks.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="space-y-6">
        <Outlet />
      </main>
    </div>
  );

  // Doctor Dashboard Component (default view)
  const DoctorDashboard = ({
    doctorAppointments,
    consultationDrafts,
    setConsultationDrafts,
    approveAppointment,
    rejectAppointment,
    completeConsultation,
    createPrescription,
    newPrescription,
    setNewPrescription,
    patients,
    prescriptionSuccessMessage,
  }) => (
    <DoctorPanel
      doctorAppointments={doctorAppointments}
      consultationDrafts={consultationDrafts}
      setConsultationDrafts={setConsultationDrafts}
      approveAppointment={approveAppointment}
      rejectAppointment={rejectAppointment}
      completeConsultation={completeConsultation}
      createPrescription={createPrescription}
      newPrescription={newPrescription}
      setNewPrescription={setNewPrescription}
      patients={patients}
      prescriptionSuccessMessage={prescriptionSuccessMessage}
    />
  );

  const counts = useMemo(
    () => ({
      users: users.length,
      appointments: appointments.length,
      pendingRx: prescriptions.filter((item) => item.status === 'Pending Fulfillment').length,
      reports: labReports.length,
    }),
    [users.length, appointments.length, prescriptions, labReports.length]
  );

  const doctorAppointments = appointments.filter((item) => 
    currentUser ? item.doctor === currentUser.name : item.doctor === activeActor.doctor
  );
  const patientAppointments = appointments.filter((item) => 
    currentUser ? item.patient === currentUser.name : item.patient === activeActor.patient
  );
  const patientRecords = records.find((item) => 
    currentUser ? item.patient === currentUser.name : item.patient === activeActor.patient
  );
  const patientLabs = labReports.filter((item) => 
    currentUser ? item.patient === currentUser.name : item.patient === activeActor.patient
  );
  const patientPrescriptions = prescriptions.filter((item) => 
    currentUser ? item.patient === currentUser.name : item.patient === activeActor.patient
  );

  const handleBookAppointment = (event) => {
    event.preventDefault();
    if (!bookingForm.reason.trim()) {
      return;
    }

    const patientName = currentUser?.name || activeActor.patient;
    const nextId = appointments.length + 1;
    setAppointments((current) => [
      ...current,
      {
        id: nextId,
        patient: patientName,
        doctor: bookingForm.doctor,
        date: bookingForm.date,
        time: bookingForm.time,
        reason: bookingForm.reason,
        status: 'Pending',
        meetingLink: `https://telemed.example.com/room/${patientName.split(' ')[0]}${nextId}`,
        consultationNote: '',
      },
    ]);

    setBookingForm((current) => ({ ...current, reason: '' }));
  };

  const updateAppointmentStatus = (appointmentId, nextStatus) => {
    setAppointments((current) =>
      current.map((item) =>
        item.id === appointmentId
          ? {
              ...item,
              status: nextStatus,
            }
          : item
      )
    );
  };

  const approveAppointment = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'Approved');
  };

  const rejectAppointment = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'Rejected');
  };

  const completeConsultation = (appointmentId) => {
    const note = consultationDrafts[appointmentId]?.trim();
    if (!note) {
      return;
    }

    const appointment = appointments.find((item) => item.id === appointmentId);
    if (!appointment || appointment.status !== 'Approved') {
      return;
    }

    setAppointments((current) =>
      current.map((item) =>
        item.id === appointmentId
          ? {
              ...item,
              status: 'Completed',
              consultationNote: note,
            }
          : item
      )
    );

    setRecords((current) =>
      current.map((record) =>
        record.patient === appointment.patient
          ? {
              ...record,
              conditions: `${record.conditions}; ${note}`,
              lastVisit: appointment.date,
            }
          : record
      )
    );
  };

  const createPrescription = (event) => {
    event.preventDefault();
    const { patient, diagnosis, medication, dosage, quantity, instructions } = newPrescription;
    if (!medication.trim() || !dosage.trim() || !instructions.trim() || !quantity) {
      return;
    }

    // Get patient details from users list
    const patientUser = users.find((u) => u.name === patient && u.role === 'patient');
    const patientRecord = records.find((r) => r.patient === patient);

    // Get medication pricing
    const medicationPrice = medicationPricing[medication] || { unitPrice: 0, unit: 'unit' };
    const totalCost = medicationPrice.unitPrice * parseFloat(quantity);

    const doctorName = currentUser?.name || activeActor.doctor;
    const prescriptionId = generatePrescriptionId();
    setPrescriptions((current) => [
      ...current,
      {
        id: prescriptionId,
        patient,
        patientAge: patientRecord?.age || 'N/A',
        patientContact: patientUser?.contact || 'N/A',
        doctor: doctorName,
        date: new Date().toISOString().split('T')[0],
        diagnosis,
        medication,
        dosage,
        quantity: parseFloat(quantity),
        instructions,
        status: 'Pending Fulfillment',
        pharmacistNote: '',
        unitPrice: medicationPrice.unitPrice,
        totalCost: totalCost,
      },
    ]);

    setNewPrescription((current) => ({ 
      ...current, 
      diagnosis: '',
      medication: 'Amlodipine 5mg', 
      dosage: '1 tablet daily', 
      quantity: 30,
      instructions: '' 
    }));
    setPrescriptionSuccessMessage(`Prescription ${prescriptionId} saved successfully!`);
  };

  const markDispensed = (prescriptionId) => {
    const note = pharmacistNotes[prescriptionId] || '';
    setPrescriptions((current) =>
      current.map((item) =>
        item.id === prescriptionId
          ? {
              ...item,
              status: 'Dispensed',
              pharmacistNote: note,
            }
          : item
      )
    );
  };

  const resetDemoData = () => {
    const shouldReset = window.confirm('Reset all demo data and restore defaults?');
    if (!shouldReset) {
      return;
    }

    const removedAll = Object.values(STORAGE_KEYS).every((key) => removeStoredValue(key));
    if (!removedAll) {
      setStorageErrorMessage('Unable to clear all saved data from browser storage.');
    }

    setActiveRole('patient');
    setActiveActor(defaultActiveActor);
    setUsers(initialUsers);
    setAppointments(initialAppointments);
    setRecords(initialRecords);
    setPrescriptions(initialPrescriptions);
    setPlatformSettings(defaultPlatformSettings);
    setBookingForm(defaultBookingForm);
    setNewPrescription(defaultNewPrescription);
    setConsultationDrafts({});
    setPharmacistNotes({});
    setResetMessage('Demo data reset successfully.');
    navigate(ROLE_PATHS.patient);
  };

  // Helper function for authentication that works with both form-based and new LoginPage
  const authenticateUser = (email, password) => {
    if (!email.trim() || !password.trim()) {
      setLoginError('Enter both email and password.');
      return false;
    }

    let foundRole = null;
    let foundName = null;
    let userEmail = email.toLowerCase().trim();

    // Priority 1: Check individual user credentials
    const userCred = userCredentials[userEmail];
    if (userCred && userCred.password === password) {
      foundRole = userCred.role;
      foundName = userCred.name;
      
      const userAccount = users.find(u => u.name === foundName && u.role === foundRole);
      if (userAccount && userAccount.status !== 'Active') {
        setLoginError('Your account is pending admin approval. Please contact the administrator.');
        return false;
      }
      
      setCurrentUser({ name: foundName, email: userEmail, role: foundRole });
    }

    // Priority 2: Check legacy role credentials
    if (!foundRole) {
      for (const [role, credentials] of Object.entries(roleCredentials)) {
        if (credentials.email === email && credentials.password === password) {
          foundRole = role;
          foundName = credentials.name;
          
          const userAccount = users.find(u => u.name === foundName && u.role === foundRole);
          if (userAccount && userAccount.status !== 'Active') {
            setLoginError('Your account is pending admin approval. Please contact the administrator.');
            return false;
          }
          
          setCurrentUser({ name: foundName, email: email, role: foundRole });
          break;
        }
      }
    }

    // Priority 3: Check stored role accounts
    if (!foundRole) {
      for (const [role, accounts] of Object.entries(roleAccounts)) {
        const matchedAccount = accounts.find(
          (acc) => acc.email === email && acc.password === password
        );
        if (matchedAccount) {
          foundRole = role;
          foundName = matchedAccount.name;
          setCurrentUser({ name: foundName, email: email, role: foundRole });
          break;
        }
      }
    }

    // Priority 4: Check stored users list
    if (!foundRole) {
      const matchedUser = users.find(
        (u) => u.email && u.email.toLowerCase() === userEmail && u.password === password
      );
      if (matchedUser) {
        foundRole = matchedUser.role;
        foundName = matchedUser.name;
        
        if (matchedUser.status !== 'Active') {
          setLoginError('Your account is not active. Please contact administrator.');
          return false;
        }
        
        setCurrentUser({ name: foundName, email: userEmail, role: foundRole });
      }
    }

    if (!foundRole) {
      setLoginError('Invalid email or password. Please check your credentials.');
      return false;
    }

    setLoginError('');
    setActiveRole(foundRole);
    setActiveActor((current) => ({
      ...current,
      [foundRole]: foundName,
    }));
    setIsAuthenticated(true);
    setLoginForm({ email: '', password: '' });
    setDetectedRole(null);
    
    // Persist authentication state to localStorage
    setStoredValue(STORAGE_KEYS.activeRole, foundRole);
    setStoredValue(STORAGE_KEYS.currentUser, { name: foundName, email: userEmail, role: foundRole });
    setStoredValue(STORAGE_KEYS.isAuthenticated, true);
    
    navigate(ROLE_PATHS[foundRole]);
    return true;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    authenticateUser(loginForm.email, loginForm.password);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setLoginError('');

    if (!signupForm.name.trim() || !signupForm.email.trim() || !signupForm.password.trim() || !signupForm.confirmPassword.trim()) {
      setLoginError('All fields are required.');
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setLoginError('Passwords do not match.');
      return;
    }

    if (signupForm.password.length < 6) {
      setLoginError('Password must be at least 6 characters.');
      return;
    }

    if (!['doctor', 'pharmacist'].includes(signupForm.role)) {
      setLoginError('Only Doctor and Pharmacist accounts can be created.');
      return;
    }

    const existsInDefaults = Object.values(userCredentials).some(
      (cred) => cred.email.toLowerCase() === signupForm.email.toLowerCase()
    );

    if (existsInDefaults) {
      setLoginError('This email is already registered. Please use a different email.');
      return;
    }

    const existsInStored = Object.values(roleAccounts).some((accounts) =>
      accounts.some((acc) => acc.email.toLowerCase() === signupForm.email.toLowerCase())
    );

    if (existsInStored) {
      setLoginError('This email is already registered. Please use a different email.');
      return;
    }

    const role = signupForm.role;
    const newUserId = users.length + 1;
    const newUser = {
      id: newUserId,
      name: signupForm.name.trim(),
      role: role,
      status: 'Pending', // New accounts require admin approval
      contact: 'Pending Setup',
    };

    // Add to main users list with pending status
    setUsers((prev) => [...prev, newUser]);

    // Also add credentials for login (but account will be pending)
    const newAccount = {
      name: signupForm.name.trim(),
      email: signupForm.email.trim(),
      password: signupForm.password,
      createdAt: new Date().toISOString(),
    };

    setRoleAccounts((prev) => ({
      ...prev,
      [role]: [...(prev[role] || []), newAccount],
    }));

    setResetMessage(`Account created successfully for ${roleLabels[role]}. Your account is pending admin approval.`);
    setTimeout(() => setResetMessage(''), 3500);
    setSignupForm({ name: '', email: '', password: '', confirmPassword: '', role: 'doctor' });
    setIsSignupMode(false);
    setDetectedRole(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveRole('patient'); // Reset to default
    
    // Clear authentication state from localStorage
    removeStoredValue(STORAGE_KEYS.isAuthenticated);
    removeStoredValue(STORAGE_KEYS.currentUser);
    removeStoredValue(STORAGE_KEYS.activeRole);
    
    navigate('/');
  };

  const renderRolePage = (role) => (
    <>
      <WorkspaceSummary
        activeRole={role}
        roleLabels={roleLabels}
        currentActor={currentUser?.name || activeActor[role]}
        currentUser={currentUser}
        staffOptions={staffByRole[role]}
        setActiveActor={setActiveActor}
        counts={counts}
      />

      {role === 'admin' && (
        <AdminPanel
          users={users}
          roleLabels={roleLabels}
          setUsers={setUsers}
          platformSettings={platformSettings}
          setPlatformSettings={setPlatformSettings}
          onResetDemoData={resetDemoData}
          activeSection={activeAdminSection}
          setActiveSection={setActiveAdminSection}
          appointments={appointments}
          prescriptions={prescriptions}
        />
      )}

      {role === 'doctor' && (
        <DoctorPanel
          doctorAppointments={doctorAppointments}
          consultationDrafts={consultationDrafts}
          setConsultationDrafts={setConsultationDrafts}
          approveAppointment={approveAppointment}
          rejectAppointment={rejectAppointment}
          completeConsultation={completeConsultation}
          createPrescription={createPrescription}
          newPrescription={newPrescription}
          setNewPrescription={setNewPrescription}
          patients={staffByRole.patient}
          prescriptionSuccessMessage={prescriptionSuccessMessage}
        />
      )}

      {role === 'patient' && (
        <PatientPanel
          handleBookAppointment={handleBookAppointment}
          bookingForm={bookingForm}
          setBookingForm={setBookingForm}
          doctors={staffByRole.doctor}
          patientAppointments={patientAppointments}
          patientRecords={patientRecords}
          patientLabs={patientLabs}
          patientPrescriptions={patientPrescriptions}
        />
      )}

      {role === 'pharmacist' && (
        <PharmacistPanel
          prescriptions={prescriptions}
          pharmacistNotes={pharmacistNotes}
          setPharmacistNotes={setPharmacistNotes}
          markDispensed={markDispensed}
        />
      )}
    </>
  );

  if (!isAuthenticated) {
    // Check if current route is home, public pages, patient registration, or login page
    const currentPath = location.pathname;
    
    // Show home page for root path
    if (currentPath === '/') {
      return (
        <HomePage 
          doctors={staffByRole.doctor}
          setUsers={setUsers}
          users={users}
          isAuthenticated={isAuthenticated}
        />
      );
    }
    
    if (currentPath === '/dashboard-access') {
      return <DashboardAccessPortal />;
    }
    
    if (currentPath === '/dashboard-portal') {
      return <DashboardAccessPortal />;
    }
    
    if (currentPath === '/login') {
      return <LoginPage onLogin={(credentials) => {
        authenticateUser(credentials.email, credentials.password);
      }} loginError={loginError} />;
    }
    
    if (currentPath === '/about') {
      return (
        <main className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 px-4 pb-8 pt-28 text-slate-800 md:px-8">
          <TopRightNav visible={showTopNav} />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
            <header className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
              <h1 className="text-2xl font-bold md:text-3xl">Online Medical System</h1>
              <p className="mt-2 text-sm text-slate-300">About</p>
            </header>
            <AboutPage />
          </div>
        </main>
      );
    }

    if (currentPath === '/contact') {
      return (
        <main className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 px-4 pb-8 pt-28 text-slate-800 md:px-8">
          <TopRightNav visible={showTopNav} />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
            <header className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
              <h1 className="text-2xl font-bold md:text-3xl">Online Medical System</h1>
              <p className="mt-2 text-sm text-slate-300">Contact</p>
            </header>
            <ContactPage />
          </div>
        </main>
      );
    }

    if (currentPath === '/medicines' || currentPath === '/medicine') {
      return <MedicinesPage />;
    }

    if (currentPath === '/services') {
      return <ServicesPage />;
    }

    if (currentPath === '/process') {
      return <ProcessPage />;
    }

    if (currentPath === '/lab-tests') {
      return <LabTestsPage />;
    }

    if (currentPath === '/instant-consult') {
      return <InstantConsultPage />;
    }

    // Show login page for all other routes
    return (
      <main className="min-h-screen flex items-center justify-center px-4 pb-8 pt-28 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
        <TopRightNav visible={showTopNav} />
        {/* Medical Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-9xl">🩺</div>
          <div className="absolute top-40 right-20 text-9xl">💊</div>
          <div className="absolute bottom-20 left-1/4 text-9xl">❤️</div>
          <div className="absolute bottom-40 right-1/3 text-9xl">🏥</div>
          <div className="absolute top-1/3 right-10 text-9xl">⚕️</div>
        </div>
        
        <div className="relative z-10 w-full max-w-2xl">
          <section className="rounded-3xl bg-white p-12 shadow-2xl border-2 border-teal-100">
            {/* Header with Medical Icon */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 mb-6 shadow-lg">
                <span className="text-5xl">⚕️</span>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Online Medical System
              </h1>
              <p className="mt-4 text-xl text-slate-600 font-semibold">
                {isSignupMode ? '✨ Create Staff Account' : '🔐 Staff Login - Secure Access Portal'}
              </p>
              
              {/* Detected Role Display */}
              {!isSignupMode && detectedRole && (
                <div className="mt-6 inline-block">
                  <div className={`rounded-2xl px-8 py-4 border-3 shadow-lg ${
                    detectedRole === 'admin' ? 'bg-gradient-to-r from-purple-100 to-purple-50 border-purple-300' :
                    detectedRole === 'doctor' ? 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-300' :
                    detectedRole === 'patient' ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 border-emerald-300' :
                    'bg-gradient-to-r from-amber-100 to-amber-50 border-amber-300'
                  }`}>
                    <p className="text-2xl font-bold ${
                      detectedRole === 'admin' ? 'text-purple-700' :
                      detectedRole === 'doctor' ? 'text-blue-700' :
                      detectedRole === 'patient' ? 'text-emerald-700' :
                      'text-amber-700'
                    }">
                      {detectedRole === 'admin' && '⚙️ Administrator Portal'}
                      {detectedRole === 'doctor' && '🩺 Doctor Portal'}
                      {detectedRole === 'patient' && '👤 Patient Portal'}
                      {detectedRole === 'pharmacist' && '💊 Pharmacist Portal'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {!isSignupMode ? (
              /* Login Form */
              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="block text-lg font-bold text-slate-700 mb-3">📧 Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your staff email"
                    className="w-full rounded-xl border-2 border-teal-200 bg-teal-50 px-5 py-4 text-lg text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition"
                    value={loginForm.email}
                    onChange={(event) => {
                      const email = event.target.value;
                      setLoginForm((current) => ({ ...current, email }));
                      // Detect role from email
                      if (userCredentials[email]) {
                        setDetectedRole(userCredentials[email].role);
                      } else {
                        setDetectedRole(null);
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-slate-700 mb-3">🔒 Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border-2 border-teal-200 bg-teal-50 px-5 py-4 text-lg text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition"
                    value={loginForm.password}
                    onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                  />
                </div>
                {loginError && (
                  <div className="rounded-xl bg-rose-50 border-2 border-rose-200 px-5 py-4">
                    <p className="text-base text-rose-700 font-semibold">⚠️ {loginError}</p>
                  </div>
                )}
                <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-5 text-xl font-bold text-white hover:from-teal-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]">
                  🚀 Login to Dashboard
                </button>
                <div className="text-center space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignupMode(true);
                      setLoginError('');
                      setDetectedRole(null);
                    }}
                    className="block w-full text-cyan-600 font-bold hover:text-cyan-700 transition"
                  >
                    ✨ Create Account (Doctor / Pharmacist)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Clear all stored data and reset to initial state?')) {
                        Object.values(STORAGE_KEYS).forEach(key => removeStoredValue(key));
                        setUsers(initialUsers);
                        setAppointments(initialAppointments);
                        setRecords(initialRecords);
                        setPrescriptions(initialPrescriptions);
                        setPlatformSettings(defaultPlatformSettings);
                        setLoginForm({ email: '', password: '' });
                        setLoginError('');
                        setDetectedRole(null);
                        window.location.reload();
                      }
                    }}
                    className="block w-full text-xs text-slate-500 hover:text-slate-700 transition"
                  >
                    🔄 Reset Demo Data
                  </button>
                </div>
              </form>
            ) : (
              /* Signup Form */
              <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                <div>
                  <label className="block text-lg font-bold text-slate-700 mb-3">👤 Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border-2 border-teal-200 bg-teal-50 px-5 py-4 text-lg text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition"
                    value={signupForm.name}
                    onChange={(event) => setSignupForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-slate-700 mb-3">📧 Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border-2 border-teal-200 bg-teal-50 px-5 py-4 text-lg text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition"
                    value={signupForm.email}
                    onChange={(event) => setSignupForm((current) => ({ ...current, email: event.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-slate-700 mb-3">🎭 Select Your Role</label>
                  <select
                    className="w-full rounded-xl border-2 border-teal-200 bg-teal-50 px-5 py-4 text-lg text-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition font-semibold cursor-pointer"
                    value={signupForm.role}
                    onChange={(event) => setSignupForm((current) => ({ ...current, role: event.target.value }))}
                  >
                    <option value="doctor">🩺 Doctor - Medical Professional</option>
                    <option value="pharmacist">💊 Pharmacist - Medication Specialist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-lg font-bold text-slate-700 mb-3">🔒 Password</label>
                  <input
                    type="password"
                    placeholder="Create a strong password (min 6 characters)"
                    className="w-full rounded-xl border-2 border-teal-200 bg-teal-50 px-5 py-4 text-lg text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition"
                    value={signupForm.password}
                    onChange={(event) => setSignupForm((current) => ({ ...current, password: event.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-slate-700 mb-3">✅ Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Re-enter your password"
                    className="w-full rounded-xl border-2 border-teal-200 bg-teal-50 px-5 py-4 text-lg text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition"
                    value={signupForm.confirmPassword}
                    onChange={(event) => setSignupForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                  />
                </div>
                {loginError && (
                  <div className="rounded-xl bg-rose-50 border-2 border-rose-200 px-5 py-4">
                    <p className="text-base text-rose-700 font-semibold">⚠️ {loginError}</p>
                  </div>
                )}
                <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-5 text-xl font-bold text-white hover:from-teal-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]">
                  ✨ Create Account
                </button>
                <div className="text-center pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignupMode(false);
                      setLoginError('');
                      setSignupForm({ name: '', email: '', password: '', confirmPassword: '', role: 'doctor' });
                      setDetectedRole(null);
                    }}
                    className="text-base text-cyan-600 font-bold hover:text-cyan-700 transition"
                  >
                  </button>
                </div>
              </form>
            )}
          </section>

          {resetMessage && (
            <div className="mt-6 rounded-2xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 shadow-lg">
              <p className="text-base font-semibold text-emerald-700 text-center">✅ {resetMessage}</p>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 px-4 pb-8 pt-6 text-slate-800 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <header className={`sticky top-4 z-30 rounded-2xl ${ROLE_COLORS[authenticatedRole].bg} p-4 text-white shadow-lg`}>
          <div className={`flex items-center justify-between gap-4 border-b pb-3 ${ROLE_COLORS[authenticatedRole].border}`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl">{ROLE_ICONS[authenticatedRole]}</span>
              <div>
                <h1 className="text-xl font-bold md:text-2xl">{ROLE_TITLES[authenticatedRole]}</h1>
                <p className={`text-xs md:text-sm ${ROLE_COLORS[authenticatedRole].text}`}>
                  Online Medical System · {roleLabels[authenticatedRole]}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className={`rounded-lg ${ROLE_COLORS[authenticatedRole].badge} px-4 py-2 text-sm font-semibold text-white hover:opacity-80 transition`}
            >
              Logout
            </button>
          </div>
          {currentUser && (
            <p className={`pt-3 text-xs md:text-sm ${ROLE_COLORS[authenticatedRole].text}`}>
              Logged in as: <span className="font-semibold text-white">{currentUser.name}</span>
            </p>
          )}
        </header>

        <div className={`mt-6 ${(authenticatedRole !== 'doctor' && authenticatedRole !== 'patient') ? 'grid gap-6 lg:grid-cols-[260px_1fr]' : ''}`}>
          {authenticatedRole !== 'doctor' && authenticatedRole !== 'patient' && (
            <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Sidebar</h2>
              <nav className="mt-3 space-y-2">
                {activeRoleMenu.quickLinks.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              {authenticatedRole === 'admin' && (
                <div className="mt-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Admin Menu</h3>
                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveAdminSection('dashboard')}
                      className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
                        activeAdminSection === 'dashboard'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      📊 Dashboard Overview
                    </button>
                    <button
                      onClick={() => setActiveAdminSection('users')}
                      className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
                        activeAdminSection === 'users'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      👥 User Accounts
                    </button>
                    <button
                      onClick={() => setActiveAdminSection('security')}
                      className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
                        activeAdminSection === 'security'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      🔒 Security Settings
                    </button>
                    <button
                      onClick={() => setActiveAdminSection('data')}
                      className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
                        activeAdminSection === 'data'
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      💾 Data Controls
                    </button>
                  </nav>
                </div>
              )}
            </aside>
          )}

          <section className="space-y-6">
            {resetMessage && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {resetMessage}
              </div>
            )}

            {storageErrorMessage && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {storageErrorMessage}
              </div>
            )}

            <Routes>
          <Route path="/" element={<Navigate to={authenticatedDashboardPath} replace />} />
          <Route path="/login" element={<Navigate to={authenticatedDashboardPath} replace />} />
          <Route path="/register-patient" element={<Navigate to={authenticatedDashboardPath} replace />} />
          
          {/* Legacy route redirects with role checking */}
          <Route path="/admin" element={
            authenticatedRole === 'admin' ? 
              <Navigate to={ROLE_PATHS.admin} replace /> : 
              <Navigate to={authenticatedDashboardPath} replace />
          } />
          <Route path="/doctor" element={
            authenticatedRole === 'doctor' ? 
              <Navigate to={ROLE_PATHS.doctor} replace /> : 
              <Navigate to={authenticatedDashboardPath} replace />
          } />
          <Route path="/patient" element={
            authenticatedRole === 'patient' ? 
              <Navigate to={ROLE_PATHS.patient} replace /> : 
              <Navigate to={authenticatedDashboardPath} replace />
          } />
          <Route path="/pharmacist" element={
            authenticatedRole === 'pharmacist' ? 
              <Navigate to={ROLE_PATHS.pharmacist} replace /> : 
              <Navigate to={authenticatedDashboardPath} replace />
          } />
          
          {/* Protected dashboard routes */}
          <Route 
            path="/admin/dashboard" 
            element={withRoleGuard(['admin'], renderRolePage('admin'))} 
          />
          
          {/* Doctor nested routes */}
          <Route 
            path="/doctor/dashboard" 
            element={withRoleGuard(['doctor'], <DoctorLayout />)}
          >
            <Route index element={
              <DoctorDashboard 
                doctorAppointments={doctorAppointments}
                consultationDrafts={consultationDrafts}
                setConsultationDrafts={setConsultationDrafts}
                approveAppointment={approveAppointment}
                rejectAppointment={rejectAppointment}
                completeConsultation={completeConsultation}
                createPrescription={createPrescription}
                newPrescription={newPrescription}
                setNewPrescription={setNewPrescription}
                patients={staffByRole.patient}
                prescriptionSuccessMessage={prescriptionSuccessMessage}
              />
            } />
            <Route path="consultations" element={
              <DoctorConsultations 
                doctorAppointments={doctorAppointments}
                consultationDrafts={consultationDrafts}
                setConsultationDrafts={setConsultationDrafts}
                approveAppointment={approveAppointment}
                rejectAppointment={rejectAppointment}
                completeConsultation={completeConsultation}
              />
            } />
            <Route path="prescriptions" element={
              <DoctorPrescriptions 
                createPrescription={createPrescription}
                newPrescription={newPrescription}
                setNewPrescription={setNewPrescription}
                patients={staffByRole.patient}
                prescriptionSuccessMessage={prescriptionSuccessMessage}
              />
            } />
            <Route path="followup" element={
              <DoctorFollowUp 
                doctorAppointments={doctorAppointments}
                patients={staffByRole.patient}
              />
            } />
          </Route>
          
          <Route 
            path="/patient/dashboard" 
            element={withRoleGuard(['patient'], renderRolePage('patient'))} 
          />
          <Route 
            path="/pharmacist/dashboard" 
            element={withRoleGuard(['pharmacist'], renderRolePage('pharmacist'))} 
          />
          
          {/* Public informational pages - accessible to all authenticated users */}
          <Route
            path="/about"
            element={<AboutPage />}
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          <Route
            path="/medicines"
            element={<MedicinesPage />}
          />
          <Route
            path="/lab-tests"
            element={<LabTestsPage />}
          />
          <Route
            path="/services"
            element={<ServicesPage />}
          />
          <Route
            path="/process"
            element={<ProcessPage />}
          />
          <Route
            path="/instant-consult"
            element={<InstantConsultPage />}
          />
          <Route
            path="/medicine"
            element={<Navigate to="/medicines" replace />}
          />
          
          {/* Catch-all route - redirect to appropriate dashboard */}
          <Route path="*" element={<Navigate to={authenticatedDashboardPath} replace />} />
            </Routes>
          </section>
        </div>
      </div>
      <EmergencyCall />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
