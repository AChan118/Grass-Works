
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { GrassWorks } from "./components/Grass"



const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <GrassWorks />
    </BrowserRouter>
)
