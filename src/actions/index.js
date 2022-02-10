// Coloque aqui suas actions
export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_EXPENSES = 'SEND_EXPENSES';

export const sendEmail = (email) => ({
  type: SEND_EMAIL,
  email,
});

export const sendExpenses = (payload) => ({
  type: SEND_EXPENSES,
  payload,
});
