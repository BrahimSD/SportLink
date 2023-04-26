import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from '../src/onglets/signUpComps/SignUp'

describe('SignUp component', () => {
  test('renders SignUp component', () => {
    render(<SignUp />);
    const signUpElement = screen.getByText('Sign up');
    expect(signUpElement).toBeInTheDocument();
  });

  test('shows error message when form is submitted with empty fields', () => {
    render(<SignUp />);
    const signUpButton = screen.getByRole('button', { name: /Sign up/i });
    fireEvent.click(signUpButton);
    const errorMessage = screen.getByText('All fields are required');
    expect(errorMessage).toBeInTheDocument();
  });

  test('updates userData state when inputs are changed', () => {
    render(<SignUp />);
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const fileInput = screen.getByLabelText('Upload a profile picture');
    userEvent.type(firstNameInput, 'John');
    userEvent.type(lastNameInput, 'Doe');
    userEvent.type(emailInput, 'johndoe@example.com');
    userEvent.type(passwordInput, 'password');
    userEvent.type(confirmPasswordInput, 'password');
    fireEvent.change(fileInput, { target: { files: [new File(['avatar.png'], { type: 'image/png' })] } });
    expect(firstNameInput).toHaveValue('John');
    expect(lastNameInput).toHaveValue('Doe');
    expect(emailInput).toHaveValue('johndoe@example.com');
    expect(passwordInput).toHaveValue('password');
    expect(confirmPasswordInput).toHaveValue('password');
    expect(fileInput.files[0].name).toBe('avatar.png');
  });
});
