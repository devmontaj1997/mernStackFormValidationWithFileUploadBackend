export const isEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
export const isPhone = (number) => {
    const phoneRegex = /^(\+?[0-9]{1,4})?[-. ]?([0-9]{1,4})?[-. ]?([0-9]{1,4})?[-. ]?([0-9]{1,9})$/;
    return phoneRegex.test(number);
  
};
