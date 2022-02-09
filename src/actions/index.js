// Coloque aqui suas actions
export const SEND_EMAIL = 'SEND_EMAIL';

export const sendEmail = (email) => ({
  type: SEND_EMAIL,
  email,
});
