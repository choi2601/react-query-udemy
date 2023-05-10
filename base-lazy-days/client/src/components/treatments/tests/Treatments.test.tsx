import { render, screen } from '@testing-library/react';

import { renderWithQueryClient } from '../../../test-utils';
import { Treatments } from '../Treatments';

test('renders response from query', async () => {
  renderWithQueryClient(<Treatments />);

  const treamentTitles = await screen.findByRole('heading', {
    name: /massage|facial|scrub/i,
  });

  expect(treamentTitles).toHaveLength(3);
});
