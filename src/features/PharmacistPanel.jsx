import { useState, useMemo } from 'react';
import Section from '../components/Section';
import StatusPill from '../components/StatusPill';
import { useNavigate } from 'react-router-dom';

function PharmacistPanel({ prescriptions, pharmacistNotes, setPharmacistNotes, markDispensed }) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  const pendingPrescriptions = prescriptions.filter((item) => item.status === 'Pending Fulfillment');
  const dispensedPrescriptions = prescriptions.filter((item) => item.status === 'Dispensed');

  const totalRevenue = prescriptions
    .filter((item) => item.status === 'Dispensed')
    .reduce((sum, item) => sum + (item.totalCost || 0), 0);

  const pendingRevenue = prescriptions
    .filter((item) => item.status === 'Pending Fulfillment')
    .reduce((sum, item) => sum + (item.totalCost || 0), 0);

  // Inventory data with stock levels
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Amlodipine 5mg', category: 'Cardiovascular', stock: 250, minStock: 50, unitPrice: 2.50, expiryDate: '2027-06-15' },
    { id: 2, name: 'Amlodipine 10mg', category: 'Cardiovascular', stock: 180, minStock: 50, unitPrice: 3.00, expiryDate: '2027-08-20' },
    { id: 3, name: 'Metformin 500mg', category: 'Antidiabetic', stock: 45, minStock: 100, unitPrice: 1.80, expiryDate: '2027-04-10' },
    { id: 4, name: 'Metformin 850mg', category: 'Antidiabetic', stock: 120, minStock: 80, unitPrice: 2.20, expiryDate: '2027-05-25' },
    { id: 5, name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 320, minStock: 100, unitPrice: 1.50, expiryDate: '2027-12-01' },
    { id: 6, name: 'Lisinopril 10mg', category: 'Cardiovascular', stock: 15, minStock: 60, unitPrice: 2.80, expiryDate: '2027-03-15' },
    { id: 7, name: 'Lisinopril 20mg', category: 'Cardiovascular', stock: 90, minStock: 50, unitPrice: 3.50, expiryDate: '2027-07-22' },
    { id: 8, name: 'Atorvastatin 20mg', category: 'Cholesterol', stock: 200, minStock: 75, unitPrice: 4.00, expiryDate: '2027-09-30' },
    { id: 9, name: 'Omeprazole 20mg', category: 'Gastrointestinal', stock: 30, minStock: 100, unitPrice: 2.00, expiryDate: '2026-12-15' },
    { id: 10, name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 150, minStock: 80, unitPrice: 3.50, expiryDate: '2026-08-10' },
    { id: 11, name: 'Ibuprofen 400mg', category: 'Pain Relief', stock: 400, minStock: 150, unitPrice: 0.80, expiryDate: '2028-01-20' },
    { id: 12, name: 'Paracetamol 500mg', category: 'Pain Relief', stock: 500, minStock: 200, unitPrice: 0.50, expiryDate: '2028-03-15' },
  ]);

  // Drug interactions database
  const drugInteractions = {
    'Amlodipine': [
      { drug: 'Simvastatin', severity: 'high', effect: 'Increased risk of muscle damage (rhabdomyolysis)' },
      { drug: 'Grapefruit Juice', severity: 'moderate', effect: 'Increased amlodipine levels, causing dizziness' },
    ],
    'Metformin': [
      { drug: 'Alcohol', severity: 'high', effect: 'Increased risk of lactic acidosis' },
      { drug: 'Contrast Dye', severity: 'high', effect: 'Kidney damage risk - stop 48hrs before imaging' },
    ],
    'Lisinopril': [
      { drug: 'Potassium Supplements', severity: 'high', effect: 'Dangerous hyperkalemia (high potassium)' },
      { drug: 'NSAIDs (Ibuprofen)', severity: 'moderate', effect: 'Reduced blood pressure lowering effect' },
    ],
    'Atorvastatin': [
      { drug: 'Grapefruit Juice', severity: 'moderate', effect: 'Increased statin levels, muscle pain risk' },
      { drug: 'Cyclosporine', severity: 'high', effect: 'Severe muscle damage risk' },
    ],
    'Omeprazole': [
      { drug: 'Clopidogrel', severity: 'high', effect: 'Reduced antiplatelet effect, stroke/heart attack risk' },
      { drug: 'Methotrexate', severity: 'moderate', effect: 'Increased methotrexate toxicity' },
    ],
    'Amoxicillin': [
      { drug: 'Warfarin', severity: 'moderate', effect: 'Increased bleeding risk' },
      { drug: 'Methotrexate', severity: 'moderate', effect: 'Increased methotrexate toxicity' },
    ],
  };

  // Low stock alerts
  const lowStockItems = inventory.filter(item => item.stock < item.minStock);
  
  // Expiring soon (within 6 months)
  const expiringItems = inventory.filter(item => {
    const expiry = new Date(item.expiryDate);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    return expiry <= sixMonthsFromNow;
  });

  // Check for drug interactions in a prescription
  const checkInteractions = (medication) => {
    const drugName = medication.split(' ')[0]; // Get base drug name
    return drugInteractions[drugName] || [];
  };

  // Filter inventory based on search
  const filteredInventory = useMemo(() => {
    if (!searchQuery) return inventory;
    const query = searchQuery.toLowerCase();
    return inventory.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query)
    );
  }, [inventory, searchQuery]);

  // Update stock
  const updateStock = (id, newStock) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, stock: Math.max(0, newStock) } : item
    ));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Pharmacist Sidebar */}
      <aside className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-lg h-fit">
        <div className="text-center mb-6 pb-6 border-b border-slate-200">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mx-auto mb-3 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            💊
          </div>
          <h3 className="font-bold text-xl text-slate-900">Pharmacy Portal</h3>
          <p className="text-sm text-slate-500">Pharm. Lena Kim</p>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`w-full text-left rounded-xl px-4 py-3 text-base font-medium transition ${
              activeSection === 'dashboard'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveSection('prescriptions')}
            className={`w-full text-left rounded-xl px-4 py-3 text-base font-medium transition relative ${
              activeSection === 'prescriptions'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📋 Prescriptions
            {pendingPrescriptions.length > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                {pendingPrescriptions.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSection('inventory')}
            className={`w-full text-left rounded-xl px-4 py-3 text-base font-medium transition relative ${
              activeSection === 'inventory'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📦 Inventory
            {lowStockItems.length > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                {lowStockItems.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSection('interactions')}
            className={`w-full text-left rounded-xl px-4 py-3 text-base font-medium transition ${
              activeSection === 'interactions'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            ⚠️ Drug Interactions
          </button>
          <button
            onClick={() => setActiveSection('info')}
            className={`w-full text-left rounded-xl px-4 py-3 text-base font-medium transition ${
              activeSection === 'info'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📚 Drug Information
          </button>
        </nav>
      </aside>

      {/* Pharmacist Content */}
      <main className="space-y-6">
        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 text-white shadow-lg">
                <p className="text-3xl font-black">{pendingPrescriptions.length}</p>
                <p className="text-blue-100">Pending Orders</p>
                <p className="text-blue-200 text-sm">${pendingRevenue.toFixed(2)}</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 text-white shadow-lg">
                <p className="text-3xl font-black">{dispensedPrescriptions.length}</p>
                <p className="text-emerald-100">Dispensed</p>
                <p className="text-emerald-200 text-sm">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-5 text-white shadow-lg">
                <p className="text-3xl font-black">{lowStockItems.length}</p>
                <p className="text-amber-100">Low Stock Alerts</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 p-5 text-white shadow-lg">
                <p className="text-3xl font-black">{expiringItems.length}</p>
                <p className="text-red-100">Expiring Soon</p>
              </div>
            </div>

            {/* Alerts */}
            {(lowStockItems.length > 0 || expiringItems.length > 0) && (
              <div className="grid gap-4 md:grid-cols-2">
                {lowStockItems.length > 0 && (
                  <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5">
                    <h3 className="font-bold text-lg text-amber-800 mb-3">⚠️ Low Stock Alert</h3>
                    <div className="space-y-2">
                      {lowStockItems.slice(0, 3).map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-white rounded-lg p-3 border border-amber-200">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-red-600 font-bold">{item.stock} left</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {expiringItems.length > 0 && (
                  <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-5">
                    <h3 className="font-bold text-lg text-red-800 mb-3">🕐 Expiring Soon</h3>
                    <div className="space-y-2">
                      {expiringItems.slice(0, 3).map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-white rounded-lg p-3 border border-red-200">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-red-600 font-bold">{item.expiryDate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => setActiveSection('prescriptions')}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg"
              >
                📋 Process Prescriptions
              </button>
              <button
                onClick={() => setActiveSection('inventory')}
                className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition shadow-lg"
              >
                📦 Manage Inventory
              </button>
              <button
                onClick={() => navigate('/medicines')}
                className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition shadow-lg"
              >
                💊 Medicine Catalog
              </button>
            </div>
          </div>
        )}

        {/* Prescriptions Section */}
        {activeSection === 'prescriptions' && (
          <Section title={<span className="flex items-center gap-3"><span className="text-4xl">📋</span> E-Prescriptions Queue</span>}>
            <div className="space-y-4">
              {prescriptions.length === 0 && (
                <p className="text-lg text-slate-500 text-center py-8">No prescriptions to display</p>
              )}
              {prescriptions.map((item) => {
                const interactions = checkInteractions(item.medication);
                return (
                  <div key={item.id} className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-bold text-2xl text-slate-900">{item.patient}</p>
                        <p className="text-slate-600">Age: {item.patientAge || 'N/A'} | Contact: {item.patientContact || 'N/A'}</p>
                        <p className="text-slate-500">Prescribed by: {item.doctor} on {item.date}</p>
                      </div>
                      <StatusPill value={item.status} />
                    </div>

                    {/* Drug Interaction Warning */}
                    {interactions.length > 0 && (
                      <div className="mb-4 rounded-xl bg-red-50 border-2 border-red-200 p-4">
                        <p className="font-bold text-red-700 mb-2">⚠️ Drug Interaction Alerts:</p>
                        {interactions.map((interaction, idx) => (
                          <div key={idx} className={`text-sm p-2 rounded mb-1 ${
                            interaction.severity === 'high' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            <strong>{interaction.drug}:</strong> {interaction.effect}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Medication Details */}
                    <div className="rounded-xl bg-slate-50 p-4 mb-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">Medication</p>
                          <p className="font-bold text-lg text-slate-900">{item.medication}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">Dosage</p>
                          <p className="font-bold text-lg text-slate-900">{item.dosage}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">Quantity</p>
                          <p className="font-bold text-lg text-slate-900">{item.quantity || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-semibold">Total Cost</p>
                          <p className="font-bold text-2xl text-emerald-600">${(item.totalCost || 0).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-xs text-slate-500 font-semibold">Instructions</p>
                        <p className="text-slate-700">{item.instructions}</p>
                      </div>
                    </div>

                    {/* Pharmacist Notes */}
                    <textarea
                      className="w-full rounded-xl border-2 border-slate-300 px-4 py-3 text-base focus:border-amber-500 focus:outline-none"
                      rows="2"
                      placeholder="Add medication counseling notes or special instructions..."
                      value={pharmacistNotes[item.id] ?? item.pharmacistNote}
                      onChange={(event) =>
                        setPharmacistNotes((current) => ({
                          ...current,
                          [item.id]: event.target.value,
                        }))
                      }
                    />
                    
                    {item.status !== 'Dispensed' && (
                      <button
                        type="button"
                        className="mt-4 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-lg font-bold text-white hover:shadow-lg hover:shadow-emerald-500/30 transition"
                        onClick={() => markDispensed(item.id)}
                      >
                        ✓ Mark as Dispensed
                      </button>
                    )}

                    {item.status === 'Dispensed' && item.pharmacistNote && (
                      <div className="mt-4 rounded-xl bg-emerald-50 border-2 border-emerald-200 p-4">
                        <p className="text-sm font-bold text-emerald-700">✓ Dispensing Notes:</p>
                        <p className="text-emerald-900">{item.pharmacistNote}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* Inventory Section */}
        {activeSection === 'inventory' && (
          <div className="space-y-6">
            <Section title={<span className="flex items-center gap-3"><span className="text-4xl">📦</span> Inventory Management</span>}>
              {/* Search */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search medications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full max-w-md rounded-xl border-2 border-slate-300 px-5 py-3 text-lg focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Inventory Table */}
              <div className="overflow-x-auto rounded-xl border-2 border-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-slate-700">Medication</th>
                      <th className="px-4 py-3 text-left font-bold text-slate-700">Category</th>
                      <th className="px-4 py-3 text-center font-bold text-slate-700">Stock</th>
                      <th className="px-4 py-3 text-center font-bold text-slate-700">Min Stock</th>
                      <th className="px-4 py-3 text-center font-bold text-slate-700">Status</th>
                      <th className="px-4 py-3 text-center font-bold text-slate-700">Price</th>
                      <th className="px-4 py-3 text-center font-bold text-slate-700">Expiry</th>
                      <th className="px-4 py-3 text-center font-bold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="border-t border-slate-200 hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold">{item.name}</td>
                        <td className="px-4 py-3 text-slate-600">{item.category}</td>
                        <td className="px-4 py-3 text-center">
                          <input
                            type="number"
                            value={item.stock}
                            onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                            className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-center font-bold"
                          />
                        </td>
                        <td className="px-4 py-3 text-center text-slate-600">{item.minStock}</td>
                        <td className="px-4 py-3 text-center">
                          {item.stock < item.minStock ? (
                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-sm">Low Stock!</span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">In Stock</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center font-semibold">${item.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`${new Date(item.expiryDate) <= new Date(Date.now() + 180*24*60*60*1000) ? 'text-red-600 font-bold' : 'text-slate-600'}`}>
                            {item.expiryDate}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => updateStock(item.id, item.stock + 50)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                          >
                            +50
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          </div>
        )}

        {/* Drug Interactions Section */}
        {activeSection === 'interactions' && (
          <Section title={<span className="flex items-center gap-3"><span className="text-4xl">⚠️</span> Drug Interaction Database</span>}>
            <div className="space-y-4">
              <p className="text-slate-600 mb-4">Reference guide for common drug interactions. Always verify with clinical resources.</p>
              {Object.entries(drugInteractions).map(([drug, interactions]) => (
                <div key={drug} className="rounded-2xl border-2 border-slate-200 p-5">
                  <h3 className="font-bold text-xl text-slate-900 mb-3">💊 {drug}</h3>
                  <div className="space-y-2">
                    {interactions.map((interaction, idx) => (
                      <div 
                        key={idx} 
                        className={`rounded-xl p-4 ${
                          interaction.severity === 'high' 
                            ? 'bg-red-50 border-2 border-red-200' 
                            : 'bg-amber-50 border-2 border-amber-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            interaction.severity === 'high' ? 'bg-red-600 text-white' : 'bg-amber-600 text-white'
                          }`}>
                            {interaction.severity.toUpperCase()}
                          </span>
                          <span className="font-bold text-slate-900">Interacts with: {interaction.drug}</span>
                        </div>
                        <p className="text-slate-700">{interaction.effect}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Drug Information Section */}
        {activeSection === 'info' && (
          <Section title={<span className="flex items-center gap-3"><span className="text-4xl">📚</span> Medication Information</span>}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border-2 border-slate-200 p-5 bg-white">
                <p className="font-bold text-xl text-slate-900 mb-2">💊 Amlodipine (Calcium Channel Blocker)</p>
                <p className="text-slate-600 mb-3">Use: Hypertension control. Counsel on dizziness and regular blood pressure checks.</p>
                <p className="text-sm text-slate-500">Price: $2.50-$3.00 per tablet</p>
              </div>
              <div className="rounded-xl border-2 border-slate-200 p-5 bg-white">
                <p className="font-bold text-xl text-slate-900 mb-2">💊 Cetirizine (Antihistamine)</p>
                <p className="text-slate-600 mb-3">Use: Allergy relief. Usually once daily, may cause mild drowsiness.</p>
                <p className="text-sm text-slate-500">Price: $1.50 per tablet</p>
              </div>
              <div className="rounded-xl border-2 border-slate-200 p-5 bg-white">
                <p className="font-bold text-xl text-slate-900 mb-2">💊 Metformin (Antidiabetic)</p>
                <p className="text-slate-600 mb-3">Use: Blood glucose control. Take with meals and monitor GI side effects.</p>
                <p className="text-sm text-slate-500">Price: $1.80-$2.20 per tablet</p>
              </div>
              <div className="rounded-xl border-2 border-slate-200 p-5 bg-white">
                <p className="font-bold text-xl text-slate-900 mb-2">💊 Lisinopril (ACE Inhibitor)</p>
                <p className="text-slate-600 mb-3">Use: Hypertension and heart failure management. Monitor for dry cough.</p>
                <p className="text-sm text-slate-500">Price: $2.80-$3.50 per tablet</p>
              </div>
              <div className="rounded-xl border-2 border-slate-200 p-5 bg-white">
                <p className="font-bold text-xl text-slate-900 mb-2">💊 Atorvastatin (Statin)</p>
                <p className="text-slate-600 mb-3">Use: Cholesterol management. Take at bedtime, monitor liver function.</p>
                <p className="text-sm text-slate-500">Price: $4.00 per tablet</p>
              </div>
              <div className="rounded-xl border-2 border-slate-200 p-5 bg-white">
                <p className="font-bold text-xl text-slate-900 mb-2">💊 Omeprazole (PPI)</p>
                <p className="text-slate-600 mb-3">Use: Acid reflux, GERD. Take 30 min before meals for best effect.</p>
                <p className="text-sm text-slate-500">Price: $2.00 per capsule</p>
              </div>
            </div>
          </Section>
        )}
      </main>
    </div>
  );
}

export default PharmacistPanel;