import { SignoutRouter } from "@/gateway-types/typings";
import { Signout } from "@/typings";
import fetchHandler from "../handler";
import store from "@/redux/store";
import { setUser } from "@/redux/user";
import getJson from "@/utils/json/get";

async function signout({
    signal,
    onData,
    onError,
}: Signout): Promise<SignoutRouter> {
    const response = await fetchHandler({
        method: 'get',
        url: '/auth/signout',
        signal,
        onData,
        onError
    });

    const json = await getJson(response);

    if (json) {
        store.dispatch(setUser(null));
    }

    return json;
}

export default signout;