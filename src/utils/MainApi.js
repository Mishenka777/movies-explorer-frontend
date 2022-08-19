const API_URL = "https://api.mishenkadiplom.nomoredomains.xyz";
const MOVIES_URL = "https://api.nomoreparties.co";
const token = localStorage.getItem('token');

export const updateUserData = (name, email) => {
  return fetch(`${API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  }).then(checkResponse);
};

export const register = (name, email, password) => {
  return fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email, password}),
  }).then(checkResponse);
};

export const login = (email, password) => {
  return fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then(checkResponse)
};

export const checkToken = (token) => {
  return fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((response) => response);
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

export const saveMovie = (movie) => {
  return fetch(`${API_URL}/movies`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `${MOVIES_URL}${movie.image.url}`,
          trailerLink: movie.trailerLink,
          thumbnail: `${MOVIES_URL}${movie.image.formats.thumbnail.url}`,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          movieId: movie.id,
      }),
    }).then(checkResponse);
};

//удаление фильма
export const deleteMovie = (_id) => {
  return fetch(`${API_URL}/movies/${_id}`, {
      method: "DELETE",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
    }).then(checkResponse);
};

//получили фильмы
export const getSavedMovies = () => {
  return fetch(`${API_URL}/movies`, {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
    }).then(checkResponse);
};