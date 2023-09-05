import api from "./api";

export type UserType = {
  id: number;
  nickname: string;
  email: string;
  name: string;
  bio: string;
  locale: string;
  birth: Date;
  profileImg: string;
  profileBannerImg: string;
  isFollower: boolean;
  isFollowing: boolean;
  followers: { id: number; nickname: string; name: string }[];
  following: { id: number; nickname: string; name: string }[];
};

export const userService = {
  getOne: async (nickname: string) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .get(`/users/${nickname}`, {
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
  updateProfile: async (data: FormData) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .put(`/users/current/profile`, data, {
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
  updateAccount: async (params: { nickname: string; email: string }) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .put(`/users/current/account`, params, {
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
  updatePassword: async (params: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .put(`/users/current/password`, params, {
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
  search: async (name: string, page: number) => {
    const token = sessionStorage.getItem("nerdolar-token");

    const res = await api
      .get(`/users/search?name=${name}&page=${page}`, {
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
