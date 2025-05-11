import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProfilePage from './page';
import api from '@/lib/api';

// --- Mock Data ---
const mockUser = {
  username: 'testuser',
  email: 'test@example.com',
  createdAt: '2024-01-01T00:00:00.000Z',
};

const mockPrices = [
  {
    _id: '1',
    item: 'Coffee',
    category: 'Food',
    price: 3.50,
    currency: 'USD',
    location: 'Starbucks',
    country: 'USA',
    notes: 'Regular coffee',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    _id: '2',
    item: 'Bus Ticket',
    category: 'Transport',
    price: 2.00,
    currency: 'USD',
    location: 'Downtown',
    country: 'USA',
    createdAt: '2024-01-02T00:00:00.000Z',
  },
];

// --- Mocks ---
jest.mock('@/lib/api', () => ({
  get: jest.fn(),
  patch: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// --- Helper to render with QueryClientProvider ---
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.get as jest.Mock).mockImplementation((url: string) => {
      if (url === '/auth/me') {
        return Promise.resolve({ data: mockUser });
      }
      if (url === '/prices/user') {
        return Promise.resolve({ data: { prices: mockPrices } });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  it('renders loading state initially', () => {
    renderWithClient(<ProfilePage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays user information after loading', async () => {
    renderWithClient(<ProfilePage />);
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
  });

  it('displays user statistics', async () => {
    renderWithClient(<ProfilePage />);
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument(); // Total Reports
      expect(screen.getAllByText('USA').length).toBeGreaterThan(0); // Most Reported Country
      expect(screen.getAllByText('Food').length).toBeGreaterThan(0); // Most Reported Category
    });
  });

  it('displays price reports', async () => {
    renderWithClient(<ProfilePage />);
    await waitFor(() => {
      expect(screen.getByText('Coffee')).toBeInTheDocument();
      expect(screen.getByText('Bus Ticket')).toBeInTheDocument();
      expect(screen.getByText('$3.50')).toBeInTheDocument();
      expect(screen.getByText('$2.00')).toBeInTheDocument();
    });
  });

  it('allows editing profile information', async () => {
    renderWithClient(<ProfilePage />);
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Edit Profile'));
    await waitFor(() => {
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Current Password')).toBeInTheDocument();
      expect(screen.getByLabelText('New Password (leave blank to keep current)')).toBeInTheDocument();
    });
    (api.patch as jest.Mock).mockResolvedValueOnce({ data: { ...mockUser, username: 'newusername' } });
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'newusername' } });
    fireEvent.change(screen.getByLabelText('Current Password'), { target: { value: 'currentpass' } });
    fireEvent.click(screen.getByText('Save Changes'));
    await waitFor(() => {
      expect(api.patch).toHaveBeenCalledWith('/auth/profile', expect.any(Object));
    });
  });

  it('handles profile update errors', async () => {
    renderWithClient(<ProfilePage />);
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Edit Profile'));
    (api.patch as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: 'Invalid password' } },
    });
    fireEvent.change(screen.getByLabelText('Current Password'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByText('Save Changes'));
    await waitFor(() => {
      expect(screen.getByText('Invalid password')).toBeInTheDocument();
    });
  });
}); 