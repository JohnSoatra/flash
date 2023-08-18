import { GetAllModels } from "@/typings";
import clear from "@/utils/string/clear";
import { GetallModelsRouter } from "@/prisma-types/typings";

async function getAllModels(args?: GetAllModels): Promise<GetallModelsRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/model/getall
    `), {
        signal: args?.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getAllModels;