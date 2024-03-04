export const initState = {
    supplies: [],
    categories: [],
    contacts: [],
    items: [],
    showFrom: false,
    openModal: null, 
    chosenSupply: null,
    chosenCategory: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "set_supplies": {
            return {
                ...state,
                supplies: action.data
            };
        }
        case "set_categories": {
            return {
                ...state, 
                categories: action.data
            };
        }
        case "add_category": {
            const updatedCategories = [...state.categories];
            updatedCategories.push(action.data);
            return {
                ...state,
                categories: updatedCategories
            };
        }
        case "set_contacts": {
            return {
                ...state, 
                contacts: action.data
            };
        }
        case "add_contact": {
            const updatedContacts = [...state.contacts];
            updatedContacts.push(action.data);
            return {
                ...state,
                contacts: updatedContacts
            };
        }
        case "set_items": {
            return {
                ...state,
                items: action.data
            };
        }
        case "add_item": {
            const updatedItems = [...state.items];
            updatedItems.push(action.data);
            return {
                ...state,
                items: updatedItems
            };
        }
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
        case "show_modal": {
            return {
                ...state,
                openModal: action.data ? action.data : null
            };
        }
        case "set_supply": {
            return {
                ...state,
                chosenSupply: action.data
            };
        }
        case "set_category": {
            return {
                ...state,
                chosenCategory: action.data
            };
        }
        default: {
            return state;
        }
    }
};