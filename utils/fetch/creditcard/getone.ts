import { GetOneCreditCard } from "@/typings";
import { GetoneCreditcardRouter } from "@/prisma-types/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function getOneCreditCard({
    signal,
    onData,
    onError
}: GetOneCreditCard): Promise<GetoneCreditcardRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/creditcard/getone',
        signal,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default getOneCreditCard;