import { styled } from '../theme';

const Container = styled.main`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export function EmptyState() {
  return (
    <Container>
      <p>
        Add a Markdown file to <code>src/content</code> to start your textbook.
      </p>
    </Container>
  );
}
