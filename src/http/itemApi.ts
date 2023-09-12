import axios from "axios";
import {BASE_API_URL} from "config/urls.ts";

export const fetchItems = async () => {
  const url: string = `${BASE_API_URL}/products`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Если есть сетевой ответ с ошибкой
        throw new Error(`Error fetching: ${error.message}. Status: ${error.response.status}`);
      } else {
        // Если нет сетевого ответа
        throw new Error(`Error fetching: ${error.message}`);
      }
    } else {
      // Другие виды ошибок
      throw error;
    }
  }
}
export const fetchOneItem = async (id: string | undefined) => {
  if (!id) {
    throw new Error("ID is undefined");
  }
  const url: string = `${BASE_API_URL}/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Если есть сетевой ответ с ошибкой
        throw new Error(`Error fetching one item: ${error.message}. Status: ${error.response.status}`);
      } else {
        // Если нет сетевого ответа
        throw new Error(`Error fetching one item: ${error.message}`);
      }
    } else {
      // Другие виды ошибок
      throw error;
    }
  }
}