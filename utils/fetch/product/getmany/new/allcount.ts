import { GetmanyNewProductsAllCountRouter } from "@/prisma-types/typings";
import { GetAllcountNewProducts } from "@/typings";
import clear from "@/utils/string/clear";

async function getAllcountNewProducts(args?: GetAllcountNewProducts): Promise<GetmanyNewProductsAllCountRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/product/getmany/new/allcount?
            released_at=${args?.releasedAt || ''}
    `), {
        signal: args?.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getAllcountNewProducts;