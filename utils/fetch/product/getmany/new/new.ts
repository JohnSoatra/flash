import { GetmanyNewProductsRouter } from "@/prisma-types/typings";
import { GetManyNewProducts } from "@/typings";
import clear from "@/utils/string/clear";

async function getManyNewProducts(args: GetManyNewProducts): Promise<GetmanyNewProductsRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/product/getmany/new?
            skip=${args.skip || ''}&
            limit=${args.limit || ''}&
            released_at=${args.releasedAt || ''}
    `), {
        signal: args.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getManyNewProducts;