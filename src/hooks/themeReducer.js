// Handle toggle dark mode reducer
const themeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'TOGGLE_DARK_MODE':
            return {
                isDark: !state.isDark,
            };
        default:
            return state;
    }
};

export default themeReducer;
