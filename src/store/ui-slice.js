import { createSlice } from "@reduxjs/toolkit";
let darkMood = localStorage.getItem("DarkMood");
let isDark = JSON.parse(darkMood) || false;

const uiSlice = createSlice({
  name: "toggle theme",
  initialState: { isDarkMood: isDark.isActive },
  reducers: {
    toggleTheme(state) {
      state.isDarkMood = !state.isDarkMood;
      localStorage.setItem("DarkMood", JSON.stringify({ isActive: state.isDarkMood }));
    },
    setToggleState(state){
        localStorage.setItem("DarkMood", JSON.stringify({ isActive: state.isDarkMood }))
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
