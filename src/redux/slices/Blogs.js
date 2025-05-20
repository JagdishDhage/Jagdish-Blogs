import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Blogs: []
};

const BlogSlice = createSlice({
    name: "Blog",
    initialState: initialState,
    reducers: {
        setBlog: (state, action) => {
            state.Blogs = action.payload;
        },
        getBlog: (state, action) => {
            state.Blogs = action.payload;
        }
    }
});

// Exporting actions
export const { setBlog, getBlog } = BlogSlice.actions;


export default BlogSlice.reducer;
