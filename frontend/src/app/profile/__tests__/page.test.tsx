import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProfilePage from '../page';
import api from '@/lib/api';

// Mock the API module
jest.mock('@/lib/api', () => ({
  get: jest.fn(),
  patch: jest.fn(),
}));

// Mock data
const mockUser = {
  username: 'testuser',
  email: 'test@example.com',
  createdAt: '2024-01-01T00:00:00.000Z',
};

const mockPriceReports = [
  {
    _id: '1',
    item: 'Coffee',
    category: 'Food & Drink',
    price: 3.50,
    currency: 'USD',
    location: 'New York',
    country: 'USA',
    notes: 'Regular coffee',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    _id: '2',
    item: 'Bread',
    category: 'Food & Drink',
    price: 2.50,
    currency: 'USD',
    location: 'Boston',
    country: 'USA',
    notes: 'Whole wheat',
    createdAt: '2024-01-02T00:00:00.000Z',
  },
];

// Helper function to render the component with necessary providers
const renderProfilePage = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ProfilePage />
    </QueryClientProvider>
  );
};

describe('ProfilePage', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock responses
    (api.get as jest.Mock).mockImplementation((url) => {
      if (url === '/auth/me') {
        return Promise.resolve({ data: mockUser });
      }
      if (url === '/prices/user') {
        return Promise.resolve({ data: { prices: mockPriceReports } });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  it('renders loading state initially', () => {
    renderProfilePage();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays user information correctly', async () => {
    renderProfilePage();
    
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
  });

  it('displays statistics correctly', async () => {
    renderProfilePage();
    
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument(); // Total Reports
      expect(screen.getByText('USA')).toBeInTheDocument(); // Most Reported Country
      expect(screen.getByText('Food & Drink')).toBeInTheDocument(); // Most Reported Category
    });
  });

  it('displays price reports correctly', async () => {
    renderProfilePage();
    
    await waitFor(() => {
      expect(screen.getByText('Coffee')).toBeInTheDocument();
      expect(screen.getByText('Bread')).toBeInTheDocument();
      expect(screen.getByText('$3.50')).toBeInTheDocument();
      expect(screen.getByText('$2.50')).toBeInTheDocument();
    });
  });

  it('handles edit mode toggle', async () => {
    renderProfilePage();
    
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit Profile'));

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/current password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
  });

  it('handles profile update submission', async () => {
    (api.patch as jest.Mock).mockResolvedValueOnce({ data: { ...mockUser, username: 'updateduser' } });
    
    renderProfilePage();
    
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit Profile'));

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const currentPasswordInput = screen.getByLabelText(/current password/i);
    const newPasswordInput = screen.getByLabelText(/new password/i);

    fireEvent.change(usernameInput, { target: { value: 'updateduser' } });
    fireEvent.change(emailInput, { target: { value: 'updated@example.com' } });
    fireEvent.change(currentPasswordInput, { target: { value: 'currentpass' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newpass' } });

    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(api.patch).toHaveBeenCalledWith('/auth/profile', {
        username: 'updateduser',
        email: 'updated@example.com',
        currentPassword: 'currentpass',
        newPassword: 'newpass',
      });
    });
  });

  it('handles error state during profile update', async () => {
    (api.patch as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: 'Invalid password' } },
    });
    
    renderProfilePage();
    
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit Profile'));

    const usernameInput = screen.getByLabelText(/username/i);
    const currentPasswordInput = screen.getByLabelText(/current password/i);

    fireEvent.change(usernameInput, { target: { value: 'updateduser' } });
    fireEvent.change(currentPasswordInput, { target: { value: 'wrongpass' } });

    fireEvent.click(screen.getByText('Save Changes'));

    await waitFor(() => {
      expect(screen.getByText('Invalid password')).toBeInTheDocument();
    });
  });

  it('displays empty state for no price reports', async () => {
    (api.get as jest.Mock).mockImplementationOnce((url) => {
      if (url === '/auth/me') {
        return Promise.resolve({ data: mockUser });
      }
      if (url === '/prices/user') {
        return Promise.resolve({ data: { prices: [] } });
      }
      return Promise.reject(new Error('Not found'));
    });

    renderProfilePage();
    
    await waitFor(() => {
      expect(screen.getByText("You haven't submitted any price reports yet.")).toBeInTheDocument();
    });
  });
}); 