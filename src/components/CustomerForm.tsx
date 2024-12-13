import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Form schema for validation
const customerSchema = z.object({
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  company: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  email: z.string()
    .email("Please enter a valid email address"),
  phone: z.string()
    .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 
      "Please enter a valid phone number")
});

type CustomerFormData = z.infer<typeof customerSchema>;

export const CustomerForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema)
  });

  const onSubmit = (data: CustomerFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Customer Information</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Form fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            {...register('firstName')}
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Add other fields similarly */}
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
};