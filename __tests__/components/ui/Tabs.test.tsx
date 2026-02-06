import { describe, it, expect } from 'bun:test';
import { render, screen, fireEvent } from '@testing-library/react';
import { spyOn } from 'bun:test';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

describe('Tabs Components', () => {
  const renderTabs = (defaultValue = 'tab1') => {
    return render(
      <Tabs defaultValue={defaultValue}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>
    );
  };

  describe('Tabs', () => {
    it('renders with default tab selected', () => {
      renderTabs('tab1');
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1" className="custom-tabs">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
        </Tabs>
      );
      expect(document.querySelector('.custom-tabs')).toBeInTheDocument();
    });
  });

  describe('TabsList', () => {
    it('renders all tab triggers', () => {
      renderTabs();
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 3')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className="custom-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      );
      expect(document.querySelector('.custom-list')).toBeInTheDocument();
    });
  });

  describe('TabsTrigger', () => {
    it('switches content when clicked', () => {
      renderTabs('tab1');
      expect(screen.getByText('Content 1')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Tab 2'));
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('shows active styling for selected tab', () => {
      renderTabs('tab1');
      const tab1Button = screen.getByText('Tab 1');
      expect(tab1Button).toHaveClass('border-blue-600');
      expect(tab1Button).toHaveClass('text-blue-600');
    });

    it('shows inactive styling for non-selected tabs', () => {
      renderTabs('tab1');
      const tab2Button = screen.getByText('Tab 2');
      expect(tab2Button).toHaveClass('border-transparent');
      expect(tab2Button).toHaveClass('text-gray-500');
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" className="custom-trigger">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content</TabsContent>
        </Tabs>
      );
      expect(screen.getByText('Tab 1')).toHaveClass('custom-trigger');
    });

    it('throws error when used outside Tabs', () => {
      // Suppress console.error for this test
      const consoleSpy = spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TabsTrigger value="tab1">Tab 1</TabsTrigger>);
      }).toThrow('TabsTrigger must be used within Tabs');

      consoleSpy.mockRestore();
    });
  });

  describe('TabsContent', () => {
    it('only renders content for active tab', () => {
      renderTabs('tab2');
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="custom-content">Content</TabsContent>
        </Tabs>
      );
      expect(document.querySelector('.custom-content')).toBeInTheDocument();
    });

    it('throws error when used outside Tabs', () => {
      // Suppress console.error for this test
      const consoleSpy = spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TabsContent value="tab1">Content</TabsContent>);
      }).toThrow('TabsContent must be used within Tabs');

      consoleSpy.mockRestore();
    });
  });

  describe('Tab Navigation', () => {
    it('can navigate through all tabs', () => {
      renderTabs('tab1');

      // Start at tab 1
      expect(screen.getByText('Content 1')).toBeInTheDocument();

      // Go to tab 2
      fireEvent.click(screen.getByText('Tab 2'));
      expect(screen.getByText('Content 2')).toBeInTheDocument();

      // Go to tab 3
      fireEvent.click(screen.getByText('Tab 3'));
      expect(screen.getByText('Content 3')).toBeInTheDocument();

      // Go back to tab 1
      fireEvent.click(screen.getByText('Tab 1'));
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });
  });
});
