import { VerifyPasswordRouter } from "@/gateway-types/typings";
import { VerifyPassword } from "@/typings";
import fetchHandler from "@/utils/fetch/handler";
import getJson from "@/utils/json/get";

async function verifyPassword({
    signal,
    body,
    onData,
    onError
}: VerifyPassword): Promise<VerifyPasswordRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/user/verify_password',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default verifyPassword;