import { GetmanyCardsRouter } from "@/gateway-types/typings";
import { GetManyCards } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function getManyCards({
    signal,
    onData,
    onError
}: GetManyCards): Promise<GetmanyCardsRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/card/getmany',
        signal,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default getManyCards;