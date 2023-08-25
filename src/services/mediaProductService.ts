import api from "./api";

export type MediaProductType = {
  id: number;
  title: string;
  sinopsys: string;
  status: string;
  isEpisodic: boolean;
  launchDate: Date;
  endDate: Date;
  totalEpisodes: number;
  currentEpisode: number;
  releaseDates: Date[];
  thumbnailImg: string;
  pageBannerImg: string;
  watchItens: { id: number }[];
  category: { id: number; name: string };
  genres?: { name: string }[];
};

export const mediaProductService = {
  getOne: async (id: number) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .get(`/media-product/${id}`, {
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
  search: async (title: string) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .get(`/media-products/search?title=${title}`, {
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
