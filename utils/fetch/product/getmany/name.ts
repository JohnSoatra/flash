import { GetmanyProductNamesRouter } from "@/prisma-types/typings";
import { GetManyProductNames } from "@/typings";
import clear from "@/utils/string/clear";

async function getManyProductNames(args: GetManyProductNames): Promise<GetmanyProductNamesRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/product/getmany/name?
            string=$0&
            limit=${args.limit || ''}
    `, args.string), {
        signal: args.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getManyProductNames;