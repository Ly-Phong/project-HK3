import Header from './Header'
import MovieList from './movieList'
import './MovieListContainer.css'
import { useState } from 'react';
import MovieDetailContainer from '../Detail/MovieDetailContainer';
function MovieListContainer ()  {
    const [isOpen, setIsOpen] = useState(false);
    const [movie, setMovie] = useState({});
    return (
    <>      
    {
        isOpen &&
        <div className="movie_list_container_modal">
           <MovieDetailContainer isOpen={isOpen} setIsOpen={setIsOpen} movie={movie} />
        </div> 
    }
        
        <div className="movie_list_container">
            <Header />
            <MovieList isOpen={isOpen} setIsOpen={setIsOpen} setMovie={setMovie}/>
        </div>
    </>

    )
}

export default MovieListContainer