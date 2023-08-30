import { SigninRouter } from "@/gateway-types/typings";
import { Signin } from "@/typings";
import fetchHandler from "../handler";
import store from "@/redux/store";
import { setUser } from "@/redux/user";
import getOneUser from "../user/getone";
import getJson from "@/utils/json/get";

async function signin({
    signal,
    body,
    onData,
    onError,
}: Signin): Promise<SigninRouter> {
    const response = await fetchHandler({
        method: 'post',
        url: '/auth/signin',
        signal,
        body,
        onData,
        onError
    });

    const json = await getJson(response);

    if (json) {
        const response = await getOneUser({
            signal,
            onData,
            onError
        });

        store.dispatch(setUser(response));
    }

    return json;
}

export default signin;