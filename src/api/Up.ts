import axios, {AxiosInstance} from "axios";

export class Up {
    api: AxiosInstance;
    constructor(token: string) {
        this.api = axios.create({
            baseURL: "https://api.up.com.au/api/v1/",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    public ping = () => {
        return this.api.get("/util/ping");
    }

    public getCategoriesByParent = async () => {
        const res = await this.api.get("/categories");
        const categoriesByParent = new Map<string, string[]>();
        for (const category of res.data.data) {
            const parent = category?.relationships?.parent?.data?.id;
            if (!parent) {
                //category is a parent
                continue;
            }
            categoriesByParent.set(parent, [category.id, ...(categoriesByParent.get(parent) ?? [])])
        }
        return categoriesByParent;
    }

    private getTransactions = async (since?: string) => {
        const transactions = [];
        const params: any = {filter: {}, page: {size: 100}};
        if (since) {
            params.filter.since = since;
        }
        let next;
        do {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            const res = await this.api.get(next ?? "/transactions", {params});
            transactions.push(...res.data.data);
            next = res?.data?.links?.next;
        } while (next);
        return transactions;
    }

    public getCategoryTotals = async (since?: string) => {
        const categoryTotals = new Map<string, number>();
        const transactions = await this.getTransactions(since);
        for (const transaction of transactions) {
            const category = transaction?.relationships?.category?.data?.id;
            const value = -1 * (+transaction?.attributes?.amount?.value);
            if (!(category && value)) {
                continue;
            }
            categoryTotals.set(category, Math.round((categoryTotals.get(category) ?? 0) + value));
        }
        return categoryTotals;
    }
}