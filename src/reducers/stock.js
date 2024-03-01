export const initState = {
    categories: [],
    items: [],
    showForm: false,
    chosenFilterCategory: null,
    chosenCategory: null,
    chosenItem: null,
    openModal: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "display_form": {
            return {
                ...state,
                showForm: true
            };
        }
        case "hide_form": {
            return {
                ...state,
                showForm: false
            };
        }
        case "set_categories": {
            return {
                ...state,
                categories: action.data
            };
        }
        case "set_items": {
            return {
                ...state,
                items: action.data
            };
        }
        case "set_filter_category": {
            return {
                ...state,
                chosenFilterCategory: action.data.length > 0 ? action.data : null
            };
        }
        case "set_item": {
            return {
                ...state, 
                chosenItem: action.data
            };
        }
        case "set_category": {
            return {
                ...state, 
                chosenCategory: action.data
            };
        }
        case "set_modal": {
            return {
                ...state,
                openModal: action.data ? action.data : null
            };
        }
        default: {
            return state;
        }
    }
};