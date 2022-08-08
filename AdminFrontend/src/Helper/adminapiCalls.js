import { API } from "../backend";

export const uploadGalleryImages = (data) => {
  return fetch(`${API}/gallery/create`, {
    method: "POST",
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getGalleryById = (galleryId) => {
  return fetch(`${API}/gallery/get/${galleryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllGallery = () => {
  return fetch(`${API}/gallery/getAll`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteGallery = (id) => {
  return fetch(`${API}/gallery/delete/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateGalleryImages = (data, id) => {
  return fetch(`${API}/gallery/update/${id}`, {
    method: "POST",
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
