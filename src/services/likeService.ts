import api from "./api";

export const likeService = {
  like: async (postId: number) => {
    const token = sessionStorage.getItem("nerdolar-token");
    const res = await api
      .post(
        `/like`,
        { postId },
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
  dislike: async (postId: number) => {
    const token = sessionStorage.getItem("nerdolar-token");
    const res = await api
      .delete(`/like/${postId}`, {
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
