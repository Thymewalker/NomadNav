'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import api from '@/lib/api';

export default function CountryPage() {
  const { code } = useParams();
  const { data: country, isLoading, error } = useQuery({
    queryKey: ['country', code],
    queryFn: async () => {
      const response = await api.get(`/countries/${code}`);
      return response.data.country;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            Failed to load country information. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{country.name}</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Essential Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Currency</p>
                <p className="font-medium">{country.currency}</p>
              </div>
              <div>
                <p className="text-gray-600">Language</p>
                <p className="font-medium">{country.language}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Emergency Numbers</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Police</p>
                <p className="font-medium">{country.emergencyNumbers.police}</p>
              </div>
              <div>
                <p className="text-gray-600">Ambulance</p>
                <p className="font-medium">{country.emergencyNumbers.ambulance}</p>
              </div>
              <div>
                <p className="text-gray-600">Fire</p>
                <p className="font-medium">{country.emergencyNumbers.fire}</p>
              </div>
              <div>
                <p className="text-gray-600">Tourist Police</p>
                <p className="font-medium">{country.emergencyNumbers.touristPolice}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Visa Requirements</h2>
            <p className="text-gray-700">{country.visaRequirements}</p>
          </section>

          {country.guides?.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Guides</h2>
              <div className="space-y-4">
                {country.guides.map((guide: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="text-xl font-medium mb-2">{guide.title}</h3>
                    <p className="text-gray-700">{guide.content}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {country.transport?.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Transport</h2>
              <div className="space-y-4">
                {country.transport.map((item: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="text-xl font-medium mb-2">{item.type}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <p className="text-blue-600">{item.tips}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {country.hagglingTips?.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Haggling Tips</h2>
              <div className="space-y-4">
                {country.hagglingTips.map((tip: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="text-xl font-medium mb-2">{tip.title}</h3>
                    <p className="text-gray-700">{tip.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
} 