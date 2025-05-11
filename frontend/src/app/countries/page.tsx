'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import api from '@/lib/api';

export default function CountriesPage() {
  const { data: countries, isLoading, error } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await api.get('/countries');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Countries</h1>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Countries</h1>
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            Failed to load countries. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Countries</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries?.map((country: any) => (
            <Link
              key={country._id}
              href={`/countries/${country.code}`}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{country.name}</h2>
              <div className="text-gray-600 space-y-1">
                <p>Currency: {country.currency}</p>
                <p>Language: {country.language}</p>
                {country.guides?.length > 0 && (
                  <p className="text-blue-600">{country.guides.length} guides available</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 