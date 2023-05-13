import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { createQueryClientWrapper } from 'test-utils';

import { useStaff } from '../hooks/useStaff';

test('filter staff', async () => {
  const { result, waitFor } = renderHook(useStaff, {
    wrapper: createQueryClientWrapper(),
  });

  // wait for staff to populate
  await waitFor(() => result.current.staff.length === 4);

  // set to filter for only staff who give masssage
  act(() => result.current.setFilter('facial'));

  // wait for the staff list to display only 3
  await waitFor(() => result.current.staff.length === 3);
});
