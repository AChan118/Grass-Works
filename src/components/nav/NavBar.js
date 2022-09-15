
import { CustomerNav } from "./CustomerNav"

import "./NavBar.css"
import { ProviderNav } from "./ProviderNav"

export const NavBar = () => {
   

    	
    const localGrassUser = localStorage.getItem("grass_user")
    const grassUserObject = JSON.parse(localGrassUser)

        if (grassUserObject.provider) {
        // returns employees views
            return <ProviderNav />
        }
        else {
        // returns customer views
            return <CustomerNav />
        }
}