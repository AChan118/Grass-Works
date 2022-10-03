import React, { useState } from "react"
import { MdFacebook } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import imageBg from '../assets/imageBg.jpg'
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("grass_user", JSON.stringify({
                        id: user.id,
                        provider: user.isProvider
                    }))

                    navigate("/login/home")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            
            <section className="login_body">
                <div className="login_left">
                   <img src={imageBg}/>
                </div>
                <div className="login_right">
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="signIn_head">GRASSWORKS</h1>
                    <h2 className="sign_in">Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button className="listing__button" type="submit"><span></span>
                            Sign in
                        </button>
                    </fieldset>
               
                <section className="link--register">
                Not a member yet?
                <Link to="/register">Sign Up</Link>
            </section>
             </form>
             <h3 className="social_loginHead">Login with your socials</h3>
             <ul className="social_listLogin">
                <li className="social_logoSignIn"><MdFacebook /></li>
                <li className="social_logoSignIn"><IoLogoInstagram /></li>
                <li className="social_logoSignIn"><IoLogoTwitter /></li>

             </ul>
                </div>
            </section>
            
        </main>
    )
}