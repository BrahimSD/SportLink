import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  it('should capture user input', () => {
    const { getByLabelText } = render(<Login />);

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'brahim@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('brahim@gmail.com');
    expect(passwordInput.value).toBe('123456');
  });
});
