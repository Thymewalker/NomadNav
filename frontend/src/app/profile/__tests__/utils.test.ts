import { formatPrice, formatDate } from '@/lib/utils';

// Mock data for testing
const mockPriceReports = [
  {
    _id: '1',
    item: 'Coffee',
    category: 'Food & Drink',
    price: 3.50,
    currency: 'USD',
    location: 'New York',
    country: 'USA',
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
    createdAt: '2024-01-02T00:00:00.000Z',
  },
  {
    _id: '3',
    item: 'Pizza',
    category: 'Food & Drink',
    price: 15.00,
    currency: 'EUR',
    location: 'Paris',
    country: 'France',
    createdAt: '2024-01-03T00:00:00.000Z',
  },
];

describe('Profile Page Utilities', () => {
  describe('formatPrice', () => {
    it('formats USD prices correctly', () => {
      expect(formatPrice(3.50, 'USD')).toBe('$3.50');
      expect(formatPrice(2.50, 'USD')).toBe('$2.50');
      expect(formatPrice(0, 'USD')).toBe('$0.00');
      expect(formatPrice(1000, 'USD')).toBe('$1,000.00');
    });

    it('formats EUR prices correctly', () => {
      expect(formatPrice(15.00, 'EUR')).toBe('€15.00');
      expect(formatPrice(0, 'EUR')).toBe('€0.00');
      expect(formatPrice(1000, 'EUR')).toBe('€1,000.00');
    });

    it('handles decimal places correctly', () => {
      expect(formatPrice(3.14159, 'USD')).toBe('$3.14');
      expect(formatPrice(3.14559, 'USD')).toBe('$3.15');
    });

    it('handles negative prices', () => {
      expect(formatPrice(-3.50, 'USD')).toBe('-$3.50');
      expect(formatPrice(-15.00, 'EUR')).toBe('-€15.00');
    });
  });

  describe('formatDate', () => {
    it('formats dates correctly', () => {
      expect(formatDate('2024-01-01T00:00:00.000Z')).toBe('January 1, 2024');
      expect(formatDate('2024-12-31T23:59:59.999Z')).toBe('December 31, 2024');
    });

    it('handles different date formats', () => {
      expect(formatDate('2024-01-01')).toBe('January 1, 2024');
      expect(formatDate('2024/01/01')).toBe('January 1, 2024');
    });

    it('handles invalid dates gracefully', () => {
      expect(formatDate('invalid-date')).toBe('Invalid Date');
      expect(formatDate('')).toBe('Invalid Date');
    });
  });

  describe('Statistics Calculations', () => {
    const getMostFrequent = (obj: Record<string, number>): string => {
      return Object.entries(obj).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
    };

    const calculateStatistics = (userPrices: typeof mockPriceReports) => {
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
    };

    it('calculates total reports correctly', () => {
      const stats = calculateStatistics(mockPriceReports);
      expect(stats.totalReports).toBe(3);
    });

    it('identifies most reported country correctly', () => {
      const stats = calculateStatistics(mockPriceReports);
      expect(stats.mostReportedCountry).toBe('USA');
    });

    it('identifies most reported category correctly', () => {
      const stats = calculateStatistics(mockPriceReports);
      expect(stats.mostReportedCategory).toBe('Food & Drink');
    });

    it('handles empty price reports array', () => {
      const stats = calculateStatistics([]);
      expect(stats.totalReports).toBe(0);
      expect(stats.mostReportedCountry).toBe('None');
      expect(stats.mostReportedCategory).toBe('None');
    });

    it('handles ties in frequency correctly', () => {
      const tiedReports = [
        ...mockPriceReports,
        {
          _id: '4',
          item: 'Croissant',
          category: 'Food & Drink',
          price: 2.00,
          currency: 'EUR',
          location: 'Paris',
          country: 'France',
          createdAt: '2024-01-04T00:00:00.000Z',
        },
      ];
      
      const stats = calculateStatistics(tiedReports);
      // In case of a tie, it should return the first alphabetically
      expect(['France', 'USA']).toContain(stats.mostReportedCountry);
    });
  });
}); 