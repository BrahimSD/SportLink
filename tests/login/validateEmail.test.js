import { validateEmail } from './Login';

describe('validateEmail function', () => {
  it('should return true for valid email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('user.lastname@example.com')).toBe(true);
    expect(validateEmail('user123@example.com')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(validateEmail('userexample.com')).toBe(false);
    expect(validateEmail('user@.com')).toBe(false);
    expect(validateEmail('user@example.')).toBe(false);
    expect(validateEmail('user@.example.com')).toBe(false);
  });
});
