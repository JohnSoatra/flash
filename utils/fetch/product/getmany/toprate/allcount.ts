import { GetmanyToprateProductsAllCountRouter } from "@/prisma-types/typings";
import { GetAllcountToprateProducts } from "@/typings";
import clear from "@/utils/string/clear";

async function getAllcountToprateProducts(args?: GetAllcountToprateProducts): Promise<GetmanyToprateProductsAllCountRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_UTL}/product/getmany/toprate/allcount?
            released_at=${args?.releasedAt || ''}
    `), {
        signal: args?.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getAllcountToprateProducts;