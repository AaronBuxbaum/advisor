import { describe, it, expect } from 'bun:test';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge, StatusBadge, PriorityBadge } from '@/components/ui/Badge';

describe('Badge Component', () => {
  describe('Badge', () => {
    it('renders children correctly', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('applies default variant styles', () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
    });

    it('applies success variant styles', () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText('Success');
      expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('applies warning variant styles', () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText('Warning');
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });

    it('applies error variant styles', () => {
      render(<Badge variant="error">Error</Badge>);
      const badge = screen.getByText('Error');
      expect(badge).toHaveClass('bg-red-100', 'text-red-800');
    });

    it('applies info variant styles', () => {
      render(<Badge variant="info">Info</Badge>);
      const badge = screen.getByText('Info');
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-700');
    });

    it('applies small size styles', () => {
      render(<Badge size="sm">Small</Badge>);
      const badge = screen.getByText('Small');
      expect(badge).toHaveClass('text-xs');
    });

    it('applies medium size styles', () => {
      render(<Badge size="md">Medium</Badge>);
      const badge = screen.getByText('Medium');
      expect(badge).toHaveClass('text-sm');
    });
  });

  describe('StatusBadge', () => {
    it('renders completed status with success variant', () => {
      render(<StatusBadge status="completed" />);
      const badge = screen.getByText('completed');
      expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('renders in_progress status with warning variant', () => {
      render(<StatusBadge status="in_progress" />);
      const badge = screen.getByText('in progress');
      expect(badge).toBeInTheDocument();
    });

    it('renders pending status with warning variant', () => {
      render(<StatusBadge status="pending" />);
      const badge = screen.getByText('pending');
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });

    it('renders cancelled status with error variant', () => {
      render(<StatusBadge status="cancelled" />);
      const badge = screen.getByText('cancelled');
      expect(badge).toHaveClass('bg-red-100', 'text-red-800');
    });

    it('converts underscores to spaces', () => {
      render(<StatusBadge status="under_review" />);
      expect(screen.getByText('under review')).toBeInTheDocument();
    });
  });

  describe('PriorityBadge', () => {
    it('renders low priority with default variant', () => {
      render(<PriorityBadge priority="low" />);
      const badge = screen.getByText('low');
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
    });

    it('renders normal priority with info variant', () => {
      render(<PriorityBadge priority="normal" />);
      const badge = screen.getByText('normal');
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-700');
    });

    it('renders high priority with warning variant', () => {
      render(<PriorityBadge priority="high" />);
      const badge = screen.getByText('high');
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });

    it('renders urgent priority with error variant', () => {
      render(<PriorityBadge priority="urgent" />);
      const badge = screen.getByText('urgent');
      expect(badge).toHaveClass('bg-red-100', 'text-red-800');
    });
  });
});
