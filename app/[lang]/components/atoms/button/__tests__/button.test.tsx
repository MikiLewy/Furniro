import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../button';

describe('Button', () => {
  it('should render a button', () => {
    const buttonContent = 'Click me!';

    render(<Button>{buttonContent}</Button>);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render button with text content', () => {
    const buttonContent = 'Click me!';

    render(<Button>{buttonContent}</Button>);

    expect(screen.getByText(buttonContent));
  });

  it('should call onClick callback when clicked', () => {
    const onClickMock = jest.fn();

    const buttonContent = 'Click me!';

    render(<Button onClick={onClickMock}>{buttonContent}</Button>);

    fireEvent.click(screen.getByText(buttonContent));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const buttonContent = 'Click me!';

    render(<Button disabled>{buttonContent}</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('disabled');
  });

  it('should render a different variant when provided', () => {
    const buttonContent = 'Click me!';

    render(<Button variant="outlined">{buttonContent}</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('btn-outlined');
  });

  it('should render a different color variant when provided', () => {
    const buttonContent = 'Click me!';

    render(
      <Button color="white" variant="outlined">
        {buttonContent}
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass('btn-outlined-white');
  });

  it('should render a different size when provided', () => {
    const buttonContent = 'Click me!';

    render(<Button size="sm">{buttonContent}</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('btn-sm');
  });

  it('should render a button with loading state', () => {
    const buttonContent = 'Click me!';

    render(<Button loading>{buttonContent}</Button>);

    expect(screen.getByRole('button')).toHaveTextContent('Loading...');
  });
});
