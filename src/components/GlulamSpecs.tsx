import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const glulamSchema = z.object({
  applicationType: z.enum([
    'Roof (Snow Load)',
    'Roof (Non-Snow Load)',
    'Floor',
    'Cantilever Beam',
    'Custom Application'
  ], {
    required_error: 'Please select an application type'
  }),
  spanLength: z.enum([
    '< 10 ft',
    '10–20 ft',
    '20–30 ft',
    '30–40 ft',
    '40 ft'
  ], {
    required_error: 'Please select a span length'
  }),
  beamDimensions: z.enum([
    '3-1/8" x 12"',
    '3-1/8" x 18"',
    '5-1/8" x 12"',
    '5-1/8" x 18"',
    '6-3/4" x 24"',
    'Custom'
  ], {
    required_error: 'Please select beam dimensions'
  })
});

type GlulamFormData = z.infer<typeof glulamSchema>;

export const GlulamSpecs = () => {
  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm<GlulamFormData>({
    resolver: zodResolver(glulamSchema)
  });

  const onSubmit = (data: GlulamFormData) => {
    console.log('Glulam specs submitted:', data);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Glulam Specifications</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Application Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Application Type
          </label>
          <select
            {...register('applicationType')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Select application type</option>
            <option value="Roof (Snow Load)">Roof (Snow Load)</option>
            <option value="Roof (Non-Snow Load)">Roof (Non-Snow Load)</option>
            <option value="Floor">Floor</option>
            <option value="Cantilever Beam">Cantilever Beam</option>
            <option value="Custom Application">Custom Application</option>
          </select>
          {errors.applicationType && (
            <p className="mt-1 text-sm text-red-600">
              {errors.applicationType.message}
            </p>
          )}
        </div>

        {/* Span Length */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Span Length
          </label>
          <select
            {...register('spanLength')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Select span length</option>
            <option value="< 10 ft">Less than 10 ft</option>
            <option value="10–20 ft">10 to 20 ft</option>
            <option value="20–30 ft">20 to 30 ft</option>
            <option value="30–40 ft">30 to 40 ft</option>
            <option value="40 ft">40 ft or more</option>
          </select>
          {errors.spanLength && (
            <p className="mt-1 text-sm text-red-600">
              {errors.spanLength.message}
            </p>
          )}
        </div>

        {/* Beam Dimensions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Beam Dimensions
          </label>
          <select
            {...register('beamDimensions')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Select beam dimensions</option>
            <option value='3-1/8" x 12"'>3-1/8" x 12"</option>
            <option value='3-1/8" x 18"'>3-1/8" x 18"</option>
            <option value='5-1/8" x 12"'>5-1/8" x 12"</option>
            <option value='5-1/8" x 18"'>5-1/8" x 18"</option>
            <option value='6-3/4" x 24"'>6-3/4" x 24"</option>
            <option value="Custom">Custom</option>
          </select>
          {errors.beamDimensions && (
            <p className="mt-1 text-sm text-red-600">
              {errors.beamDimensions.message}
            </p>
          )}
        </div>

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