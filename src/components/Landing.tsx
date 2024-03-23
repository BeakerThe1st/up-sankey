import {FormEvent, useState} from "react";

interface LandingProps {
    tokenError: string;
}
const Landing = (props: LandingProps) => {
    const [tokenInput, setTokenInput] = useState("");
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        localStorage.setItem("token", tokenInput);
        e.preventDefault();
        window.location.reload();
    }
    return <>
        <h1 className="text-lg mb-4">Enter your API key:</h1>
        <form className="flex flex-col items-center" onSubmit={(e) => handleSubmit(e)}>
            <input name="token" value={tokenInput} className="bg-transparent border-b-2 border-b-[#ff7a64] text-center w-[300px]" onChange={e => setTokenInput(e.target.value)} />
            <input type="submit" value="Submit" className="cursor-pointer mt-5 bg-[#ff7a64] border-[#ff7a64] border-4 text-[#242430] font-semibold py-1 px-6 hover:bg-transparent hover:text-[#ff7a64] transition-colors" />
        </form>
        <p className="text-red-600 mt-5">{props.tokenError}</p>
        </>
}

export default Landing;
