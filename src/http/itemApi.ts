import axios from 'axios';

export const fetchItems = async () => {
  const url: string = "https://api.escuelajs.co/api/v1/products";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching items: ${error}`);
  }
}
export const fetchOneItem = async (id: string | undefined) => {
  if (!id) {
    throw new Error("ID is undefined");
  }
  const url: string = `https://api.escuelajs.co/api/v1/products/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching one item: ${error}`);
  }
}