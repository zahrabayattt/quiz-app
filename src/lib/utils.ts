import axios from "axios";

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

export const axiosInstance = axios.create({
  baseURL: "https://crudify.dev/api/v1",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const specificDate = (createdDate: Date) => {
  const date = new Date(createdDate);
  return date.toLocaleDateString("en-us", {
    month: "short",
    year: "numeric",
    day: "numeric",
  });
};
