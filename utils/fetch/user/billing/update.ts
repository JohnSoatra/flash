import { UpdateoneBillingRouter } from "@/prisma-types/typings";
import { UpdateBilling } from "@/typings";
import fetchHandler from "../../handler";

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

    const json = await response.json();

    return json;
}

export default updateBilling;