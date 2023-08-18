import { GetmanyToprateProductsRouter } from "@/prisma-types/typings";
import { GetManyToprateProducts } from "@/typings";
import clear from "@/utils/string/clear";

async function getManyToprateProducts(args: GetManyToprateProducts): Promise<GetmanyToprateProductsRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/getmany/toprate?
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

export default getManyToprateProducts;