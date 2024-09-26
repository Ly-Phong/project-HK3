import axiosClient from "./axiosInstance";
const movieListEndpoint = "/movie/list"
function getMovieList(pageNumber)
{
    return axiosClient.get(`${movieListEndpoint}`, 
    {
        params:{pn:pageNumber}
    })
}

export {
    getMovieList
}