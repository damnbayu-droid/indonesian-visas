'use client';

import { useState, useEffect } from 'react';
import { useApplicationFlow } from '@/lib/application-flow';
import { IconX, IconChevronLeft, IconUpload, IconCheck, IconCreditCard, IconBuilding, IconQrCode, IconPayPal } from '@/components/icons';
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

// Popular visa types
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

const otherVisaTypes = [
  { name: "C10 Business Meeting Visa", pnbp: 2000000, fee: 1400000, sponsor: true },
  { name: "D12 Pre-Investment Visa", pnbp: 2000000, fee: 1000000, sponsor: true },
  { name: "E30A Student Visa (1 Year)", pnbp: 7000000, fee: 3500000, sponsor: true },
  { name: "E31A Family Visa (1 Year)", pnbp: 7000000, fee: 3500000, sponsor: true },
];

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
    uploadedFiles,
    setUploadedFiles,
    agreedToPrivacy,
    agreedToTerms,
    agreedToRefund,
    setAgreedToPrivacy,
    setAgreedToTerms,
    setAgreedToRefund,
    selectedPayment,
  } = useApplicationFlow();

  const [countrySearch, setCountrySearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [skipDocuments, setSkipDocuments] = useState(false);
  const [selectedVisa, setSelectedVisaState] = useState('');

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    updateFormData({ country });
  };

  const handleVisaSelect = (visa: any) => {
    setSelectedVisaState(visa.name);
    setSelectedVisa(visa);
    updateFormData({ visaType: visa.name });
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedCountry) {
      return;
    }
    if (currentStep === 2) {
      if (!selectedVisa || !formData.email || !formData.whatsapp) {
        return;
      }
    }
    nextStep();
  };

  const handleStep1Next = () => {
    if (selectedCountry) {
      nextStep();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'passport' | 'selfie' | 'additional') => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles({ [type]: file });
    }
  };

  const handlePaymentSelect = (payment: string) => {
    setSelectedPayment(payment as any);
  };

  const canSubmit = agreedToPrivacy && agreedToTerms && agreedToRefund && selectedPayment;

  const handlePayNow = () => {
    // Open payment gateway
    window.open('https://your-payment-gateway.com/pay', '_blank', 'noopener,noreferrer');
  };

  const handlePayPal = () => {
    window.open('https://www.paypal.com/ncp/payment/QU83M852K9A3U', '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    // Submit application to API
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          visaType: selectedVisa,
          paymentMethod: selectedPayment,
        }),
      });

      if (response.ok) {
        closePanel();
        alert('Application submitted successfully!');
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
                        currentStep > step
                          ? 'bg-gradient-to-r from-[#FFD700] to-[#4B0082]'
                          : 'bg-[#e0e0e0]'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs text-center font-semibold">
              {['Country', 'Details', 'Documents', 'Payment'].map((label, idx) => (
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
            {/* Step 1: Country Selection */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#1E293B' }}>
                  Select Your Country
                </h3>
                <Input
                  type="text"
                  placeholder="🔍 Search country..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="mb-4"
                />
                <div className="max-h-96 overflow-y-auto mb-4 space-y-2">
                  {filteredCountries.map((country) => (
                    <div
                      key={country.code}
                      onClick={() => handleCountrySelect(country.name)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                        selectedCountry === country.name
                          ? 'bg-[#EDE7F6] border-[#4B0082]'
                          : 'hover:bg-gray-50 border-transparent'
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
                <Button
                  onClick={handleStep1Next}
                  disabled={!selectedCountry}
                  className="w-full py-4 text-lg font-semibold rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#4B0082' }}
                >
                  Continue →
                </Button>
              </div>
            )}

            {/* Step 2: Visa & Personal Details */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#1E293B' }}>
                  Visa & Personal Details
                </h3>

                {/* Visa Information */}
                <div className="mb-6 p-4 rounded-xl bg-[#F8FAFC] border border-gray-200">
                  <h4 className="font-bold mb-4" style={{ color: '#1E293B' }}>
                    🌟 Visa Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="visaType">Visa Type *</Label>
                      <select
                        id="visaType"
                        value={selectedVisa}
                        onChange={(e) => {
                          const visa = [...popularVisaTypes, ...otherVisaTypes].find(
                            (v) => v.name === e.target.value
                          );
                          if (visa) handleVisaSelect(visa);
                        }}
                        className="w-full mt-1 p-3 border-2 rounded-xl focus:outline-none focus:border-[#4B0082] transition-colors"
                        required
                      >
                        <option value="">Select visa type...</option>
                        <optgroup label="🌟 Most Popular">
                          {popularVisaTypes.map((visa) => (
                            <option key={visa.name} value={visa.name}>
                              {visa.name} - {formatCurrency(visa.pnbp + visa.fee)}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="📄 Other Visa Types">
                          {otherVisaTypes.map((visa) => (
                            <option key={visa.name} value={visa.name}>
                              {visa.name} - {formatCurrency(visa.pnbp + visa.fee)}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="arrivalDate">Arrival Date *</Label>
                      <Input
                        id="arrivalDate"
                        type="date"
                        value={formData.arrivalDate || ''}
                        onChange={(e) => updateFormData({ arrivalDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="mb-6 p-4 rounded-xl bg-[#F8FAFC] border border-gray-200">
                  <h4 className="font-bold mb-4" style={{ color: '#1E293B' }}>
                    👤 Personal Information
                  </h4>
                  <div className="space-y-4">
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
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={previousStep}
                    variant="outline"
                    className="flex-1"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    className="flex-1 text-white"
                    style={{ backgroundColor: '#4B0082' }}
                  >
                    Continue →
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Upload Documents */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#1E293B' }}>
                  Upload Required Documents
                </h3>

                <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-[#FFF3E0] border-2 border-[#FFC107]">
                  <Checkbox
                    id="skipDocuments"
                    checked={skipDocuments}
                    onCheckedChange={(checked) => setSkipDocuments(checked as boolean)}
                  />
                  <Label htmlFor="skipDocuments" className="cursor-pointer">
                    ✅ You can Skip This (upload documents later via WhatsApp)
                  </Label>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Passport Upload */}
                  <div>
                    <Label>Passport Photo Page *</Label>
                    <label
                      className={`block mt-2 p-6 text-center rounded-xl cursor-pointer transition-all duration-300 border-2 border-dashed ${
                        uploadedFiles.passport
                          ? 'border-[#10B981] bg-[#F0FDF4]'
                          : 'border-gray-200 hover:border-[#4B0082] hover:bg-gray-50'
                      } ${skipDocuments ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(e, 'passport')}
                      />
                      {uploadedFiles.passport ? (
                        <div className="text-[#10B981]">
                          <IconCheck size={48} className="mx-auto mb-2" />
                          <p className="font-semibold">Passport uploaded</p>
                        </div>
                      ) : (
                        <div style={{ color: '#4B0082' }}>
                          <IconUpload size={48} className="mx-auto mb-2" />
                          <p className="font-semibold">Click to upload passport</p>
                          <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                            PNG, JPG or PDF (max. 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* Selfie Upload */}
                  <div>
                    <Label>Selfie Photo *</Label>
                    <label
                      className={`block mt-2 p-6 text-center rounded-xl cursor-pointer transition-all duration-300 border-2 border-dashed ${
                        uploadedFiles.selfie
                          ? 'border-[#10B981] bg-[#F0FDF4]'
                          : 'border-gray-200 hover:border-[#4B0082] hover:bg-gray-50'
                      } ${skipDocuments ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'selfie')}
                      />
                      {uploadedFiles.selfie ? (
                        <div className="text-[#10B981]">
                          <IconCheck size={48} className="mx-auto mb-2" />
                          <p className="font-semibold">Selfie uploaded</p>
                        </div>
                      ) : (
                        <div style={{ color: '#4B0082' }}>
                          <IconUpload size={48} className="mx-auto mb-2" />
                          <p className="font-semibold">Click to upload selfie</p>
                          <p className="text-sm mt-1" style={{ color: '#64748B' }}>
                            Clear face photo (max. 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={previousStep}
                    variant="outline"
                    className="flex-1"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="flex-1 text-white"
                    style={{ backgroundColor: '#4B0082' }}
                  >
                    Continue →
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Payment & Submit */}
            {currentStep === 4 && (
              <div>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#1E293B' }}>
                  Payment & Submit
                </h3>

                {/* Payment Options */}
                <div className="mb-6">
                  <Label className="block mb-3">Select Payment Method *</Label>
                  <div className="space-y-3">
                    {[
                      { id: 'card', icon: IconCreditCard, label: 'Credit/Debit Card', desc: 'Visa, Mastercard, Amex' },
                      { id: 'bank', icon: IconBuilding, label: 'Bank Transfer', desc: 'Direct bank transfer' },
                      { id: 'qris', icon: IconQrCode, label: 'QRIS', desc: 'Scan & pay instantly' },
                      { id: 'paypal', icon: IconPayPal, label: 'PayPal', desc: 'Fast & secure' },
                    ].map((option) => (
                      <div
                        key={option.id}
                        onClick={() => handlePaymentSelect(option.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                          selectedPayment === option.id
                            ? 'bg-[#EDE7F6] border-[#4B0082]'
                            : 'border-gray-200 hover:border-[#4B0082] hover:bg-gray-50'
                        }`}
                      >
                        <option.icon size={40} />
                        <div className="flex-1">
                          <p className="font-bold" style={{ color: '#1E293B' }}>{option.label}</p>
                          <p className="text-xs" style={{ color: '#64748B' }}>{option.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Buttons */}
                <div className="space-y-3 mb-6">
                  <Button
                    onClick={handlePayNow}
                    className="w-full py-4 text-lg font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
                  >
                    💰 Pay Now (Secure Payment Gateway)
                  </Button>
                  <Button
                    onClick={handlePayPal}
                    className="w-full py-4 text-lg font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #0070ba, #003087)' }}
                  >
                    <IconPayPal size={20} className="mr-2" />
                    Pay with PayPal
                  </Button>
                </div>

                {/* Agreements */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="privacy"
                      checked={agreedToPrivacy}
                      onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
                    />
                    <Label htmlFor="privacy" className="cursor-pointer">
                      I agree to the{' '}
                      <a href="/privacy-policy" className="underline font-semibold" target="_blank">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="cursor-pointer">
                      I agree to the{' '}
                      <a href="/terms-and-condition" className="underline font-semibold" target="_blank">
                        Terms & Conditions
                      </a>
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="refund"
                      checked={agreedToRefund}
                      onCheckedChange={(checked) => setAgreedToRefund(checked as boolean)}
                    />
                    <Label htmlFor="refund" className="cursor-pointer">
                      I agree to the{' '}
                      <a href="/refund" className="underline font-semibold" target="_blank">
                        Refund Policy
                      </a>
                    </Label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={previousStep}
                    variant="outline"
                    className="flex-1"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className="flex-1 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#4B0082' }}
                  >
                    Submit Application 🚀
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import React from 'react';
