
import { CustomerViews } from "./CustomerViews"
import { ProviderViews } from "./ProviderViews"



export const ApplicationViews = () => {
	
    const localGrassUser = localStorage.getItem("grass_user")
    const grassUserObject = JSON.parse(localGrassUser)

        if (grassUserObject.provider) {
        // returns employees views
            return <ProviderViews />
        }
        else {
        // returns customer views
            return <CustomerViews />
        }
}
