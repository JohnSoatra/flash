import { GetallCategoriesRouter } from "@/prisma-types/typings";
import { GetAllCategories } from "@/typings";
import clear from "@/utils/string/clear";

async function getAllCategories(args?: GetAllCategories): Promise<GetallCategoriesRouter[]> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/category/getall
    `), {
        signal: args?.signal,
        credentials: 'include'
    });
    
    const json = await res.json();

    return json;
}

export default getAllCategories;