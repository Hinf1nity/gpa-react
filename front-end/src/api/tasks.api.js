import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:8000/",
});

export const handleLogin = async (username, password) => {
  try {
    const response = await userApi.post("gestion/auth/", {
      username,
      password,
    });

    if (response.data && response.data.token) {
      return response.data.token;
    } else {
      console.error("Error al obtener el token de acceso");
      return null;
    }
  } catch (error) {
    console.error(error.response.data.error, ": ", error.message);
    return null;
  }
};

const getAccessToken = () => {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)csrftoken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
};

export const getActivities = () => userApi.get("users/actividades/");

export const getUserGpa = (ci) => userApi.get(`users/puntos/${ci}/`);

export const getUser = (ci) => userApi.get(`users/estudiante/${ci}/`);

export const postActivity = (data) => {
  const token = getAccessToken();
  console.log(token);
  return userApi.post("gestion/actividades/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  });
};
