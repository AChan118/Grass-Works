
import { ProviderDetails } from "./ProviderDetails"
import { UserDetails } from "./UserDetails"
import "./Profile.css"


export const Profile = () => {
   

    	
    const localGrassUser = localStorage.getItem("grass_user")
     const grassUserObject = JSON.parse(localGrassUser)

        if (grassUserObject.provider) {
        
            return <ProviderDetails />
        }
        else {
        
            return <UserDetails />
        }
}