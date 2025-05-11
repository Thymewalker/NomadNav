'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatPrice, formatDate } from '@/lib/utils';
import api from '@/lib/api';

// --- Types ---
interface User {
  username: string;
  email: string;
  createdAt: string;
}

interface PriceReport {
  _id: string;
  item: string;
  category: string;
  price: number;
  currency: string;
  location: string;
  country: string;
  notes?: string;
  createdAt: string;
}

interface Statistics {
  totalReports: number;
  mostReportedCountry: string;
  mostReportedCategory: string;
}

// --- Utility Functions ---
function getMostFrequent(obj: Record<string, number>): string {
  return Object.entries(obj).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
}

function calculateStatistics(userPrices: PriceReport[] | undefined): Statistics | null {
  if (!userPrices) return null;
  const countryCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};
  userPrices.forEach((p) => {
    countryCounts[p.country] = (countryCounts[p.country] || 0) + 1;
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });
  return {
    totalReports: userPrices.length,
    mostReportedCountry: getMostFrequent(countryCounts),
    mostReportedCategory: getMostFrequent(categoryCounts),
  };
}

// --- Subcomponents ---
function ProfileForm({ user, loading, error, onSubmit, onCancel }: {
  user: User;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={user.username}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={user.email}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password (leave blank to keep current)</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ProfileInfo({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-500">Username</h3>
        <p className="mt-1 text-lg">{user.username}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">Email</h3>
        <p className="mt-1 text-lg">{user.email}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
        <p className="mt-1 text-lg">{formatDate(user.createdAt)}</p>
      </div>
    </div>
  );
}

function StatisticsCard({ stats }: { stats: Statistics }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Your Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800">Total Reports</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.totalReports}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-800">Most Reported Country</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{stats.mostReportedCountry}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-purple-800">Most Reported Category</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">{stats.mostReportedCategory}</p>
        </div>
      </div>
    </div>
  );
}

function PriceReportList({ userPrices, isLoading }: { userPrices: PriceReport[] | undefined; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded" />
        ))}
      </div>
    );
  }
  if (!userPrices || userPrices.length === 0) {
    return <p className="text-gray-600">You haven't submitted any price reports yet.</p>;
  }
  return (
    <div className="space-y-6">
      {userPrices.map((price) => (
        <div key={price._id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{price.item}</h3>
              <p className="text-gray-600">{price.category}</p>
            </div>
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(price.price, price.currency)}
            </span>
          </div>
          <div className="mt-2 space-y-1">
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
              Reported on {formatDate(price.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Main Component ---
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: user, isLoading: isLoadingUser } = useQuery<User>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data;
    },
  });

  const { data: userPrices, isLoading: isLoadingPrices } = useQuery<PriceReport[]>({
    queryKey: ['userPrices'],
    queryFn: async () => {
      const response = await api.get('/prices/user');
      return response.data.prices;
    },
  });

  const stats = calculateStatistics(userPrices);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const userData = {
      username: formData.get('username'),
      email: formData.get('email'),
      currentPassword: formData.get('currentPassword'),
      newPassword: formData.get('newPassword'),
    };
    try {
      await api.patch('/auth/profile', userData);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  }

  if (isLoadingUser || !user) {
    return (
      <div className="min-h-screen bg-gray-50 p-8" role="status">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 hover:text-blue-700"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          {isEditing ? (
            <ProfileForm
              user={user}
              loading={loading}
              error={error}
              onSubmit={handleSubmit}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <ProfileInfo user={user} />
          )}
        </div>
        {stats && <StatisticsCard stats={stats} />}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Your Price Reports</h2>
          <PriceReportList userPrices={userPrices} isLoading={isLoadingPrices} />
        </div>
      </div>
    </div>
  );
} 