import { styled } from '@asyncing/styled';

const Button = styled.button<{ $open: boolean }>`
  align-items: center;
  background: ${({ theme }) => theme.color.background};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 0.35rem;
  cursor: pointer;
  display: none;
  flex-direction: column;
  gap: 0.25rem;
  height: 2.5rem;
  justify-content: center;
  left: 1rem;
  padding: 0;
  position: fixed;
  top: 1rem;
  width: 2.5rem;
  z-index: 30;

  span {
    background: ${({ theme }) => theme.color.ink};
    display: block;
    height: 1px;
    transition:
      transform 160ms ease,
      opacity 160ms ease;
    width: 1rem;
  }

  ${({ $open }) =>
    $open &&
    `
      span:nth-child(1) { transform: translateY(5px) rotate(45deg); }
      span:nth-child(2) { opacity: 0; }
      span:nth-child(3) { transform: translateY(-5px) rotate(-45deg); }
    `}

  @media (max-width: ${({ theme }) => theme.breakpoint.sidebar}) {
    display: flex;
  }
`;

type SidebarToggleProps = {
  isOpen: boolean;
  onClick: () => void;
};

export function SidebarToggle({ isOpen, onClick }: SidebarToggleProps) {
  return (
    <Button
      $open={isOpen}
      aria-controls="textbook-sidebar"
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close chapters' : 'Open chapters'}
      onClick={onClick}
    >
      <span />
      <span />
      <span />
    </Button>
  );
}
