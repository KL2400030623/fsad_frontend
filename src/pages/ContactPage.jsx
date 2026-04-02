import { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'support@onlinemedicalsystem.com',
      detail: 'Response within 24 hours',
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: '+1 (555) 010-2026',
      detail: 'Mon-Fri: 8 AM - 8 PM',
    },
    {
      icon: '🏥',
      title: 'Head Office',
      description: '123 Health Avenue, Care City, CA 94000',
      detail: 'Walking-in hours: 8 AM - 6 PM',
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Available on website',
      detail: 'Average response: 2 minutes',
    },
  ];

  const faqItems = [
    {
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page and follow the email instructions. Usually resolved within 5 minutes.'
    },
    {
      question: 'Is my medical data secure?',
      answer: 'Yes. We use HIPAA-compliant encryption and regular security audits to protect your information.'
    },
    {
      question: 'Can I change my appointment time?',
      answer: 'Yes, you can reschedule up to 24 hours before your appointment through your Patient Portal.'
    },
    {
      question: 'How long does prescription verification take?',
      answer: 'Most prescriptions are verified within 1-2 business hours and sent to your pharmacy.'
    },
    {
      question: 'What if I have a medical emergency?',
      answer: 'For emergencies, please call 911 or visit your nearest emergency room immediately.'
    },
    {
      question: 'How often should I update my medical profile?',
      answer: 'We recommend updating after any major health changes, medications, or annually for routine checkups.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <section className="space-y-4 pt-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Contact Us</h1>
          <p className="text-lg text-slate-600 max-w-4xl">
            Have questions? We're here to help. Reach out through any of our convenient channels.
          </p>
        </section>

        {/* Contact Methods Grid */}
        <section className="grid md:grid-cols-4 gap-6">
          {contactMethods.map((method, idx) => (
            <div key={idx} className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-md hover:shadow-xl transition">
              <div className="text-4xl mb-4">{method.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{method.title}</h3>
              <p className="font-semibold text-slate-800 text-lg mb-1">{method.description}</p>
              <p className="text-slate-600 text-lg">{method.detail}</p>
            </div>
          ))}
        </section>

        {/* Contact Form Section */}
        <section className="grid md:grid-cols-2 gap-10 border-t border-slate-200 pt-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Send us a Message</h2>
            <div className="bg-white border-2 border-slate-200 rounded-xl p-6 shadow-md">
              {submitSuccess && (
                <div className="mb-6 bg-emerald-100 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-lg">
                  ✓ Thank you! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="account">Account Issues</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Office Location & Hours */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Office Hours</h3>
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="font-semibold text-slate-800">Monday - Friday</span>
                  <span className="text-slate-600">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                  <span className="font-semibold text-slate-800">Saturday</span>
                  <span className="text-slate-600">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800">Sunday</span>
                  <span className="text-slate-600">Closed</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Service Centers</h3>
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                <div>
                  <div className="font-bold text-slate-900">Main Headquarters</div>
                  <p className="text-slate-600 text-sm">123 Health Avenue, Care City, CA 94000</p>
                </div>
                <div>
                  <div className="font-bold text-slate-900">East Coast Office</div>
                  <p className="text-slate-600 text-sm">456 Medical Boulevard, Boston, MA 02101</p>
                </div>
                <div>
                  <div className="font-bold text-slate-900">Gulf Region Office</div>
                  <p className="text-slate-600 text-sm">789 Healthcare Street, Dubai, UAE</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-lg mb-2">Response Guarantee</h3>
              <p className="text-sm opacity-90">We respond to all inquiries within 24 hours, guaranteed.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-8 border-t border-slate-200 pt-12">
          <h2 className="text-4xl font-bold text-slate-900 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition">
                <h3 className="font-bold text-slate-900 mb-3 text-lg">{item.question}</h3>
                <p className="text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Social Media CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-12 text-white text-center space-y-6 border-t border-slate-200 pt-12">
          <h2 className="text-3xl font-bold">Follow Us for Updates</h2>
          <p className="text-lg opacity-90">Stay connected with the latest healthcare tips and platform updates</p>
          <div className="flex gap-4 justify-center text-2xl">
            <div>📘 Facebook</div>
            <div>🐦 Twitter</div>
            <div>📸 Instagram</div>
            <div>💼 LinkedIn</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactPage;
