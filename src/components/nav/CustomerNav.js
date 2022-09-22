import { GiGrass } from "react-icons/gi"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const CustomerNav = () => {
    const navigate = useNavigate()

    return (<>
        <header className="head__nav">
            <h1 class="logo"><GiGrass />GRASSWORKS</h1>
            <input type="checkbox" id="nav-toggle" class="nav-toggle"/>
            <nav>
        <ul className="navbar">
              <li className="navbar__item active">
                <Link className="navbar__link" to="login/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/ticket/create">Create-A-Listing</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">MY-Listings</Link>
            </li>
            
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile"> My-Profile</Link>
            </li>
            
            {/* <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li> */}
           
            {
                localStorage.getItem("grass_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("grass_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
        </nav>
                <label for="nav-toggle" class="nav-toggle-label">
                    <span></span>
                </label>
        </header></>
    )
}