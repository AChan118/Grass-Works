import { Outlet, Route, Routes } from "react-router-dom"
import { HomeHTML } from "../home/Home"
import { ListingForm } from "../listings/ListingForm"
import { ListingList } from "../listings/ListingList"
import { Profile } from "../profile/Profile"





export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    


                    <Outlet />
                </>
            }>
                <Route path="/ticket/create" element={ <ListingForm /> }/>
                <Route path="tickets" element={ <ListingList /> }/>
                <Route path="login/home" element={ <HomeHTML /> } />
                <Route path="profile" element={ <Profile /> }/>
				
            </Route>
        </Routes>
    )
}