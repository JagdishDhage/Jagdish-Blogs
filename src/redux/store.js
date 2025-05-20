import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/Blogs';  // ✅ Make sure this is correctly imported

export const store = configureStore({
  reducer: {
    blog: blogReducer, // ✅ Ensure key name matches slice
  },
});

   // ✅ Make sure you're using "export default"
