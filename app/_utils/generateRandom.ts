
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export type jsonData = {
    name: string,
    email: string,
    age: number,
    price: number,
    stock: number,
    quantity: number,
    totalPrice:number}


export const generateRandomObject = (): jsonData => {
  return {
    name: getRandomString(10),
    email: `${getRandomString(5)}@example.com`,
    age: getRandomInt(18, 60),
    price: getRandomInt(10, 1000),
    stock: getRandomInt(0, 100),
    quantity: getRandomInt(1, 10),
    totalPrice: getRandomInt(10, 1000),
  };
};

