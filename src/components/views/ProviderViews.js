import { Outlet, Route, Routes } from "react-router-dom"
import { ListingList } from "../listings/ListingList"
import { OpenListings } from "../providers/OpenListings"
import { Profile } from "../profile/Profile"
import { HomeHTML } from "../home/Home"





export const ProviderViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    {/* <div className="page__allTop">
                    <h1>GRASSWORKS</h1>
                    <div>A Simple Way To Get Yard Proffessionals</div>
                    </div> */}

                    <Outlet />
                </>
            }>
                
                <Route path="tickets" element={ <ListingList /> }/>
                <Route path="profile" element={ <Profile /> }/>
                <Route path="login/home" element={ <HomeHTML /> } />
                

				
            </Route>
        </Routes>
    )
}