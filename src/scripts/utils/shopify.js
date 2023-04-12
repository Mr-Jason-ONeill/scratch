export const getCart = async () => {
  const response = await fetch('/cart.json');
  const data = await response.json();
  return data;
}