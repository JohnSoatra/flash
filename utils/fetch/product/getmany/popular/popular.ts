import { GetmanyPopularProductsRouter } from "@/prisma-types/typings";
import { GetManyPopularProducts } from "@/typings";
import clear from "@/utils/string/clear";

async function getManyPopularProducts(args: GetManyPopularProducts): Promise<GetmanyPopularProductsRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/product/getmany/popular?
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

export default getManyPopularProducts;