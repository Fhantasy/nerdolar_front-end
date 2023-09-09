import api from "./api";

interface RegisterParams {
  nickname: string;
  email: string;
  password: string;
}

interface LoginParams {
  email: string;
  password: string;
}

export const authService = {
  register: async (params: RegisterParams) => {
    const res = await api.post("/register", params).catch((error) => {
      if (error.response?.status === 400) {
        return error.response;
      }

      return error;
    });
    return res;
  },

  login: async (params: LoginParams) => {
    const res = await api.post("/login", params).catch((error) => {
      if (error.response?.status === 400 || error.response?.status === 401) {
        return error.response;
      }
      return error;
    });
    if (res.status === 200) {
      sessionStorage.setItem("nerdolar-token", res.data.token);
    }
    return res;
  },

  isAuthorizated: async () => {
    const token = sessionStorage.getItem("nerdolar-token");

    const authorizated = await api
      .get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(() => null);

    return authorizated;
  },
};
