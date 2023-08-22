import { GetoneCardRouter } from "@/prisma-types/typings";
import { GetOneCard } from "@/typings";
import fetchHandler from "../handler";

async function getOneCard({
    signal,
    onData,
    onError
}: GetOneCard): Promise<GetoneCardRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/card/getone',
        signal,
        onData,
        onError
    });

    const json = await response.json();

    return json;
}

export default getOneCard;