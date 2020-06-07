// export const OPEN_DROPDOWN = 'OPEN_DROPDOWN';
// export const CLOSE_DROPDOWN = 'CLOSE_DROPDOWN';
export const EDIT_NOTEBOOK_ID = "EDIT_NOTEBOOK_ID";

//  ui actions
export const editNotebookId = (notebookId) => {
    return {
        type: EDIT_NOTEBOOK_ID,
        notebookId
    }
};

// export const openDropdown = (dropdown) => {
//     return {
//         type: OPEN_DROPDOWN,
//         dropdown
//     }
// };

// export const closeDropdown = () => {
//     return {
//         type: CLOSE_DROPDOWN
//     }
// };