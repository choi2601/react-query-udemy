import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

import { generateQueryClient } from '../react-query/queryClient';

setLogger({
  log: console.log,
  warn: console.log,
  error: () => {
    // swallow errors without printing out
  },
});

const generateTestQueryClient = () => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient,
): RenderResult {
  const queryClient = client ?? generateTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createQueryClientWrapper = () => {
  const queryClient = generateTestQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
