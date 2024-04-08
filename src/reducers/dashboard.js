export const initState = {
    monthlyIncomeData: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "set_monthly_income_data": {
            return {
                ...state, 
                monthlyIncomeData: action.data
            };
        }
        default: {
            return state;
        }
    }
};