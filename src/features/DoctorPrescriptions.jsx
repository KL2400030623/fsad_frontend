import { useState } from 'react';
import Section from '../components/Section';
import StatusPill from '../components/StatusPill';
import { medicationPricing } from '../constants/data';

function DoctorPrescriptions({
  createPrescription,
  newPrescription,
  setNewPrescription,
  patients,
  prescriptionSuccessMessage,
}) {
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPrescription(e);
    setShowPreview(false);
  };

  const calculateCost = () => {
    const medication = newPrescription.medication;
    const quantity = parseFloat(newPrescription.quantity) || 0;
    const pricing = medicationPricing[medication];
    if (pricing && quantity > 0) {
      return (pricing.unitPrice * quantity).toFixed(2);
    }
    return '0.00';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Prescription Creation</h2>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      {prescriptionSuccessMessage && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {prescriptionSuccessMessage}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Create New Prescription">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Patient
              </label>
              <select
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                value={newPrescription.patient}
                onChange={(e) => setNewPrescription(prev => ({ ...prev, patient: e.target.value }))}
                required
              >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient} value={patient}>
                    {patient}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Diagnosis
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Enter diagnosis..."
                value={newPrescription.diagnosis}
                onChange={(e) => setNewPrescription(prev => ({ ...prev, diagnosis: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Medication
              </label>
              <select
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                value={newPrescription.medication}
                onChange={(e) => setNewPrescription(prev => ({ ...prev, medication: e.target.value }))}
                required
              >
                <option value="">Select Medication</option>
                {Object.keys(medicationPricing).map((med) => (
                  <option key={med} value={med}>
                    {med} (${medicationPricing[med].unitPrice}/{medicationPricing[med].unit})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Dosage
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="e.g., 1 tablet daily"
                  value={newPrescription.dosage}
                  onChange={(e) => setNewPrescription(prev => ({ ...prev, dosage: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={newPrescription.quantity}
                  onChange={(e) => setNewPrescription(prev => ({ ...prev, quantity: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Instructions
              </label>
              <textarea
                rows="3"
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Enter medication instructions..."
                value={newPrescription.instructions}
                onChange={(e) => setNewPrescription(prev => ({ ...prev, instructions: e.target.value }))}
                required
              />
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-sm text-slate-600">
                <span className="font-semibold">Estimated Cost:</span> ${calculateCost()}
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Create Prescription
            </button>
          </form>
        </Section>

        {showPreview && (
          <Section title="Prescription Preview">
            <div className="rounded-lg border border-slate-200 p-4 bg-white">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Prescription Preview</h3>
                <p className="text-sm text-slate-600">Review before saving</p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500">Patient</p>
                  <p className="font-medium">{newPrescription.patient || 'Not selected'}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Diagnosis</p>
                  <p className="font-medium">{newPrescription.diagnosis || 'Not specified'}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Medication</p>
                  <p className="font-medium">{newPrescription.medication || 'Not selected'}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Dosage</p>
                    <p className="font-medium">{newPrescription.dosage || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Quantity</p>
                    <p className="font-medium">{newPrescription.quantity || 'Not specified'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Instructions</p>
                  <p className="font-medium">{newPrescription.instructions || 'Not specified'}</p>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <p className="text-sm text-slate-500">Total Cost</p>
                  <p className="text-xl font-bold text-emerald-600">${calculateCost()}</p>
                </div>
              </div>
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

export default DoctorPrescriptions;