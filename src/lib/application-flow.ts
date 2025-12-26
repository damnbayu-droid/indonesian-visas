'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PaymentMethod = 'card' | 'bank' | 'qris' | 'paypal';

export interface VisaType {
  name: string;
  code?: string;
  pnbp: number;
  fee: number;
  sponsor: boolean;
  description?: string;
}

export interface Country {
  name: string;
  code: string;
  flag: string;
  special: boolean;
}

export interface FormData {
  country?: string;
  visaType?: string;
  customVisaCode?: string;
  numApplicants?: number;
  arrivalDate?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  whatsapp?: string;
  passportNumber?: string;
  dob?: string;
  originalAddress?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  notes?: string;
}

export interface ApplicationState {
  // Current step in the application process
  currentStep: number;

  // Form data
  formData: FormData;

  // Selected visa type details
  selectedVisa?: VisaType;

  // Selected payment method
  selectedPayment?: PaymentMethod;

  // Uploaded files
  uploadedFiles: {
    passport: File | null;
    selfie: File | null;
    additional: File[];
  };

  // Application panel state
  isPanelOpen: boolean;

  // Privacy/Terms checkboxes
  agreedToPrivacy: boolean;
  agreedToTerms: boolean;
  agreedToRefund: boolean;

  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  setSelectedVisa: (visa: VisaType | undefined) => void;
  setSelectedPayment: (payment: PaymentMethod | undefined) => void;
  setUploadedFiles: (files: Partial<ApplicationState['uploadedFiles']>) => void;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
  setAgreedToPrivacy: (agreed: boolean) => void;
  setAgreedToTerms: (agreed: boolean) => void;
  setAgreedToRefund: (agreed: boolean) => void;
  resetApplication: () => void;
  canProceedToNextStep: () => boolean;
}

const initialState = {
  currentStep: 1,
  formData: {},
  selectedVisa: undefined,
  selectedPayment: undefined,
  uploadedFiles: {
    passport: null,
    selfie: null,
    additional: [],
  },
  isPanelOpen: false,
  agreedToPrivacy: false,
  agreedToTerms: false,
  agreedToRefund: false,
};

export const useApplicationFlow = create<ApplicationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const currentStep = get().currentStep;
        if (currentStep < 4) {
          set({ currentStep: currentStep + 1 });
        }
      },

      previousStep: () => {
        const currentStep = get().currentStep;
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      setSelectedVisa: (visa) => set({ selectedVisa: visa }),

      setSelectedPayment: (payment) => set({ selectedPayment: payment }),

      setUploadedFiles: (files) =>
        set((state) => ({
          uploadedFiles: { ...state.uploadedFiles, ...files },
        })),

      openPanel: () => set({ isPanelOpen: true }),

      closePanel: () => set({ isPanelOpen: false }),

      togglePanel: () =>
        set((state) => ({ isPanelOpen: !state.isPanelOpen })),

      setAgreedToPrivacy: (agreed) => set({ agreedToPrivacy: agreed }),

      setAgreedToTerms: (agreed) => set({ agreedToTerms: agreed }),

      setAgreedToRefund: (agreed) => set({ agreedToRefund: agreed }),

      resetApplication: () => set(initialState),

      canProceedToNextStep: () => {
        const state = get();
        const { currentStep, formData } = state;

        switch (currentStep) {
          case 1:
            // Step 1: Country selection is required
            return !!formData.country;
          case 2:
            // Step 2: Visa type and basic info is required
            return !!(
              formData.visaType &&
              formData.numApplicants &&
              formData.arrivalDate &&
              formData.firstName &&
              formData.lastName &&
              formData.email &&
              formData.whatsapp
            );
          case 3:
            // Step 3: Documents are optional (can skip)
            return true;
          case 4:
            // Step 4: Payment and agreements
            return !!(
              state.selectedPayment &&
              state.agreedToPrivacy &&
              state.agreedToTerms &&
              state.agreedToRefund
            );
          default:
            return false;
        }
      },
    }),
    {
      name: 'indonesian-visas-application',
      partialize: (state) => ({
        formData: state.formData,
        selectedVisa: state.selectedVisa,
        uploadedFiles: state.uploadedFiles,
      }),
    }
  )
);
