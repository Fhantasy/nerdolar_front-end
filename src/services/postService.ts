import api from "./api";

export type PostType = {
  id: number;
  message: string;
  likes?: number;
  createdAt: Date;
  PostImages: { id: number; imgUrl: string }[];
  User: { id: number; nickname: string; name: string; profileImg: string };
  MediaProduct: {
    id: number;
    title: string;
    thumbnailImg: string;
    categoryId: number;
    category: { name: string };
  };
  comments?: {
    id: number;
    message: string;
    createdAt: Date;
    user: { id: number; nickname: string; name: string; profileImg: string };
  }[];
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

  feed: async (page: number) => {
    const token = sessionStorage.getItem("nerdolar-token");
    const res = await api
      .get(`/feed?perPage=2&page=${page}`, {
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
