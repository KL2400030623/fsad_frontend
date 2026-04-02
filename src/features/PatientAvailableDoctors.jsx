import { useState, useMemo } from 'react';
import Section from '../components/Section';

function PatientAvailableDoctors({ onBookDoctor }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const doctorAvailability = {
    'Dr. Maya Patel': {
      specialty: 'General Medicine',
      specialization: 'Internal Medicine & Primary Care',
      availability: ['Mon 9AM-5PM', 'Wed 9AM-5PM', 'Fri 9AM-5PM'],
      nextAvailable: '2026-02-21 09:00 AM',
      rating: 4.8,
      reviews: 127,
      experience: '12 years',
      treatsConditions: ['Fever', 'Cold & Flu', 'Diabetes', 'Hypertension', 'General Health'],
      languages: ['English', 'Hindi'],
      consultFee: 50,
    },
    'Dr. John Smith': {
      specialty: 'Cardiology',
      specialization: 'Heart & Cardiovascular Specialist',
      availability: ['Tue 10AM-6PM', 'Thu 10AM-6PM', 'Sat 9AM-1PM'],
      nextAvailable: '2026-02-22 10:00 AM',
      rating: 4.9,
      reviews: 203,
      experience: '15 years',
      treatsConditions: ['Heart Disease', 'Chest Pain', 'High Blood Pressure', 'Arrhythmia'],
      languages: ['English'],
      consultFee: 80,
    },
    'Dr. Sarah Johnson': {
      specialty: 'Pediatrics',
      specialization: 'Child & Adolescent Care',
      availability: ['Mon 8AM-4PM', 'Wed 8AM-4PM', 'Fri 8AM-4PM'],
      nextAvailable: '2026-02-21 08:00 AM',
      rating: 4.7,
      reviews: 156,
      experience: '10 years',
      treatsConditions: ['Child Illnesses', 'Vaccinations', 'Growth Issues', 'Allergies'],
      languages: ['English', 'Spanish'],
      consultFee: 60,
    },
    'Dr. Robert Chen': {
      specialty: 'Orthopedics',
      specialization: 'Bone, Joint & Muscle Specialist',
      availability: ['Mon 10AM-6PM', 'Thu 10AM-6PM'],
      nextAvailable: '2026-02-21 10:00 AM',
      rating: 4.8,
      reviews: 178,
      experience: '14 years',
      treatsConditions: ['Fractures', 'Back Pain', 'Sports Injuries', 'Arthritis'],
      languages: ['English', 'Mandarin'],
      consultFee: 75,
    },
    'Dr. Emily Williams': {
      specialty: 'Dermatology',
      specialization: 'Skin, Hair & Nail Specialist',
      availability: ['Tue 9AM-5PM', 'Fri 9AM-5PM'],
      nextAvailable: '2026-02-22 09:00 AM',
      rating: 4.9,
      reviews: 234,
      experience: '11 years',
      treatsConditions: ['Acne', 'Eczema', 'Skin Cancer', 'Hair Loss', 'Psoriasis'],
      languages: ['English', 'French'],
      consultFee: 70,
    },
    'Dr. Michael Brown': {
      specialty: 'Neurology',
      specialization: 'Brain & Nervous System Specialist',
      availability: ['Wed 10AM-6PM', 'Sat 10AM-2PM'],
      nextAvailable: '2026-02-22 10:00 AM',
      rating: 4.8,
      reviews: 145,
      experience: '16 years',
      treatsConditions: ['Headaches', 'Seizures', 'Stroke', 'Parkinson\'s', 'Memory Issues'],
      languages: ['English'],
      consultFee: 90,
    },
    'Dr. Lisa Anderson': {
      specialty: 'Psychiatry',
      specialization: 'Mental Health Specialist',
      availability: ['Mon 9AM-7PM', 'Thu 9AM-7PM'],
      nextAvailable: '2026-02-21 09:00 AM',
      rating: 4.7,
      reviews: 189,
      experience: '13 years',
      treatsConditions: ['Depression', 'Anxiety', 'PTSD', 'Bipolar Disorder', 'Stress'],
      languages: ['English', 'Spanish'],
      consultFee: 85,
    },
    'Dr. David Lee': {
      specialty: 'Gastroenterology',
      specialization: 'Digestive System Specialist',
      availability: ['Tue 8AM-4PM', 'Fri 8AM-4PM'],
      nextAvailable: '2026-02-22 08:00 AM',
      rating: 4.8,
      reviews: 167,
      experience: '12 years',
      treatsConditions: ['IBS', 'Acid Reflux', 'Liver Disease', 'Ulcers', 'Colitis'],
      languages: ['English', 'Korean'],
      consultFee: 75,
    },
  };

  // Get unique specialties
  const specialties = useMemo(() => {
    const specs = new Set(Object.values(doctorAvailability).map(d => d.specialty));
    return ['all', ...Array.from(specs).sort()];
  }, []);

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    let doctors = Object.entries(doctorAvailability);

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      doctors = doctors.filter(([name, info]) => 
        name.toLowerCase().includes(query) ||
        info.specialty.toLowerCase().includes(query) ||
        info.specialization.toLowerCase().includes(query) ||
        info.treatsConditions.some(c => c.toLowerCase().includes(query))
      );
    }

    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      doctors = doctors.filter(([_, info]) => info.specialty === selectedSpecialty);
    }

    // Sort
    if (sortBy === 'rating') {
      doctors.sort((a, b) => b[1].rating - a[1].rating);
    } else if (sortBy === 'experience') {
      doctors.sort((a, b) => parseInt(b[1].experience) - parseInt(a[1].experience));
    } else if (sortBy === 'fee') {
      doctors.sort((a, b) => a[1].consultFee - b[1].consultFee);
    } else if (sortBy === 'available') {
      doctors.sort((a, b) => new Date(a[1].nextAvailable) - new Date(b[1].nextAvailable));
    }

    return doctors;
  }, [searchQuery, selectedSpecialty, sortBy]);

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <Section title={<span className="flex items-center gap-3"><span className="text-5xl">🔍</span> Find a Doctor</span>}>
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, specialty, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border-2 border-slate-300 px-5 py-4 pl-12 text-lg focus:border-emerald-500 focus:outline-none transition-colors"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              >
                {specialties.map(spec => (
                  <option key={spec} value={spec}>
                    {spec === 'all' ? '🏥 All Specialties' : spec}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border-2 border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none"
              >
                <option value="rating">⭐ Highest Rating</option>
                <option value="experience">📚 Most Experience</option>
                <option value="fee">💰 Lowest Fee</option>
                <option value="available">⏰ Soonest Available</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-slate-600">
            Showing <strong>{filteredDoctors.length}</strong> doctor{filteredDoctors.length !== 1 ? 's' : ''}
            {selectedSpecialty !== 'all' && <> in <strong>{selectedSpecialty}</strong></>}
            {searchQuery && <> matching "<strong>{searchQuery}</strong>"</>}
          </p>
        </div>
      </Section>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredDoctors.map(([doctorName, info]) => (
          <div
            key={doctorName}
            className="rounded-2xl border-2 border-slate-200 bg-white p-6 hover:shadow-xl hover:border-emerald-300 transition-all"
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {doctorName.split(' ')[1]?.charAt(0) || 'D'}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-slate-900">{doctorName}</h4>
                <p className="text-emerald-600 font-semibold">{info.specialty}</p>
                <p className="text-sm text-slate-600">{info.specialization}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  ⭐ {info.rating}
                </div>
                <p className="text-xs text-slate-500">({info.reviews} reviews)</p>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <p className="text-slate-500 text-xs">Experience</p>
                <p className="font-bold text-slate-900">{info.experience}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <p className="text-slate-500 text-xs">Consult Fee</p>
                <p className="font-bold text-emerald-600">${info.consultFee}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <p className="text-slate-500 text-xs">Languages</p>
                <p className="font-bold text-slate-900 text-xs">{info.languages.join(', ')}</p>
              </div>
            </div>

            {/* Conditions */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-700 mb-2">Treats:</p>
              <div className="flex flex-wrap gap-1">
                {info.treatsConditions.slice(0, 4).map((condition, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-emerald-50 text-xs text-emerald-700 px-2 py-1 rounded-full font-medium"
                  >
                    {condition}
                  </span>
                ))}
                {info.treatsConditions.length > 4 && (
                  <span className="text-xs text-slate-500">+{info.treatsConditions.length - 4} more</span>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-4 pt-3 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-700 mb-2">Available:</p>
              <div className="flex flex-wrap gap-1">
                {info.availability.map((slot, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-blue-50 text-xs text-blue-700 px-2 py-1 rounded font-medium"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <p className="text-sm font-medium text-emerald-600">
                ⏰ Next: {info.nextAvailable}
              </p>
              <button
                onClick={() => onBookDoctor && onBookDoctor(doctorName)}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-2xl">
          <span className="text-6xl mb-4 block">🔍</span>
          <p className="text-xl font-semibold text-slate-700">No doctors found</p>
          <p className="text-slate-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

export default PatientAvailableDoctors;
