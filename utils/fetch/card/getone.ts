import { GetoneCardRouter } from "@/prisma-types/typings";
import { GetOneCard } from "@/typings";
import clear from "@/utils/string/clear";

async function getOneCard(args: GetOneCard): Promise<GetoneCardRouter> {
    const res = await fetch(clear(`${process.env.GATEWAY_URL}/card/getone`), {
        signal: args.signal,
        credentials: 'include'
    });

    const json = await res.json();

    return json;
}

export default getOneCard;