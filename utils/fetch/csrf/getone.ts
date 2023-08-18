import { GetCsrfRouter } from "@/prisma-types/typings";
import { GetOneCsrf } from "@/typings";
import clear from "@/utils/string/clear";

async function getOneCsrf(args?: GetOneCsrf): Promise<GetCsrfRouter> {
    const res = await fetch(clear(`${process.env.GATEWAY_URL}/csrf/get`), {
        signal: args?.signal,
        credentials: 'include',
    });

    const json = await res.json();

    return json;
}

export default getOneCsrf;