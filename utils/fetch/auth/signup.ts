import { SignupRouter } from "@/prisma-types/typings";
import { Signup } from "@/typings";
import fetchHandler from "../handler";

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

    const json = await response.json();

    return json;
}

export default signup;