import { UpdateoneBillingRouter } from "@/prisma-types/typings";
import { CreateBilling } from "@/typings";
import fetchHandler from "../../handler";

async function createBilling({
    signal,
    body,
    onData,
    onError,
}: CreateBilling): Promise<UpdateoneBillingRouter> {
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

export default createBilling;