'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import api from '@/lib/api';
import { formatPrice } from '@/lib/utils';

export default function PricesPage() {
  const [filters, setFilters] = useState({
    country: '',
    category: '',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['prices', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.country) params.append('country', filters.country);
      if (filters.category) params.append('category', filters.category);
      
      const response = await api.get(`/prices?${params.toString()}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Price Database</h1>
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
          <h1 className="text-3xl font-bold mb-8">Price Database</h1>
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            Failed to load prices. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Price Database</h1>
          <Link
            href="/prices/report"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Report a Price
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                id="country"
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Filter by country"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                id="category"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Filter by category"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.prices?.map((price: any) => (
            <div key={price._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{price.item}</h3>
                  <p className="text-gray-600">{price.category}</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(price.price, price.currency)}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span> {price.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Country:</span> {price.country}
                </p>
                {price.notes && (
                  <p className="text-gray-600">
                    <span className="font-medium">Notes:</span> {price.notes}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Reported by {price.reportedBy?.username || 'Anonymous'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {data?.prices?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No prices found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
} 