import api from "./api";

export type UserType = {
  id: number;
  nickname: string;
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
};
