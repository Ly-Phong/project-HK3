import { useEffect, useState } from "react";
import { getMovieList } from "../../../../api/movie";
import "./MovieList.css";
import { useSearchParams } from "react-router-dom";
function MovieList({ isOpen, setIsOpen, setMovie }) {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [canNextPage, setCanNextPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber =
    searchParams.get("pn") != null ? searchParams.get("pn") : 1;
  useEffect(() => {
    getMovieList(pageNumber)
      .then((response) => {
        console.log(response.data.data.items);
        setMovieList(response.data.data.items);
        setTotalPage(response.data.data.totalPage);
        setCanNextPage(
          Number.parseInt(pageNumber) <= Number.parseInt(totalPage)
        );
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);
  const openModal = (item) => {
    return (
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    );
  };
  const goToNextPage = () => {
    const nextPage = Number.parseInt(pageNumber) + 1;
    window.location.href = `?pn=${nextPage}`;
  };
  return (
    <>
      {error === "" ? (
        <div className="movie_list">
          <div className="movie_list_header">
            <h5 className="movie_list_header_title">Most Popular Movies</h5>
            <button
              className="movie_list_header_next_btn"
              onClick={goToNextPage}
              disabled={!canNextPage}
            >
              Next
            </button>
          </div>
          <div className="movie_list_data">
            {movieList.length > 0
              ? movieList.map((item) => {
                  return (
                    <div
                      className="movie_list_data_item"
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setMovie(item);
                      }}
                    >
                      <img
                        className="movie_list_data_item_image"
                        src={item.image}
                      />
                      <p className="movie_list_data_item_name">{item.name}</p>
                      <p className="movie_list_data_item_info">
                        {item.time} min {item.year}
                      </p>
                    </div>
                  );
                })
              : "No item"}
          </div>
        </div>
      ) : (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </>
  );
}

export default MovieList;
