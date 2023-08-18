import clear from "@/utils/string/clear";
import { GetOneCreditCard } from "@/typings";
import { GetoneCreditcardRouter } from "@/prisma-types/typings";

async function getOneCreditCard(args: GetOneCreditCard): Promise<GetoneCreditcardRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/creditcard/getone
    `), {
        signal: args.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getOneCreditCard;