import { GetallBrandsRouter } from "@/prisma-types/typings";
import { GetAllBrands } from "@/typings";
import clear from "@/utils/string/clear";

async function getAllBrands(args?: GetAllBrands): Promise<GetallBrandsRouter> {
    const res = await fetch(clear(`${process.env.GATEWAY_URL}/brand/getall`), {
        signal: args?.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getAllBrands;