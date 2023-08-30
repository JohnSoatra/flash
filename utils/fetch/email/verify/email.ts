import { VerifyTokenEmailRouter } from "@/gateway-types/typings";
import { VerifyTokenEmail } from "@/typings";
import fetchHandler from "../../handler";
import getJson from "@/utils/json/get";

async function verifyEmailToken({
    signal,
    body,
    onData,
    onError,
}: VerifyTokenEmail): Promise<VerifyTokenEmailRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/email/verify/email',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default verifyEmailToken;