import { GetmanySearchProductsRouter } from "@/prisma-types/typings";
import { GetManySearchProduct } from "@/typings";
import clear from "@/utils/string/clear";

async function getManySearchProducts(args: GetManySearchProduct): Promise<GetmanySearchProductsRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/product/getmany/search?
            string=$0&
            limit=${args.limit || ''}&
            skip=${args.skip || ''}&
            released_at=${args.releasedAt || ''}
    `, args.string), {
        signal: args.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getManySearchProducts;