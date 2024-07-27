import axios from "axios";

const API_URL = "https://66a3552644aa63704580ce6b.mockapi.io";

export const fetchComments = () => axios.get(`${API_URL}/comments`);
export const updateComment = (id, data) =>
    axios.put(`${API_URL}/comments/${id}`, data);
export const addComment = (data) => axios.post(`${API_URL}/comments`, data);
export const deleteComment = (id) => axios.delete(`${API_URL}/comments/${id}`);
export const login = (email, password) =>
    axios.post(`${API_URL}/login`, {email, password});
