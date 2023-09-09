import api from "./api";
import { MediaProductType } from "./mediaProductService";

export type PostType = {
  id: number;
  message: string;
  likes?: number;
  liked: [{ nickname: string }];
  createdAt: Date;
  imageUrls: string[];
  User: { id: number; nickname: string; name: string; profileImg: string };
  MediaProduct: MediaProductType;
};

export const postService = {
  getPost: async (postId: number) => {
    const token = sessionStorage.getItem("nerdolar-token");
    const res = await api
      .get(`/posts/${postId}`, {
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

  getAllFromUser: async (userId: number, page: number) => {
    const token = sessionStorage.getItem("nerdolar-token");
    const res = await api
      .get(`/posts/user/${userId}?page=${page}`, {
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

  getAllFromMedia: async (mediaProductId: number, page: number) => {
    const token = sessionStorage.getItem("nerdolar-token");
    const res = await api
      .get(`/posts/media-product/${mediaProductId}?page=${page}`, {
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

  feed: async (page: number) => {
    const token = sessionStorage.getItem("nerdolar-token");
    const res = await api
      .get(`/feed?page=${page}`, {
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

  search: async (term: string, page: number) => {
    const token = sessionStorage.getItem("nerdolar-token");
    const res = await api
      .get(`/posts/search?page=${page}&name=${term}`, {
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

  post: async (data: FormData) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .post("/posts", data, {
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
