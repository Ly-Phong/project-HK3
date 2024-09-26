import './Header.css'
function Header() {
    return (
        <div className="movie_list_header_container">
            <div className="movie_list_header_container_left">
                <img className="movie_list_header_menu_icon_left" src="./img/menu.png"/>
             </div>
             <div className="movie_list_header_container_center">
                <img className="movie_list_header_menu_icon_center" src="./img/logo.png"/>
             </div>
             <div className="movie_list_header_container_right">
                <img className="movie_list_header_menu_icon_right" src="./img/loupe.png"/>
             </div>
        </div>
    )
}

export default Header;