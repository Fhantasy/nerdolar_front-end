import api from "./api";
import { MediaProductType } from "./mediaProductService";

export type WatchItemType = {
  id: number;
  status: "ongoing" | "complete";
  currentEpisode: number;
  mediaProduct: MediaProductType;
};

export const watchItemService = {
  getOne: async (id: number) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .get(`/watch-item/${id}`, {
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

  getReleases: async () => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .get("/releases", {
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

  getAllPerCategory: async (
    categoryId: number,
    status: "ongoing" | "complete",
    currentPage: number,
    userId: number
  ) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .get(
        `/watch-item/category/${categoryId}/${userId}?status=${status}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        if (error.response.status === 400) {
          return error.response;
        }
        return error;
      });

    return res;
  },

  create: async (params: { mediaProductId: number; categoryId: number }) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .post(`/watch-item`, params, {
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

  update: async (params: {
    watchItemId: number;
    status?: "ongoing" | "complete";
    currentEpisode?: number;
  }) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .put(`/watch-item`, params, {
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

  delete: async (id: number) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .delete(`/watch-item/${id}`, {
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
