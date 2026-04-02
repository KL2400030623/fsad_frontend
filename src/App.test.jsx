import { render, screen } from '@testing-library/react';
import App from './App';

test('renders online medical system header', () => {
  render(<App />);
  const heading = screen.getByText(/online medical system/i);
  expect(heading).toBeInTheDocument();
});
