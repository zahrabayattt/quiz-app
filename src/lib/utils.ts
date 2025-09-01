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

export const customDate = (createdDate: Date) => {
  const day = String(createdDate.getDate()).padStart(2, "0");
  const month = createdDate.toLocaleString("en-us", { month: "long" });
  const year = createdDate.getFullYear();
  return `${day} ${month}-${year}`;
};
