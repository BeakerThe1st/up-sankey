import {Up} from "../api/Up.ts";
import {useEffect, useState} from "react";
import Loading from "./Loading.tsx";
import {ResponsiveSankey} from "@nivo/sankey";

const colours = new Map<string, string>();
colours.set("good life", "#fadc58");
colours.set("personal", "#ff8a46");
colours.set("home", "#c976bf");
colours.set("transport", "#5993cc");


interface SankeyProps {
    up: Up
}
const Sankey = ({up}: SankeyProps) => {
    const [categories, setCategories] = useState<Map<string, string[]> | undefined>();
    const [categoryTotals, setCategoryTotals] = useState<Map<string, number> | undefined>()
    const [loadingMessage, setLoadingMesasge] = useState<string | undefined>();
    useEffect(() => {
        setLoadingMesasge("Fetching categories...");
        up.getCategoriesByParent().then(map => {
            setCategories(map);
            setLoadingMesasge("Fetching transactions... (this may take a while)");
            up.getCategoryTotals().then(totals => setCategoryTotals(totals));
        })
    }, [up]);
    if (!(categories && categoryTotals)) {
        return <Loading message={loadingMessage} />
    }
    const nodes: {id: string, nodeColor?: string}[] = [{id: "Money In", nodeColor: "hsl(162, 70%, 50%)"}];
    const links = [];
    // eslint-disable-next-line prefer-const
    for (let [key, values] of categories.entries()) {
        key = key.replaceAll("-", " ");
        const colour = colours.get(key);
        if (colour) {
            nodes.push({id: key, nodeColor: colour})
        } else {
            nodes.push({id: key})
        }
        let parentTotal = 0;
        for (const [childKey, childValue] of categoryTotals.entries()) {
            if (values.includes(childKey)) {
                parentTotal += childValue;
            }
        }
        links.push({source: "Money In", target: key, value: parentTotal})
        for (let value of values) {
            const total = categoryTotals.get(value);
            if (!total) {
                continue;
            }
            value = value.replaceAll("-", " ").replaceAll(" and ", " & ");
            links.push({
                source: key, target: value, value: total,
            });
            nodes.push({id: value});
        }
    }
    return <div className="h-[800px] w-[1200px] py-10">
        <ResponsiveSankey data={{nodes, links}} />
    </div>
}

export default Sankey;