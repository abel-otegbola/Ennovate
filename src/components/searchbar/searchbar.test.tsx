import { render, screen } from '@testing-library/react';

import SearchBar from './searchbar';

describe('Button', () => {
  it('renders input and button elements', () => {
    render(<SearchBar />);

    const form = screen.getByRole('form');

    expect(form).toHaveFormValues({search: ""})

  });
});