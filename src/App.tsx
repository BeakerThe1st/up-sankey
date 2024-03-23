import {Router} from "./components/Router.tsx";

const App = () => (
    <div className="w-screen h-screen flex flex-col bg-[#242430] text-[#ff7a64]">
        <div className="mt-16 mx-auto">
            <h1 className="text-4xl font-bold">Up Sankey</h1>
        </div>
        <div className="flex flex-col items-center justify-center grow">
            <Router />
        </div>
    </div>
)

export default App
