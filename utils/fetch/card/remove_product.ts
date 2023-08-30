import { RemoveProductFromCardRouter } from "@/gateway-types/typings";
import { RemoveProductFromCard } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function removeProductFromCard({
    signal,
    body,
    onData,
    onError
}: RemoveProductFromCard): Promise<RemoveProductFromCardRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/card/remove-product',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default removeProductFromCard;