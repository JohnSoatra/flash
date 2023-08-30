import { SignupRouter } from "@/gateway-types/typings";
import { Signup } from "@/typings";
import fetchHandler from "../handler";
import getJson from "@/utils/json/get";

async function signup({
    signal,
    body,
    onData,
    onError,
}: Signup): Promise<SignupRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/auth/signup',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    return json;
}

export default signup;