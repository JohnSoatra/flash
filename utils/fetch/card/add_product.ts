import { AddProductToCardRouter } from "@/gateway-types/typings";
import { AddProductToCard } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function addProductToCard({
    signal,
    body,
    onData,
    onError
}: AddProductToCard): Promise<AddProductToCardRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/card/add-product',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default addProductToCard;