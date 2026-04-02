import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LabTestsPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedTests, setBookedTests] = useState(new Set());

  // Simulate API call on page load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const labTests = [
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      description: 'Measures red blood cells, white blood cells, and platelets',
      price: 499,
      icon: '🩸'
    },
    {
      id: 2,
      name: 'Thyroid Profile',
      description: 'TSH, T3, T4 levels for thyroid function assessment',
      price: 799,
      icon: '⚕️'
    },
    {
      id: 3,
      name: 'Diabetes Package',
      description: 'Fasting glucose, HbA1c, and glucose tolerance test',
      price: 699,
      icon: '🧬'
    },
    {
      id: 4,
      name: 'Vitamin D Test',
      description: 'Measures 25-hydroxy vitamin D levels',
      price: 999,
      icon: '☀️'
    },
    {
      id: 5,
      name: 'Lipid Profile',
      description: 'Total cholesterol, HDL, LDL, and triglycerides',
      price: 549,
      icon: '❤️'
    },
    {
      id: 6,
      name: 'Liver Function Test',
      description: 'AST, ALT, bilirubin, and albumin levels',
      price: 649,
      icon: '🫒'
    },
    {
      id: 7,
      name: 'Kidney Function Test',
      description: 'Creatinine, BUN, and electrolytes assessment',
      price: 599,
      icon: '💧'
    },
    {
      id: 8,
      name: 'COVID-19 RT-PCR Test',
      description: 'Rapid polymerase chain reaction test for COVID detection',
      price: 399,
      icon: '🦠'
    }
  ];

  const handleBookNow = (testId, testName) => {
    setBookedTests(prev => new Set(prev).add(testId));
    setTimeout(() => {
      alert(`✅ Lab Test "${testName}" Booked Successfully!\n\nYour appointment will be confirmed shortly.`);
      setBookedTests(prev => {
        const newSet = new Set(prev);
        newSet.delete(testId);
        return newSet;
      });
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
            </div>
          </div>
          <p className="mt-4 text-slate-300 font-semibold">Loading Lab Tests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-sm font-medium"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold mb-2 text-blue-400">Available Lab Tests</h1>
          <p className="text-slate-300">Book your health tests online at affordable prices</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search lab tests (e.g., Blood, Thyroid, Diabetes)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <span className="absolute right-4 top-3 text-xl">🔍</span>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {labTests.map((test) => (
            <div
              key={test.id}
              className="group rounded-lg border border-slate-700 bg-slate-800 p-5 shadow-lg hover:shadow-xl hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer hover:bg-slate-750"
            >
              {/* Icon */}
              <div className="text-4xl mb-3">{test.icon}</div>

              {/* Test Name */}
              <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">{test.name}</h3>

              {/* Description */}
              <p className="text-sm text-slate-300 mb-4 line-clamp-2">{test.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-blue-400">₹{test.price}</span>
                <span className="text-xs text-slate-400">per test</span>
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => handleBookNow(test.id, test.name)}
                disabled={bookedTests.has(test.id)}
                className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 ${
                  bookedTests.has(test.id)
                    ? 'bg-emerald-600 text-white cursor-wait'
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/50'
                }`}
              >
                {bookedTests.has(test.id) ? '⏳ Booking...' : '📅 Book Now'}
              </button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 rounded-lg bg-blue-900/20 border border-blue-700/30 p-6">
          <h3 className="font-bold text-lg text-blue-300 mb-3">ℹ️ How It Works</h3>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li>✓ Select your lab test and click "Book Now"</li>
            <li>✓ You'll receive a confirmation with test details</li>
            <li>✓ Visit our lab at your scheduled time</li>
            <li>✓ Get reports within 24-48 hours</li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="mt-6 text-center text-slate-400 text-sm">
          <p>Need help? <span className="text-blue-400 cursor-pointer hover:underline">Contact Support</span></p>
        </div>
      </div>
    </div>
  );
}

export default LabTestsPage;
