import { GetmanySearchProductsAllCountRouter } from "@/prisma-types/typings";
import { GetAllcountSearchProducts } from "@/typings";
import clear from "@/utils/string/clear";

async function getAllcountSearchProducts(args: GetAllcountSearchProducts): Promise<GetmanySearchProductsAllCountRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/product/getmany/search/allcount?
            string=$0&
            released_at=${args.releasedAt || ''}
    `, args.string), {
        signal: args.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getAllcountSearchProducts;