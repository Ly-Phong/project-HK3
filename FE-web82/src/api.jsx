import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/movies';

export const fetchMovies = async (page) => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=4`);
    return response.data;
};

export const createMovie = async (movieData) => {
    const response = await axios.post(API_URL, movieData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};