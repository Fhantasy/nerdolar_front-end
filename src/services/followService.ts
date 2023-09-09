import api from "./api";

export const followService = {
  follow: async (userToFollowId: number) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .post(
        "/follow",
        { userToFollowId },
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
  unfollow: async (userId: number) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .delete(`/follow/${userId}`, {
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
  getFollowers: async (page: number) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .get(`/followers?page=${page}`, {
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
  getFollowings: async (page: number) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .get(`/followings?page=${page}`, {
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
