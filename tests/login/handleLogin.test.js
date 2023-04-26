import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  it('should call handleLogin function when login button is clicked', () => {
    const handleLogin = jest.fn();
    const { getByText } = render(<Login handleLogin={handleLogin} />);

    const loginButton = getByText('Login');
    fireEvent.click(loginButton);

    expect(handleLogin).toHaveBeenCalled();
  });
});
