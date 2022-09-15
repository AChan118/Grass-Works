import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const ProviderNav = () => {
    const navigate = useNavigate()

    return (<>
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="login/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Listings</Link>

            </li>
            
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile"> Provider Profile</Link>
            </li>

            {/* <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li> */}
            {
                localStorage.getItem("grass_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("grass_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul></>
    )
}
