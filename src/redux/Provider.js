// app/providers.js
'use client';

import { Provider } from 'react-redux';
import { store } from './store'; // ✅ correct import

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
