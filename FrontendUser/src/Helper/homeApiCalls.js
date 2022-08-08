import { API } from "../backend";

export const getAllNotice = () => {
  return fetch(`${API}/notice/get`, {
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

export const createContact = (body) => {
  return fetch(`${API}/contact/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
