import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PatientRegistrationPage from './PatientRegistrationPage';
import BrandLogo from '../components/BrandLogo';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

const features = [
  {
    icon: '🏥',
    title: 'Integrated Healthcare',
    description: 'Seamless connection between patients, doctors, pharmacists, and administrators.',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: '🔐',
    title: 'Secure & HIPAA Compliant',
    description: 'Enterprise-grade security with role-based access controls.',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: '📱',
    title: 'Access Anywhere',
    description: 'Access your health records from any device, anytime.',
    gradient: 'from-violet-500 to-purple-400',
  },
  {
    icon: '⚡',
    title: 'Real-time Consultations',
    description: 'Connect with specialists instantly via video calls.',
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    icon: '📋',
    title: 'Medical Records',
    description: 'Complete digital storage of medical history and reports.',
    gradient: 'from-rose-500 to-pink-400',
  },
  {
    icon: '📅',
    title: 'Smart Scheduling',
    description: 'Intelligent appointment booking with availability tracking.',
    gradient: 'from-indigo-500 to-blue-400',
  },
];

const specialties = [
  { icon: '🫀', name: 'Cardiology', color: 'bg-red-50 hover:bg-red-100 border-red-200' },
  { icon: '🧠', name: 'Neurology', color: 'bg-purple-50 hover:bg-purple-100 border-purple-200' },
  { icon: '👨‍⚕️', name: 'General Medicine', color: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
  { icon: '🦷', name: 'Dentistry', color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200' },
  { icon: '👶', name: 'Pediatrics', color: 'bg-amber-50 hover:bg-amber-100 border-amber-200' },
  { icon: '🤰', name: 'Gynecology', color: 'bg-pink-50 hover:bg-pink-100 border-pink-200' },
  { icon: '🦴', name: 'Orthopedics', color: 'bg-slate-50 hover:bg-slate-100 border-slate-200' },
  { icon: '👁️', name: 'Ophthalmology', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200' },
];

const doctors = [
  { name: 'Dr. Maya Patel', specialty: 'General Medicine', rating: 4.9, reviews: 324, experience: '12 years', available: true },
  { name: 'Dr. Arun Kumar', specialty: 'Cardiology', rating: 4.8, reviews: 512, experience: '15 years', available: true },
  { name: 'Dr. Sarah Chen', specialty: 'Pediatrics', rating: 4.9, reviews: 198, experience: '8 years', available: false },
  { name: 'Dr. James Wilson', specialty: 'Neurology', rating: 4.7, reviews: 276, experience: '10 years', available: true },
];

const testimonials = [
  {
    name: 'Dr. Maya Patel',
    role: 'General Medicine Specialist',
    feedback: 'This platform has revolutionized how I manage patient care. The integrated system saves hours daily.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Patient',
    feedback: 'Finally, a healthcare system that\'s easy to use. I can access my records and book appointments in seconds.',
    rating: 5,
  },
  {
    name: 'Lena Kim',
    role: 'Pharmacist',
    feedback: 'The prescription management system is seamless. Patient safety has improved significantly.',
    rating: 5,
  },
];

const stats = [
  { icon: '✅', value: '100%', label: 'Verified Doctors', color: 'from-emerald-500 to-green-400' },
  { icon: '🔐', value: 'HIPAA', label: 'Compliant Security', color: 'from-blue-500 to-cyan-400' },
  { icon: '⭐', value: '4.9/5', label: 'User Rating', color: 'from-amber-500 to-yellow-400' },
  { icon: '👥', value: '10K+', label: 'Active Users', color: 'from-violet-500 to-purple-400' },
];

function HomePage({ doctors: propDoctors, setUsers, users, isAuthenticated = false, onLogout = null, showCornerNav = true }) {
  const navigate = useNavigate();
  const [showTopNav, setShowTopNav] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const handleBrandClick = (event) => {
    if (window.location.pathname === '/') {
      event.preventDefault();
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopNav(window.scrollY <= 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      {/* Premium Navigation */}
      {showCornerNav && (
        <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          showTopNav 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
          <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-8">
            <NavLink to="/" onClick={handleBrandClick}>
              <BrandLogo />
            </NavLink>
            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/about" className="px-5 py-2.5 text-slate-600 font-semibold rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-all duration-200">About</NavLink>
              <NavLink to="/services" className="px-5 py-2.5 text-slate-600 font-semibold rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-all duration-200">Services</NavLink>
              <NavLink to="/process" className="px-5 py-2.5 text-slate-600 font-semibold rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-all duration-200">Process</NavLink>
              <NavLink to="/contact" className="px-5 py-2.5 text-slate-600 font-semibold rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-all duration-200">Contact</NavLink>
              <NavLink to="/login" className="ml-4 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200">
                Sign In
              </NavLink>
            </nav>
          </div>
        </header>
      )}

      <div className="mx-auto max-w-[1600px] px-8 lg:px-12">
        {/* Hero Section - Bold & Impactful */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-36 pb-28 lg:pt-44 lg:pb-36"
        >
          <div className="text-center space-y-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-semibold text-base mb-4"
            >
              <span className="text-xl">🏥</span> Trusted by 10,000+ Patients
            </motion.div>
            <motion.h1 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-tight tracking-tight"
            >
              Healthcare
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl md:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Connect with top doctors, manage prescriptions, and track your health journey — all in one secure, modern platform.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={() => setShowBookingForm(true)}
                className="group px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-lg font-bold rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/30 cursor-pointer"
              >
                <span className="flex items-center justify-center gap-3">
                  <span className="text-2xl">📋</span>
                  Register Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <NavLink 
                  to="/about"
                  className="block px-10 py-4 bg-white border-2 border-slate-200 text-slate-900 text-lg font-bold rounded-2xl hover:border-slate-300 hover:shadow-lg"
                >
                  Learn More
                </NavLink>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Trust Stats - Premium Cards */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="pb-28 lg:pb-36"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white rounded-2xl p-6 lg:p-8 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`}></div>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                  className="text-4xl lg:text-5xl mb-4"
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl lg:text-4xl font-black text-slate-900 mb-1">{stat.value}</div>
                <p className="text-slate-600 font-semibold text-base lg:text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Browse by Specialty - Large Clickable Cards */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-28 lg:py-36 border-t border-slate-200"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">Browse by Specialty</h2>
            <p className="text-2xl text-slate-600 font-medium">Find the right specialist for your needs</p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {specialties.map((specialty, idx) => (
              <motion.button 
                key={idx} 
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -12 }}
                whileTap={{ scale: 0.95 }}
                className={`group ${specialty.color} border-2 rounded-3xl p-8 lg:p-10 text-center hover:shadow-2xl cursor-pointer`}
              >
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: idx * 0.3 }}
                  className="text-6xl lg:text-7xl mb-5"
                >
                  {specialty.icon}
                </motion.div>
                <p className="font-bold text-slate-900 text-xl lg:text-2xl">{specialty.name}</p>
              </motion.button>
            ))}
          </motion.div>
        </motion.section>

        {/* Top Doctors - Modern Cards */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-28 lg:py-36 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 -mx-8 lg:-mx-12 px-8 lg:px-12 rounded-[2.5rem]"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">Top-Rated Doctors</h2>
            <p className="text-2xl text-slate-600 font-medium">Trusted professionals ready to help you</p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctors.map((doctor, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl border border-slate-100"
              >
                <div className="relative mb-6">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                    className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-blue-500/30"
                  >
                    {doctor.name.split(' ')[1]?.charAt(0) || 'D'}
                  </motion.div>
                  {doctor.available && (
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full"
                    >
                      Available
                    </motion.div>
                  )}
                </div>
                <div className="text-center mb-5">
                  <h3 className="font-bold text-slate-900 text-2xl mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-semibold text-lg">{doctor.specialty}</p>
                  <p className="text-slate-500 mt-1">{doctor.experience} experience</p>
                </div>
                <div className="flex items-center justify-center gap-2 mb-5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.span 
                        key={i} 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        className="text-amber-400 text-xl"
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                  <span className="font-bold text-slate-900 text-lg">{doctor.rating}</span>
                  <span className="text-slate-500">({doctor.reviews})</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-shadow"
                >
                  Book Appointment
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Features - Premium Grid */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-28 lg:py-36 border-t border-slate-200"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">Why Choose Us?</h2>
            <p className="text-2xl text-slate-600 font-medium">Everything you need for complete healthcare management</p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500`}></div>
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl mb-6 shadow-lg`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Testimonials - Clean Cards */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-28 lg:py-36 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -mx-8 lg:-mx-12 px-8 lg:px-12 rounded-[2.5rem]"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">What People Say</h2>
            <p className="text-2xl text-slate-400 font-medium">Trusted by thousands of healthcare professionals and patients</p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="text-amber-400 text-2xl"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="text-white/90 text-lg leading-relaxed mb-6 italic">"{testimonial.feedback}"</p>
                <div className="flex items-center gap-4">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold"
                  >
                    {testimonial.name.charAt(0)}
                  </motion.div>
                  <div>
                    <div className="font-bold text-white text-lg">{testimonial.name}</div>
                    <div className="text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Role Access - Premium Cards */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-28 lg:py-36 border-t border-slate-200"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">Access Your Portal</h2>
            <p className="text-2xl text-slate-600 font-medium">Select your role to get started</p>
          </motion.div>
          <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
            {/* Admin Portal */}
            <motion.button
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -12 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login?role=admin')}
              className="group relative h-80 rounded-[2rem] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-10">
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-7xl mb-6"
                >
                  ⚙️
                </motion.div>
                <h3 className="text-3xl font-black mb-3">Administrator</h3>
                <p className="text-white/80 font-medium text-lg">System Management</p>
              </div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-[2rem] group-hover:border-white/40 transition-all"></div>
            </motion.button>

            {/* Doctor Portal */}
            <motion.button
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -12 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login?role=doctor')}
              className="group relative h-80 rounded-[2rem] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700 group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-10">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl mb-6"
                >
                  🩺
                </motion.div>
                <h3 className="text-3xl font-black mb-3">Doctor</h3>
                <p className="text-white/80 font-medium text-lg">Patient Care</p>
              </div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-[2rem] group-hover:border-white/40 transition-all"></div>
            </motion.button>

            {/* Pharmacist Portal */}
            <motion.button
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -12 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login?role=pharmacist')}
              className="group relative h-80 rounded-[2rem] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 group-hover:scale-105 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-10">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl mb-6"
                >
                  💊
                </motion.div>
                <h3 className="text-3xl font-black mb-3">Pharmacist</h3>
                <p className="text-white/80 font-medium text-lg">Prescriptions</p>
              </div>
              <div className="absolute inset-0 border-2 border-white/20 rounded-[2rem] group-hover:border-white/40 transition-all"></div>
            </motion.button>
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-28 lg:py-36 mb-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 -mx-8 lg:-mx-12 px-8 lg:px-12 rounded-[2.5rem] text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl lg:text-6xl font-black text-white mb-8"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl text-white/90 mb-10 max-w-3xl mx-auto"
          >
            Join thousands of patients and healthcare professionals using our platform for better health outcomes.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05, y: -8, boxShadow: "0 25px 50px -12px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBookingForm(true)}
            className="px-14 py-6 bg-white text-indigo-600 text-2xl font-black rounded-2xl cursor-pointer"
          >
            Create Free Account
          </motion.button>
        </motion.section>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between rounded-t-3xl">
                <h2 className="text-2xl font-black text-slate-900">Create Account</h2>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowBookingForm(false)}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 text-xl font-bold transition-colors"
                >
                  ✕
                </motion.button>
              </div>
              <div className="p-6">
                <PatientRegistrationPage
                  doctors={propDoctors}
                  setUsers={setUsers}
                  users={users}
                  embedded={true}
                />
              </div>
            </motion.div>
          </motion.section>
        )}
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900 text-white py-16 mt-24"
      >
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12 text-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl font-black mb-6"
          >
            🏥 MediCare+
          </motion.div>
          <p className="text-slate-400 text-lg mb-8">Your trusted healthcare partner</p>
          <p className="text-slate-500">© 2026 Online Medical System. All rights reserved.</p>
        </div>
      </motion.footer>
    </main>
  );
}

export default HomePage;
