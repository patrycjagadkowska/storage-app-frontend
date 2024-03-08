export const initState = {
    contacts: [],
    showForm: false,
    openModal: null,
    chosenContact: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "set_contacts": {
            const { data } = action;
            if (!data || !Array.isArray(data) || data.length <= -1) {
                return { ...state, contacts: [] };
            }
            return {
                ...state, 
                contacts: data
            };
        }
        case "display_form": {
            return {
                ...state, showForm: true
            };
        }
        case "hide_form": {
            return {
                ...state, shwForm: false
            };
        }
        case "set_modal": {
            return {
                ...state,
                openModal: action.data ? action.data : null 
            };
        }
        case "set_contact": {
            return {
                ...state, chosenContact: action.data ? action.data : null
            };
        }
        default: {
            return state;
        }
    }
};