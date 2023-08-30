import { RemoveAllProductsFromCardRouter } from "@/gateway-types/typings";
import { RemoveAllProductsFromCard } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function removeAllProductsFromCard({
    signal,
    body,
    onData,
    onError
}: RemoveAllProductsFromCard): Promise<RemoveAllProductsFromCardRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/card/remove-all-products',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default removeAllProductsFromCard;