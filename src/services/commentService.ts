import api from "./api";

export type CommentType = {
  id: number;
  message: string;
  createdAt: Date;
  user: { id: number; nickname: string; name: string; profileImg: string };
};

export const commentService = {
  create: async (params: { message: string; postId: number }) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .post("/comment", params, {
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
  getAllFromPost: async (postId: number, page: number) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .get(`/comments/${postId}?page=${page}&perPage=4`, {
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
