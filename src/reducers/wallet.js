// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { DEL_EXPENSE, SEND_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DEL_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
