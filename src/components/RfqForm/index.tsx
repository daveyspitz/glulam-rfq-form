import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  // Customer Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please enter a valid phone number"),

  // Technical Specifications
  applicationType: z.enum([
    'Roof (Snow Load)',
    'Roof (Non-Snow Load)',
    'Floor',
    'Cantilever Beam',
    'Custom Application'
  ]),
  spanLength: z.enum([
    '< 10 ft',
    '10–20 ft',
    '20–30 ft',
    '30–40 ft',
    '40 ft'
  ]),
  beamDimensions: z.enum([
    '3-1/8" x 12"',
    '3-1/8" x 18"',
    '5-1/8" x 12"',
    '5-1/8" x 18"',
    '6-3/4" x 24"',
    'Custom'
  ]),
  loadType: z.enum([
    'Roof: Snow Load',
    'Roof: Non-Snow Load',
    'Floor: Light Load',
    'Floor: Heavy Load',
    'Unknown'
  ]),
  camberRequirement: z.enum([
    'No Camber',
    'Yes, 1/8" per foot',
    'Yes, 1/4" per foot',
    'Other'
  ]),
  appearanceGrade: z.enum([
    'Industrial',
    'Architectural',
    'Premium'
  ]),
  environmentalTreatment: z.enum([
    'Indoor Use',
    'Outdoor Use',
    'Fire Retardant'
  ]),
  quantity: z.enum([
    '1–5 beams',
    '6–10 beams',
    '11–20 beams',
    '21+ beams'
  ])
});

type RfqFormData = z.infer<typeof formSchema>;

export const RfqForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RfqFormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: RfqFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Glulam RFQ Form</h1>
          <p className="text-lg text-gray-600">Request a quote for your custom Glulam beam specifications</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Form sections will go here */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};