export const initState = {
    monthlyIncomeData: {},
    sixMonthsData: [],
    lastMonthData: []
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "set_monthly_income_data": {
            if (!action.data || typeof action.data !== "object") {
                return {
                    ...state, 
                    monthlyIncomeData: {}
                };
            }
            return {
                ...state, 
                monthlyIncomeData: action.data
            };
        }
        case "set_six_months_data": {
            if (!action.data || !Array.isArray(action.data)) {
                return {
                    ...state, 
                    sixMonthsData: []
                };
            }
            return {
                ...state,
                sixMonthsData: action.data
            }
        }
        case "set_last_month_data": {
            if (!action.data || !Array.isArray(action.data)) {
                return {
                    ...state,
                    lastMonthData: []
                };
            }
            return {
                ...state,
                lastMonthData: action.data
            };
        }
        default: {
            return state;
        }
    }
};