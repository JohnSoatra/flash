import { GetmanyRelatedProductsRouter } from "@/prisma-types/typings";
import { GetManyRelatedProducts } from "@/typings";
import clear from "@/utils/string/clear";

async function getManyRelatedProducts(args: GetManyRelatedProducts): Promise<GetmanyRelatedProductsRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/product/getmany/related?
            product_id=${args.productId}&
            limit=${args.limit || ''}
    `), {
        signal: args.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getManyRelatedProducts;