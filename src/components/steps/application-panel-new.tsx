'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApplicationFlow } from '@/lib/application-flow';
import { IconX, IconChevronLeft, IconUpload, IconCheck } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

// Countries data
const countries = [
  { name: "United States", code: "US", flag: "🇺🇸", special: false },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", special: false },
  { name: "Australia", code: "AU", flag: "🇦🇺", special: false },
  { name: "Canada", code: "CA", flag: "🇨🇦", special: false },
  { name: "Germany", code: "DE", flag: "🇩🇪", special: false },
  { name: "France", code: "FR", flag: "🇫🇷", special: false },
  { name: "Italy", code: "IT", flag: "🇮🇹", special: false },
  { name: "Japan", code: "JP", flag: "🇯🇵", special: false },
  { name: "South Korea", code: "KR", flag: "🇰🇷", special: false },
  { name: "India", code: "IN", flag: "🇮🇳", special: false },
  { name: "Singapore", code: "SG", flag: "🇸🇬", special: false },
  { name: "Malaysia", code: "MY", flag: "🇲🇾", special: false },
  { name: "Thailand", code: "TH", flag: "🇹🇭", special: false },
  { name: "Vietnam", code: "VN", flag: "🇻🇳", special: false },
  { name: "Philippines", code: "PH", flag: "🇵🇭", special: false },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", special: false },
  { name: "Belgium", code: "BE", flag: "🇧🇪", special: false },
  { name: "Spain", code: "ES", flag: "🇪🇸", special: false },
  { name: "Switzerland", code: "CH", flag: "🇨🇭", special: false },
  { name: "Sweden", code: "SE", flag: "🇸🇪", special: false },
  { name: "Norway", code: "NO", flag: "🇳🇴", special: false },
  { name: "Denmark", code: "DK", flag: "🇩🇰", special: false },
  { name: "Finland", code: "FI", flag: "🇫🇮", special: false },
  { name: "China", code: "CN", flag: "🇨🇳", special: false },
  { name: "Taiwan", code: "TW", flag: "🇹🇼", special: false },
  { name: "Hong Kong", code: "HK", flag: "🇭🇰", special: false },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", special: false },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", special: false },
  { name: "Brazil", code: "BR", flag: "🇧🇷", special: false },
  { name: "Argentina", code: "AR", flag: "🇦🇷", special: false },
  { name: "Mexico", code: "MX", flag: "🇲🇽", special: false },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", special: false },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿", special: false },
];

// Popular visa types (8 most popular)
const popularVisaTypes = [
  { name: "B1 VOA (Visa on Arrival)", pnbp: 500000, fee: 250000, sponsor: false },
  { name: "C1 Tourist Visa (60 days)", pnbp: 1000000, fee: 500000, sponsor: false },
  { name: "D1 Tourist Visa (Multiple Entry)", pnbp: 2000000, fee: 1000000, sponsor: true },
  { name: "E33G Remote Worker Visa", pnbp: 7500000, fee: 3750000, sponsor: true },
  { name: "C2 Business Visa", pnbp: 3000000, fee: 1500000, sponsor: true },
  { name: "D2 Business Visa (1 Year)", pnbp: 5000000, fee: 2500000, sponsor: true },
  { name: "E28A Investment Visa / KITAS (1 Year)", pnbp: 9000000, fee: 6300000, sponsor: true },
  { name: "E33 Second Home Visa", pnbp: 13000000, fee: 6500000, sponsor: true },
];

// Other visa types
const otherVisaTypes = [
  { name: "C10 Business Meeting Visa", pnbp: 2000000, fee: 1400000, sponsor: true },
  { name: "D12 Pre-Investment Visa", pnbp: 2000000, fee: 1000000, sponsor: true },
  { name: "E30A Student Visa (1 Year)", pnbp: 7000000, fee: 3500000, sponsor: true },
  { name: "E31A Family Visa (1 Year)", pnbp: 7000000, fee: 3500000, sponsor: true },
];

// Currency exchange rates (simplified - in production, use real API)
const currencyRates = {
  USD: 0.000064,
  EUR: 0.000059,
  AUD: 0.000098,
  GBP: 0.000051,
  JPY: 0.0095,
  CNY: 0.00046,
  INR: 0.0053,
};

export default function ApplicationPanel() {
  const {
    isPanelOpen,
    closePanel,
    currentStep,
    formData,
    updateFormData,
    nextStep,
    previousStep,
    setCurrentStep,
    setSelectedVisa,
    setSelectedPayment,
    selectedPayment,
  } = useApplicationFlow();

  // Step 1 state
  const [countrySearch, setCountrySearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [numApplicants, setNumApplicants] = useState(1);
  const [selectedVisaLocal, setSelectedVisaLocal] = useState('');
  const [visaSearch, setVisaSearch] = useState('');
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const visaSectionRef = useRef<HTMLDivElement>(null);

  // Step 2 state
  const [skipStep2, setSkipStep2] = useState(false);

  // Step 3 state
  const [skipStep3, setSkipStep3] = useState(false);
  const [uploadedFiles, setUploadedFilesState] = useState({
    passport: null as File | null,
    selfie: null as File | null,
    accommodation: null as File | null,
    other: null as File | null,
  });
  const [arrivalDate, setArrivalDate] = useState('');
  const [notes, setNotes] = useState('');

  // Step 4 state
  const [agreedToAll, setAgreedToAll] = useState(false);

  // Filter countries
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Filter visas
  const filteredVisas = [...popularVisaTypes, ...otherVisaTypes].filter((visa) =>
    visa.name.toLowerCase().includes(visaSearch.toLowerCase())
  );

  // Format currency
  const formatCurrency = (amount: number, currency: string = 'IDR') => {
    if (currency === 'IDR') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(amount);
    }

    const rate = currencyRates[currency as keyof typeof currencyRates] || 1;
    const convertedAmount = amount * rate;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(convertedAmount);
  };

  // Calculate total
  const calculateTotal = () => {
    if (!selectedVisaLocal) return 0;
    const visa = [...popularVisaTypes, ...otherVisaTypes].find(
      (v) => v.name === selectedVisaLocal
    );
    if (!visa) return 0;
    return (visa.pnbp + visa.fee) * numApplicants;
  };

  const totalAmount = calculateTotal();

  // Handle country select
  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    updateFormData({ country });
  };

  // Handle visa select
  const handleVisaSelect = (visa: any) => {
    setSelectedVisaLocal(visa.name);
    setSelectedVisa(visa);
    updateFormData({ visaType: visa.name });

    // Auto scroll to price breakdown
    setTimeout(() => {
      visaSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'passport' | 'selfie' | 'accommodation' | 'other') => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFilesState((prev) => ({ ...prev, [type]: file }));
    }
  };

  // Step 1 next
  const handleStep1Next = () => {
    if (selectedCountry && selectedVisaLocal && numApplicants > 0) {
      updateFormData({
        country: selectedCountry,
        visaType: selectedVisaLocal,
        numApplicants,
      });
      nextStep();
    }
  };

  // Step 2 next
  const handleStep2Next = () => {
    if (skipStep2) {
      nextStep();
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.whatsapp) {
      return;
    }

    nextStep();
  };

  // Step 3 next
  const handleStep3Next = () => {
    updateFormData({
      arrivalDate,
      notes,
    });

    if (skipStep3) {
      nextStep();
      return;
    }

    nextStep();
  };

  // Handle currency toggle
  const handleCurrencyToggle = (currency: string) => {
    setSelectedCurrencies((prev) => {
      if (prev.includes(currency)) {
        return prev.filter((c) => c !== currency);
      } else {
        return [...prev, currency];
      }
    });
  };

  // Handle payment select
  const handlePaymentSelect = (payment: string) => {
    setSelectedPayment(payment as any);
  };

  // Handle order now
  const handleOrderNow = () => {
    // Payment gateway integration
    window.open('https://your-payment-gateway.com/pay', '_blank', 'noopener,noreferrer');
  };

  // Handle PayPal
  const handlePayPal = () => {
    window.open('https://www.paypal.com/ncp/payment/QU83M852K9A3U', '_blank', 'noopener,noreferrer');
  };

const handleSubmit = async () => {
  if (!agreedToAll || !selectedPayment) {
    alert('Please agree to all policies and select a payment method');
    return;
  }

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          visaType: selectedVisaLocal,
          numApplicants,
          paymentMethod: selectedPayment,
          arrivalDate,
          notes,
        }),
      });

      if (response.ok) {
        // Reset all state
        closePanel();
        setSelectedCountry('');
        setSelectedVisaLocal('');
        setNumApplicants(1);
        setCountrySearch('');
        setVisaSearch('');
        setShowCurrencies(false);
        setSelectedCurrencies([]);
        setSkipStep2(false);
        setSkipStep3(false);
        setUploadedFilesState({
          passport: null,
          selfie: null,
          accommodation: null,
          other: null,
        });
        setArrivalDate('');
        setNotes('');
        setAgreedToAll(false);

        alert('Application submitted successfully! Check your dashboard for updates.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  if (!isPanelOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 z-[9998] transition-opacity duration-300"
        onClick={closePanel}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 md:right-auto md:left-1/2 w-full md:w-[50%] lg:w-[60%] max-h-[90vh] md:max-h-[90vh] bg-white rounded-t-3xl md:rounded-none z-[9999] overflow-y-auto shadow-2xl transition-transform duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#1E293B' }}>
              Apply for Visa
            </h2>
            <button
              onClick={closePanel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <IconX size={28} />
            </button>
          </div>

          {/* Step Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              {[1, 2, 3, 4].map((step) => (
                <React.Fragment key={step}>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      currentStep === step
                        ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white scale-110 shadow-lg'
                        : currentStep > step
                        ? 'bg-[#10B981] text-white'
                        : 'bg-[#e0e0e0] text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-all duration-300 ${
                        currentStep > step ? 'bg-gradient-to-r from-[#FFD700] to-[#4B0082]' : 'bg-[#e0e0e0]'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs text-center font-semibold">
              {['Select Country', 'Details', 'Documents', 'Payment'].map((label, idx) => (
                <div
                  key={label}
                  className={`transition-colors duration-300 ${
                    currentStep === idx + 1 ? 'text-[#4B0082]' : 'text-[#64748B]'
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div>
            {/* Step 1: Select Country */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#1E293B' }}>
                  Select Your Country
                </h3>

                {/* Number of applicants */}
                <div className="mb-6 p-4 rounded-xl bg-[#F8FAFC] border border-gray-200">
                  <Label htmlFor="numApplicants">Pilih Jumlah Visa / Number of Applicants *</Label>
                  <Input
                    id="numApplicants"
                    type="number"
                    min="1"
                    max="10"
                    value={numApplicants}
                    onChange={(e) => setNumApplicants(parseInt(e.target.value) || 1)}
                    className="mt-2"
                    required
                  />
                </div>

                {/* Country selection */}
                <div className="mb-4">
                  <Label>Pilih Negara / Select Country *</Label>
                  <Input
                    type="text"
                    placeholder="🔍 Search country..."
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    className="mt-2 mb-4"
                  />
                  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-xl">
                    {filteredCountries.map((country) => (
                      <div
                        key={country.code}
                        onClick={() => handleCountrySelect(country.name)}
                        className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 border-b border-gray-200 ${
                          selectedCountry === country.name
                            ? 'bg-[#EDE7F6] border-l-4 border-l-[#4B0082]'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl">{country.flag}</span>
                        <span className="font-semibold flex-1" style={{ color: '#1E293B' }}>
                          {country.name}
                        </span>
                        {country.special && (
                          <span className="bg-[#EF4444] text-white px-2 py-1 rounded-lg text-xs font-bold">
                            SPECIAL
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visa selection */}
                <div ref={visaSectionRef} className="mb-6">
                  <Label>Pilih Jenis Visa / Select Visa Type *</Label>
                  <Input
                    type="text"
                    placeholder="🔍 Search visa type..."
                    value={visaSearch}
                    onChange={(e) => setVisaSearch(e.target.value)}
                    className="mt-2 mb-4"
                  />

                  {/* Most Popular */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3" style={{ color: '#64748B' }}>
                      🌟 8 Most Popular Visa Paling Atas / Top Visas
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {popularVisaTypes.map((visa, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleVisaSelect(visa)}
                          className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                            selectedVisaLocal === visa.name
                              ? 'bg-[#EDE7F6] border-[#4B0082]'
                              : 'hover:bg-gray-50 border-gray-200'
                          }`}
                        >
                          <p className="font-semibold mb-2" style={{ color: '#1E293B' }}>
                            {visa.name}
                          </p>
                          <p className="text-xs" style={{ color: '#64748B' }}>
                            {visa.sponsor ? 'Sponsor Required' : 'No Sponsor Needed'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* All Visa Types */}
                  <h4 className="text-sm font-semibold mb-3" style={{ color: '#64748B' }}>
                    📄 Semua Jenis Visa / All Visa Types
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {filteredVisas.map((visa, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleVisaSelect(visa)}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                          selectedVisaLocal === visa.name
                            ? 'bg-[#EDE7F6] border-[#4B0082]'
                            : 'hover:bg-gray-50 border-gray-200'
                        }`}
                      >
                        <p className="font-semibold mb-2" style={{ color: '#1E293B' }}>
                          {visa.name}
                        </p>
                        <p className="text-xs" style={{ color: '#64748B' }}>
                          {visa.sponsor ? 'Sponsor Required' : 'No Sponsor Needed'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price breakdown */}
                {selectedVisaLocal && totalAmount > 0 && (
                  <div className="mt-6 p-4 rounded-xl bg-purple-50 border border-purple-200">
                    <h4 className="font-bold mb-4" style={{ color: '#4B0082' }}>
                      💰 Rincian Harga / Price Breakdown
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>PNBP (Government Fee):</span>
                        <span className="font-semibold">
                          {formatCurrency([...popularVisaTypes, ...otherVisaTypes].find((v) => v.name === selectedVisaLocal)?.pnbp || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Fee:</span>
                        <span className="font-semibold">
                          {formatCurrency([...popularVisaTypes, ...otherVisaTypes].find((v) => v.name === selectedVisaLocal)?.fee || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2 mt-2">
                        <span>Total (IDR) x {numApplicants}:</span>
                        <span style={{ color: '#4B0082' }}>
                          {formatCurrency(totalAmount)}
                        </span>
                      </div>
                    </div>

                    {/* Currency options */}
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <Label className="block mb-3">Show Prices in Other Currencies / Tampilkan Harga dalam Mata Uang Lain:</Label>
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(currencyRates).map((currency) => (
                          <div
                            key={currency}
                            onClick={() => handleCurrencyToggle(currency)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                              selectedCurrencies.includes(currency)
                                ? 'bg-purple-100 border-[#4B0082]'
                                : 'bg-white border-gray-300 hover:border-purple-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedCurrencies.includes(currency)}
                              onChange={() => handleCurrencyToggle(currency)}
                              className="sr-only"
                            />
                            <span className="text-sm font-semibold">
                              {currency}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Show selected currencies */}
                    {selectedCurrencies.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {selectedCurrencies.map((currency) => (
                          <div key={currency} className="flex justify-between text-sm">
                            <span className="font-semibold">{currency}:</span>
                            <span className="font-bold" style={{ color: '#4B0082' }}>
                              {formatCurrency(totalAmount, currency)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 1 buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={previousStep}
                    variant="outline"
                    className="w-[30%]"
                    style={{ borderColor: '#4B0082' }}
                  >
                    ← Kembali
                  </Button>
                  <Button
                    onClick={handleStep1Next}
                    disabled={!selectedCountry || !selectedVisaLocal}
                    className="w-[70%] py-5 text-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#4B0082' }}
                  >
                    Lanjut →
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#1E293B' }}>
                  Fill Personal Information / Isi Informasi Pribadi
                </h3>

                {/* Skip option */}
                <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-[#FFF3E0] border-2 border-[#FFC107]">
                  <Checkbox
                    id="skipStep2"
                    checked={skipStep2}
                    onCheckedChange={(checked) => setSkipStep2(checked as boolean)}
                  />
                  <Label htmlFor="skipStep2" className="cursor-pointer">
                    ✅ Skip This Step / Lewati Langkah Ini
                  </Label>
                </div>

                {!skipStep2 && (
                  <div className="mb-6 p-4 rounded-xl bg-[#F8FAFC] border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName || ''}
                          onChange={(e) => updateFormData({ firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName || ''}
                          onChange={(e) => updateFormData({ lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp *</Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="+62 812 3456 7890"
                        value={formData.whatsapp || ''}
                        onChange={(e) => updateFormData({ whatsapp: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="passportNumber">Passport Number *</Label>
                      <Input
                        id="passportNumber"
                        value={formData.passportNumber || ''}
                        onChange={(e) => updateFormData({ passportNumber: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dob">Date of Birth *</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={formData.dob || ''}
                        onChange={(e) => updateFormData({ dob: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact || ''}
                        onChange={(e) => updateFormData({ emergencyContact: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Number *</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone || ''}
                        onChange={(e) => updateFormData({ emergencyPhone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2 buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={previousStep}
                    variant="outline"
                    className="w-[30%]"
                    style={{ borderColor: '#4B0082' }}
                  >
                    ← Kembali
                  </Button>
                  <Button
                    onClick={handleStep2Next}
                    className="w-[70%] text-white"
                    style={{ backgroundColor: '#4B0082' }}
                  >
                    Lanjut →
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Upload Documents */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#1E293B' }}>
                  Upload Documents / Unggah Dokumen
                </h3>

                {/* Skip option */}
                <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-[#FFF3E0] border-2 border-[#FFC107]">
                  <Checkbox
                    id="skipStep3"
                    checked={skipStep3}
                    onCheckedChange={(checked) => setSkipStep3(checked as boolean)}
                  />
                  <Label htmlFor="skipStep3" className="cursor-pointer">
                    ✅ Skip This Step / Lewati Langkah Ini
                  </Label>
                </div>

                {!skipStep3 && (
                  <div className="space-y-4 mb-6">
                    {/* Passport Photo */}
                    <div>
                      <Label>Passport Photo *</Label>
                      <label className={`block mt-2 p-6 text-center rounded-xl cursor-pointer transition-all duration-300 border-2 border-dashed ${
                        uploadedFiles.passport
                          ? 'border-[#10B981] bg-[#F0FDF4]'
                          : 'border-gray-300 hover:border-[#4B0082] hover:bg-gray-50'
                      }`}>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload(e, 'passport')}
                        />
                        {uploadedFiles.passport ? (
                          <div className="text-[#10B981]">
                            <IconCheck size={48} className="mx-auto mb-2" />
                            <p className="font-semibold">Passport uploaded: {uploadedFiles.passport.name}</p>
                          </div>
                        ) : (
                          <div style={{ color: '#4B0082' }}>
                            <IconUpload size={48} className="mx-auto mb-2" />
                            <p className="font-semibold">Click to upload passport</p>
                            <p className="text-xs">PNG, JPG or PDF (max. 5MB)</p>
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Selfie Photo */}
                    <div>
                      <Label>Recent Photo *</Label>
                      <label className={`block mt-2 p-6 text-center rounded-xl cursor-pointer transition-all duration-300 border-2 border-dashed ${
                        uploadedFiles.selfie
                          ? 'border-[#10B981] bg-[#F0FDF4]'
                          : 'border-gray-300 hover:border-[#4B0082] hover:bg-gray-50'
                      }`}>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'selfie')}
                        />
                        {uploadedFiles.selfie ? (
                          <div className="text-[#10B981]">
                            <IconCheck size={48} className="mx-auto mb-2" />
                            <p className="font-semibold">Photo uploaded: {uploadedFiles.selfie.name}</p>
                          </div>
                        ) : (
                          <div style={{ color: '#4B0082' }}>
                            <IconUpload size={48} className="mx-auto mb-2" />
                            <p className="font-semibold">Click to upload recent photo</p>
                            <p className="text-xs">Clear face photo (max. 5MB)</p>
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Proof of Accommodation */}
                    <div>
                      <Label>Proof of Accommodation or Any Data Required (Optional)</Label>
                      <label className={`block mt-2 p-6 text-center rounded-xl cursor-pointer transition-all duration-300 border-2 border-dashed ${
                        uploadedFiles.accommodation
                          ? 'border-[#10B981] bg-[#F0FDF4]'
                          : 'border-gray-300 hover:border-[#4B0082] hover:bg-gray-50'
                      }`}>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileUpload(e, 'accommodation')}
                        />
                        {uploadedFiles.accommodation ? (
                          <div className="text-[#10B981]">
                            <IconCheck size={48} className="mx-auto mb-2" />
                            <p className="font-semibold">Document uploaded: {uploadedFiles.accommodation.name}</p>
                          </div>
                        ) : (
                          <div style={{ color: '#4B0082' }}>
                            <IconUpload size={48} className="mx-auto mb-2" />
                            <p className="font-semibold">Click to upload proof</p>
                            <p className="text-xs">Flight tickets, hotel booking, etc. (max. 5MB)</p>
                          </div>
                        )}
                      </label>
                    </div>

                    {/* Planning Date of Arrival */}
                    <div>
                      <Label htmlFor="arrivalDate">Planning Date of Arrival</Label>
                      <Input
                        id="arrivalDate"
                        type="date"
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional information or requirements..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3 buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={previousStep}
                    variant="outline"
                    className="w-[30%]"
                    style={{ borderColor: '#4B0082' }}
                  >
                    ← Kembali
                  </Button>
                  <Button
                    onClick={handleStep3Next}
                    className="w-[70%] text-white"
                    style={{ backgroundColor: '#4B0082' }}
                  >
                    Lanjut →
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Payment & Submission */}
            {currentStep === 4 && (
              <div>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#1E293B' }}>
                  Make Payment / Buat Pembayaran
                </h3>

                {/* Application Summary */}
                <div className="mb-6 p-4 rounded-xl bg-[#F8FAFC] border border-gray-200">
                  <h4 className="font-bold mb-4" style={{ color: '#4B0082' }}>
                    📋 Application Summary / Ringkasan Aplikasi
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Country:</span>
                      <span className="font-semibold" style={{ color: '#1E293B' }}>{selectedCountry || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visa Type:</span>
                      <span className="font-semibold" style={{ color: '#1E293B' }}>{selectedVisaLocal || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of Applicants:</span>
                      <span className="font-semibold" style={{ color: '#1E293B' }}>{numApplicants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PNBP Fee:</span>
                      <span className="font-semibold">
                        {formatCurrency([...popularVisaTypes, ...otherVisaTypes].find((v) => v.name === selectedVisaLocal)?.pnbp || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fee:</span>
                      <span className="font-semibold">
                        {formatCurrency([...popularVisaTypes, ...otherVisaTypes].find((v) => v.name === selectedVisaLocal)?.fee || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2 mt-2">
                      <span>Total (IDR):</span>
                      <span style={{ color: '#4B0082' }}>
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <Label className="block mb-3">Select Payment Method / Pilih Metode Pembayaran *</Label>
                  <div className="space-y-3">
                    {/* Bank Transfer */}
                    <div
                      onClick={() => handlePaymentSelect('bank')}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                        selectedPayment === 'bank'
                          ? 'bg-[#EDE7F6] border-[#4B0082]'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span className="text-2xl">🏦</span>
                      <div className="flex-1">
                        <p className="font-bold" style={{ color: '#1E293B' }}>Bank Transfer</p>
                        <p className="text-xs" style={{ color: '#64748B' }}>Direct bank transfer</p>
                      </div>
                    </div>

                    {/* E-Wallet / QRIS */}
                    <div
                      onClick={() => handlePaymentSelect('qris')}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                        selectedPayment === 'qris'
                          ? 'bg-[#EDE7F6] border-[#4B0082]'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span className="text-2xl">📱</span>
                      <div className="flex-1">
                        <p className="font-bold" style={{ color: '#1E293B' }}>E-Wallet / QRIS</p>
                        <p className="text-xs" style={{ color: '#64748B' }}>Scan & pay instantly</p>
                      </div>
                    </div>

                    {/* PayPal */}
                    <div
                      onClick={() => handlePaymentSelect('paypal')}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                        selectedPayment === 'paypal'
                          ? 'bg-[#EDE7F6] border-[#4B0082]'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span className="text-2xl">🅿️</span>
                      <div className="flex-1">
                        <p className="font-bold" style={{ color: '#1E293B' }}>PayPal</p>
                        <p className="text-xs" style={{ color: '#64748B' }}>Fast & secure</p>
                      </div>
                    </div>

                    {/* Credit / Debit Card */}
                    <div
                      onClick={() => handlePaymentSelect('card')}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                        selectedPayment === 'card'
                          ? 'bg-[#EDE7F6] border-[#4B0082]'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span className="text-2xl">💳️</span>
                      <div className="flex-1">
                        <p className="font-bold" style={{ color: '#1E293B' }}>Credit / Debit Card</p>
                        <p className="text-xs" style={{ color: '#64748B' }}>Stripe / Wise / Crypto</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Single checkbox for all policies */}
                <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeAll"
                      checked={agreedToAll}
                      onCheckedChange={(checked) => setAgreedToAll(checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="agreeAll" className="cursor-pointer text-sm">
                      <span className="font-semibold">Saya setuju dengan semua kebijakan / I agree to all policies:</span>
                      <ul className="mt-2 ml-6 space-y-1 text-xs" style={{ color: '#64748B' }}>
                        <li>
                          <a href="/privacy-policy" target="_blank" className="underline hover:text-purple-600" rel="noopener noreferrer">
                            Privacy Policy / Kebijakan Privasi
                          </a>
                        </li>
                        <li>
                          <a href="/terms-and-condition" target="_blank" className="underline hover:text-purple-600" rel="noopener noreferrer">
                            Terms & Conditions / Syarat & Ketentuan
                          </a>
                        </li>
                        <li>
                          <a href="/refund" target="_blank" className="underline hover:text-purple-600" rel="noopener noreferrer">
                            Refund Policy / Kebijakan Pengembalian
                          </a>
                        </li>
                      </ul>
                    </Label>
                  </div>
                </div>

                {/* Payment Buttons */}
                <div className="space-y-3 mb-6">
                  <Button
                    onClick={handleOrderNow}
                    disabled={!agreedToAll || !selectedPayment}
                    className="w-full py-4 text-lg font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                    }}
                  >
                    💰 Order Now (Payment Gateway API)
                  </Button>
                  <Button
                    onClick={handlePayPal}
                    disabled={!agreedToAll}
                    className="w-full py-4 text-lg font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #0070ba, #003087)',
                    }}
                  >
                    💳️ PayPal / Credit or Debit Card
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!agreedToAll || !selectedPayment}
                    className="w-full py-4 text-lg font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#4B0082' }}
                  >
                    🚀 Submit Application
                  </Button>
                </div>

                {/* Step 4 buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={previousStep}
                    variant="outline"
                    className="w-[30%]"
                    style={{ borderColor: '#4B0082' }}
                  >
                    ← Kembali
                  </Button>
                  <div className="w-[70%] flex gap-2">
                    {/* Back and continue are handled above */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
