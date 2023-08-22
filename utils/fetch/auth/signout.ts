import { SignoutRouter } from "@/prisma-types/typings";
import { Signout } from "@/typings";
import fetchHandler from "../handler";
import store from "@/redux/store";
import { setUser } from "@/redux/user";

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

    const json = await response.json();

    if (json) {
        store.dispatch(setUser(null));
    }

    return json;
}

export default signout;