import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../src/onglets/loginComps/Login';

jest.mock('../../dataContext', () => ({
  DataContext: {
    Consumer: ({ children }) =>
      children({
        signin: jest.fn(),
        currentUser: null,
      }),
  },
}));

describe('Login component', () => {
  it('should render the login form', () => {
    const { getByLabelText, getByText } = render(<Login />);

    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
  });

  it('should display an error message when the email is invalid', () => {
    const { getByLabelText, getByText } = render(<Login />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    expect(getByText('Entrez un email valide !')).toBeInTheDocument();
  });

  it('should call the signin function when the login button is clicked with valid email and password', async () => {
    const signin = jest.fn();
    const { getByLabelText, getByText } = render(
      <DataContext.Provider value={{ signin, currentUser: null }}>
        <Login />
      </DataContext.Provider>
    );
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(signin).toHaveBeenCalledWith('valid-email@example.com', 'password');
    });
  });

  it('should navigate to /myhome if currentUser is not null', async () => {
    const navigate = jest.fn();
    const { rerender } = render(
      <DataContext.Provider value={{ signin: jest.fn(), currentUser: null }}>
        <Login navigate={navigate} />
      </DataContext.Provider>
    );

    rerender(
      <DataContext.Provider value={{ signin: jest.fn(), currentUser: { email: 'test@example.com' } }}>
        <Login navigate={navigate} />
      </DataContext.Provider>
    );

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/myhome');
    });
  });
});
