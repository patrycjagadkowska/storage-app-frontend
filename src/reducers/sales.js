export const initState = {
    sales: [],
    categories: [],
    contacts: [],
    items: [],
    showForm: false,
    chosenCategory: null,
    chosenSale: null,
    openModal: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "set_sales": {
            return {
                ...state,
                sales: action.data
            };
        }
        case "set_categories": {
            return {
                ...state,
                categories: action.data
            };
        }
        case "set_contacts": {
            return {
                ...state,
                contacts: action.data
            };
        }
        case "set_items": {
            return {
                ...state, 
                items: action.data
            };
        }
        case "set_form": {
            return {
                ...state,
                showForm: action.data
            };
        }
        case "set_category": {
            return {
                ...state,
                chosenCategory: action.data
            };
        }
        case "set_sale": {
            return {
                ...state,
                chosenSale: action.data
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