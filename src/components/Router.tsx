import {useEffect, useState} from "react";
import {Up} from "../api/Up.ts";
import Landing from "./Landing.tsx";
import Sankey from "./Sankey.tsx";
import Loading from "./Loading.tsx";

export const Router = () => {
    const [up, setUp] = useState<Up | string>();
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            setUp("");
            return;
        }
        const up = new Up(storedToken);
        up.ping()
            .then(() => setUp(up))
            .catch((error) => {
                const errorCode = error.response.status;
                let errorMsg = "";
                if (errorCode === 401) {
                    errorMsg = "Invalid Token";
                } else if (errorCode === 429) {
                    errorMsg = "Rate limited :( Please refresh in a few minutes."
                } else {
                    throw error;
                }
                setUp(errorMsg);
            });
    }, []);
    if (up === undefined) {
        return <Loading />
    }
    if (!(up instanceof Up)) {
        return <Landing tokenError={up} />
    }

    return <Sankey up={up}/>
}