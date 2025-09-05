export const calculateTotal = (items: any[]) => {
  const subtotal = items.reduce((acc, item) => acc + Number(item.subtotal), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  return { subtotal, tax, total };
};
