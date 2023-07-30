import { render, screen } from '@testing-library/react';

import Button from './button';

interface buttonProps {
  text: string,
  icon: any,
  link: string
}

const defaultProps: buttonProps = {
    text: "React",
    icon: "0",
    link: "#"
}

describe('Button', () => {
  it('renders button with text and link from props', () => {
    render(<Button {...defaultProps} />);

    const button = screen.getByRole('link');

    expect(button).toHaveTextContent(defaultProps.text)
    expect(button).toHaveAttribute('href', defaultProps.link)

  });
});