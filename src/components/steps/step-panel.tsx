'use client';

import { useApplicationFlow } from '@/lib/application-flow';

export default function StepPanel() {
  const { currentStep, formData, uploadedFiles, selectedPayment } = useApplicationFlow();

  const steps = [
    { id: 1, title: 'Country', desc: 'Select your country' },
    { id: 2, title: 'Details', desc: 'Visa & personal info' },
    { id: 3, title: 'Documents', desc: 'Upload documents' },
    { id: 4, title: 'Payment', desc: 'Pay & submit' },
  ];

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'inactive';
  };

  const getStepData = (stepId: number) => {
    switch (stepId) {
      case 1:
        return formData.country || '';
      case 2:
        return formData.visaType ? 'Visa Selected' : '';
      case 3:
        return uploadedFiles.passport || uploadedFiles.selfie ? 'Documents Uploaded' : '';
      case 4:
        return selectedPayment ? 'Payment Selected' : '';
      default:
        return '';
    }
  };

  return (
    <>
      {/* Step Progress Indicators */}
      <div className="flex items-center justify-center mb-6">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                getStepStatus(step.id) === 'active'
                  ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white scale-110 shadow-lg'
                  : getStepStatus(step.id) === 'completed'
                  ? 'bg-[#10B981] text-white'
                  : 'bg-[#e0e0e0] text-gray-600'
              }`}
            >
              {step.id}
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 transition-all duration-300 ${
                  getStepStatus(step.id) === 'completed'
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#4B0082]'
                    : 'bg-[#e0e0e0]'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Labels */}
      <div className="grid grid-cols-4 gap-2 text-xs text-center font-semibold mb-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`transition-colors duration-300 ${
              getStepStatus(step.id) === 'active'
                ? 'text-[#4B0082]'
                : 'text-[#64748B]'
            }`}
          >
            {step.title}
          </div>
        ))}
      </div>

      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step) => {
          const stepData = getStepData(step.id);
          return (
            <div
              key={step.id}
              className="flex flex-col items-center text-center p-4 rounded-xl transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 ${
                  getStepStatus(step.id) === 'active'
                    ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white'
                    : 'bg-gradient-to-br from-purple-600 to-purple-800 text-white'
                }`}
              >
                {step.id}
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: '#1E293B' }}
              >
                {step.title}
              </h3>
              <p className="text-sm" style={{ color: '#64748B' }}>
                {step.desc}
              </p>
              {stepData && (
                <p
                  className="text-xs mt-2 font-bold text-[#10B981]"
                >
                  {stepData}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

import React from 'react';
