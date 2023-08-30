import { UpdateoneBillingRouter } from "@/gateway-types/typings";
import { UpdateBilling } from "@/typings";
import fetchHandler from "../../handler";
import getJson from "@/utils/json/get";

async function updateBilling({
    signal,
    body,
    onData,
    onError,
}: UpdateBilling): Promise<UpdateoneBillingRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/user/updateone/billing',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default updateBilling;