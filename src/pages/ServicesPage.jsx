import { useNavigate } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';

function ServicesPage() {
  const navigate = useNavigate();

  const services = [
    {
      icon: '📅',
      title: 'Book Appointment',
      description: 'Schedule with doctors',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '🧪',
      title: 'Lab Tests',
      description: 'Book diagnostic tests',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '💊',
      title: 'Medicines',
      description: 'Order & delivery',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: '📱',
      title: 'Online Consultation',
      description: 'Video & chat support',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '📦',
      title: 'Health Packages',
      description: 'Full body checkups',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: '📋',
      title: 'Digital Prescription',
      description: 'Upload & download',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: '🗂️',
      title: 'Medical Records',
      description: 'Secure storage',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: '🚑',
      title: 'Emergency Ambulance',
      description: '24/7 emergency care',
      color: 'from-rose-500 to-rose-600'
    },
    {
      icon: '🩸',
      title: 'Blood Bank',
      description: 'Find blood nearby',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: '💉',
      title: 'Vaccination Booking',
      description: 'Schedule vaccines',
      color: 'from-orange-500 to-orange-600'
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      {/* Fixed Navigation */}
      <section className="sticky top-0 z-50 border-b border-indigo-200 bg-white/95 shadow-lg backdrop-blur-md">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-6 px-6 py-5 lg:px-8">
          <button onClick={() => navigate('/')} className="cursor-pointer">
            <BrandLogo />
          </button>
          <div className="flex items-center justify-end gap-4 md:gap-8">
            <button onClick={() => navigate('/')} className="rounded-lg px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">Home</button>
            <button onClick={() => navigate('/about')} className="rounded-lg px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">About</button>
            <button onClick={() => navigate('/services')} className="rounded-lg px-4 py-2 font-semibold text-white bg-blue-600 rounded-full">Services</button>
            <button onClick={() => navigate('/contact')} className="rounded-lg px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">Contact</button>
            <button onClick={() => navigate('/login')} className="rounded-lg px-4 py-2 font-semibold text-white bg-slate-900 transition hover:bg-slate-800">Sign In</button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-slate-600 max-w-5xl mx-auto">
            Comprehensive healthcare solutions designed to make medical services accessible and convenient for everyone
          </p>
        </section>

        {/* Services Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-6 text-center">
                {/* Icon */}
                <div className="text-4xl mb-3">{service.icon}</div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-lg text-slate-600 mb-4">
                  {service.description}
                </p>
                
                {/* Learn More Link */}
                <button className={`font-semibold bg-gradient-to-r ${service.color} text-white px-4 py-2 rounded-lg text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer`}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Info Section */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl px-8 py-10 text-white mb-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-3">✓</div>
                <p className="font-semibold text-lg mb-2">Professional Doctors</p>
                <p className="text-lg opacity-90">Get consultations from experienced medical professionals</p>
              </div>
              <div>
                <div className="text-4xl mb-3">✓</div>
                <p className="font-semibold text-lg mb-2">Secure & Private</p>
                <p className="text-lg opacity-90">Your medical data is encrypted and protected</p>
              </div>
              <div>
                <div className="text-4xl mb-3">✓</div>
                <p className="font-semibold text-lg mb-2">24/7 Support</p>
                <p className="text-lg opacity-90">We're here to help you anytime, anywhere</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ServicesPage;
