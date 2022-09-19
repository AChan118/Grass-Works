import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"

import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Grass.css"
import { NavBar } from "./nav/NavBar"


export const GrassWorks = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized >
				<>
					
                    <NavBar />
					<ApplicationViews />
					
				</>
			</Authorized>

		} />
	</Routes>
}
