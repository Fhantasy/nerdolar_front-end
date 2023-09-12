import api from "./api";

export type CategoryType = {
  id: number;
  name: string;
};

export const categoryService = {
  getAllOfUserWatchList: async (userId: number) => {
    const token = sessionStorage.getItem("nerdolar-token");
    const res = await api
      .get(`/watch-items/categories/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        if (error.response.status === 400) {
          return error.response;
        }
        return error;
      });
    return res;
  },
};
