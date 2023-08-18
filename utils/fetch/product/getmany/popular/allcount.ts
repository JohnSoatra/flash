import { GetmanyPopularProductsAllCountRouter } from "@/prisma-types/typings";
import { GetAllcountPopularProducts } from "@/typings";
import clear from "@/utils/string/clear";

async function getAllcountPopularProducts(args?: GetAllcountPopularProducts): Promise<GetmanyPopularProductsAllCountRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/product/getmany/popular/allcount?
            released_at=${args?.releasedAt || ''}
    `), {
        signal: args?.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getAllcountPopularProducts;