import axios from "axios";

const userApi = axios.create({
  //baseURL: "https://www.imt.ucb.edu.bo/cidimec/gpa/",
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

export const updateUserMail = (ci, data) =>
  userApi.put(`users/estudiante/${ci}/`, data);

export const postActivity = (data) => {
  const token = getAccessToken();
  return userApi.post("gestion/actividades/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  });
};

export const updateActivity = (id, data) => {
  const token = getAccessToken();
  return userApi.put(`gestion/actividades/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  });
};

export const postStudents = (data) => {
  const token = getAccessToken();
  return userApi.post("gestion/estudiantes/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  });
};

// Licencias
export const getMaterias = () => userApi.get("licencias/materias/");
export const getLicenciasEstudiante = (ci) =>
  userApi.get(`licencias/create_licencias/${ci}/`);
export const postLicencia = (data) =>
  userApi.post("licencias/create_licencias/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getLicencias = () => {
  const token = getAccessToken();
  return userApi.get("gestion/licencias/", {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  });
};

export const updateLicencia = (id, data) => {
  const token = getAccessToken();
  return userApi.put(`gestion/licencias/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${token}`,
    },
  });
};

export const updateLicenciaEstudiante = (id, data) => {
  return userApi.put(`licencias/create_licencias/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
