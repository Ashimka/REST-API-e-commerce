export const dateFormat = (date) => {
  let formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(date);
};

export const checkRoleUser = (role, arr) => {
  const listRoles = {
    customer: 333,
    deliveryMan: 555,
    admin: 777,
  };

  if (!arr) {
    return;
  }

  return arr.includes(listRoles[role]);
};

export const totalPriceSum = (arr) => {
  arr.reduce((sum, obj) => {
    return obj.product.price * obj.count + sum;
  }, 0);
};
