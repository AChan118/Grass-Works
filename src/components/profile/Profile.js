
import { ProviderDetails } from "./ProviderDetails"
import { UserDetails } from "./UserDetails"



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