import { Outlet, Route, Routes } from "react-router-dom"
import { ListingList } from "../listings/ListingList"
import { Profile } from "../profile/Profile"





export const ProviderViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>GRASSWORKS</h1>
                    <div>A Simple Way To Get Yard Proffessionals</div>

                    <Outlet />
                </>
            }>
                
                <Route path="tickets" element={ <ListingList /> }/>
                <Route path="profile" element={ <Profile /> }/>
                

				
            </Route>
        </Routes>
    )
}