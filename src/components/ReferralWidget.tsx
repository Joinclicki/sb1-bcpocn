import React, { useState } from 'react';
import { X, DollarSign, Gift } from 'lucide-react';
import ThankYouModal from './ThankYouModal';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  referralFirstName: string;
  referralLastName: string;
  referralPhone: string;
}

const INITIAL_FORM_DATA: FormData = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  referralFirstName: '',
  referralLastName: '',
  referralPhone: '',
};

export default function ReferralWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First webhook
      await fetch('YOUR_FIRST_WEBHOOK_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Wait 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Second webhook
      await fetch('YOUR_SECOND_WEBHOOK_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Reset form and show thank you
      setFormData(INITIAL_FORM_DATA);
      setIsSubmitting(false);
      setIsOpen(false);
      setShowThankYou(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isOpen) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 bg-indigo-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <Gift className="w-5 h-5" />
          Refer & Earn
        </button>
        {showThankYou && (
          <ThankYouModal onClose={() => setShowThankYou(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <div className="fixed bottom-4 left-4 w-[380px] bg-white rounded-lg shadow-xl">
        <div className="p-4 border-b relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold mb-1">Refer a business to Clicki Referrals! 👋</h2>
          <div className="aspect-video bg-gray-100 rounded-lg mb-4">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/your-video-id"
              title="Clicki Referrals | Affiliate Program"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <DollarSign className="w-5 h-5" />
              Earn rewards!
            </div>
            <p className="text-green-700">Earn $25 per referral</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">What's your name?</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">What's your phone number?</label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="(555) 555-5555"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="block w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Who are you referring?</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="referralFirstName"
                placeholder="First name"
                value={formData.referralFirstName}
                onChange={handleInputChange}
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400"
                required
              />
              <input
                type="text"
                name="referralLastName"
                placeholder="Last name"
                value={formData.referralLastName}
                onChange={handleInputChange}
                className="block w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">What's their number?</label>
            <input
              type="tel"
              name="referralPhone"
              placeholder="(555) 555-5555"
              value={formData.referralPhone}
              onChange={handleInputChange}
              className="block w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 placeholder:text-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Gift className="w-4 h-4" />
                Send Referral
              </>
            )}
          </button>
        </form>
        
        <div className="p-2 text-center text-xs text-gray-500 border-t">
          Get more referrals with Clicki ✨
        </div>
      </div>
      {showThankYou && (
        <ThankYouModal onClose={() => setShowThankYou(false)} />
      )}
    </>
  );
}