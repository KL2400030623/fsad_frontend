import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { medicationPricing } from '../constants/data';

export default function MedicinesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const medicines = Object.entries(medicationPricing).map(([name, details]) => ({
    id: name,
    name,
    ...details,
  }));

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (medicine) => {
    const existingItem = cart.find((item) => item.id === medicine.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (medicineId) => {
    setCart(cart.filter((item) => item.id !== medicineId));
  };

  const handleQuantityChange = (medicineId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(medicineId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === medicineId ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="text-white font-bold hover:text-amber-400 transition"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-white">Available Medicines</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative px-6 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition"
          >
            🛒 Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 border border-slate-700 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Medicines List */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredMedicines.length > 0 ? (
                  filteredMedicines.map((medicine) => (
                    <div
                      key={medicine.id}
                      className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-amber-500 transition shadow-lg"
                    >
                      <div className="text-3xl mb-3">💊</div>
                      <h3 className="text-lg font-bold text-white mb-2">{medicine.name}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-amber-400 font-bold text-xl">₹{medicine.unitPrice.toFixed(2)}</p>
                        <p className="text-slate-400 text-sm">{medicine.unit}</p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(medicine)}
                        className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-slate-400 text-lg">No medicines found matching "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Cart Sidebar */}
            {showCart && (
              <aside className="lg:col-span-1">
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 sticky top-24 shadow-lg">
                  <h2 className="text-xl font-bold text-white mb-6">Shopping Cart</h2>

                  {cart.length > 0 ? (
                    <>
                      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.id} className="border-b border-slate-700 pb-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-white font-semibold text-sm">{item.name}</h3>
                              <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="text-red-500 hover:text-red-400 text-sm font-bold"
                              >
                                ✕
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="px-2 py-1 bg-slate-700 text-white rounded hover:bg-slate-600"
                                >
                                  -
                                </button>
                                <span className="text-white font-semibold px-3">{item.quantity}</span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="px-2 py-1 bg-slate-700 text-white rounded hover:bg-slate-600"
                                >
                                  +
                                </button>
                              </div>
                              <p className="text-amber-400 font-bold">₹{(item.unitPrice * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-slate-700 pt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-slate-300 font-semibold">Subtotal:</p>
                          <p className="text-white font-bold">₹{cartTotal.toFixed(2)}</p>
                        </div>
                        <button className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition">
                          Proceed to Checkout
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-slate-400 text-center py-8">Your cart is empty</p>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
