import "./MovieDetailContainer.css"
const MovieDetailContainer = ({movie, isOpen, setIsOpen}) => {
    return (
        <div className="movie_detail_container">
            <div className="movie_detail_left">
                <img src={movie.image} className="movie_detail_left_image"/>
            </div>
            <div className="movie_detail_right">
                <h3 className="movie_detail_right_title">{movie.name}</h3>
                <p className="movie_detail_right_info">{movie.time} min {movie.year}</p>
                <p className="movie_detail_right_des">{movie.introduce}</p>
                <button className="movie_detail_right_btn"><img src="./img/play-16.png" style={{marginRight:'10px'}} className="movie_detail_close_button" />PLAY MOVIE</button>
            </div>
            <div className="movie_detail_close_button_container" onClick={() => setIsOpen(!isOpen)}>
                <img src="./img/close.png" className="movie_detail_close_button" />
            </div>
        </div>
    )
}

export default MovieDetailContainer;