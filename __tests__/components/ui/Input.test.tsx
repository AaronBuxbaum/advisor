import { render, screen, fireEvent } from '@testing-library/react';
import { Input, Textarea, Select } from '@/components/ui/Input';

describe('Input Component', () => {
  it('renders input without label', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders input with label', () => {
    render(<Input label="Username" placeholder="Enter username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('renders input with error', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('custom-class');
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} data-testid="input" />);
    fireEvent.change(screen.getByTestId('input'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders without error styling when no error', () => {
    render(<Input data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('border-gray-300');
  });

  it('renders with error styling when error present', () => {
    render(<Input error="Error message" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveClass('border-red-500');
  });
});

describe('Textarea Component', () => {
  it('renders textarea without label', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders textarea with label', () => {
    render(<Textarea label="Description" placeholder="Enter description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter description')).toBeInTheDocument();
  });

  it('renders textarea with error', () => {
    render(<Textarea label="Bio" error="Bio is required" />);
    expect(screen.getByText('Bio is required')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-class" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('custom-class');
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} data-testid="textarea" />);
    fireEvent.change(screen.getByTestId('textarea'), { target: { value: 'test content' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders without error styling when no error', () => {
    render(<Textarea data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('border-gray-300');
  });

  it('renders with error styling when error present', () => {
    render(<Textarea error="Error message" data-testid="textarea" />);
    expect(screen.getByTestId('textarea')).toHaveClass('border-red-500');
  });
});

describe('Select Component', () => {
  it('renders select without label', () => {
    render(
      <Select data-testid="select">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>
    );
    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('renders select with label', () => {
    render(
      <Select label="Category" data-testid="select">
        <option value="1">Category 1</option>
      </Select>
    );
    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('renders select with error', () => {
    render(
      <Select label="Type" error="Please select a type" data-testid="select">
        <option value="">Select...</option>
      </Select>
    );
    expect(screen.getByText('Please select a type')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Select className="custom-select" data-testid="select">
        <option value="1">Option</option>
      </Select>
    );
    expect(screen.getByTestId('select')).toHaveClass('custom-select');
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    render(
      <Select onChange={handleChange} data-testid="select">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>
    );
    fireEvent.change(screen.getByTestId('select'), { target: { value: 'b' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders without error styling when no error', () => {
    render(
      <Select data-testid="select">
        <option value="1">Option</option>
      </Select>
    );
    expect(screen.getByTestId('select')).toHaveClass('border-gray-300');
  });

  it('renders with error styling when error present', () => {
    render(
      <Select error="Required" data-testid="select">
        <option value="1">Option</option>
      </Select>
    );
    expect(screen.getByTestId('select')).toHaveClass('border-red-500');
  });
});
