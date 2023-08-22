import { setCsrf } from "@/redux/csrf";
import { clearUser } from "@/redux/user";
import { FetchOptions, MyFetchProp } from "@/typings";
import getOneCsrf from "./csrf/getone";
import store from "@/redux/store";
import myFetch from "./my_fetch";

type Props = MyFetchProp & FetchOptions;

async function fetchHandler({
    method,
    url,
    signal,
    body,
    query,
    onData,
    onError
}: Props): Promise<Response> {
    const fetchApi = async () => myFetch({
        method: method,
        url: url,
        signal: signal,
        body: body,
        query: query,
    } as MyFetchProp);

    const response = await fetchApi();

    if (response.status === 401) {
        const responseRefresh = await myFetch({
            method: 'get',
            url: '/auth/refresh',
            signal: signal,
        });

        if (responseRefresh.status === 200) {
            const responseAgain = await fetchApi();

            return responseAgain;
        }

        store.dispatch(clearUser());

        return responseRefresh;

    } else if (response.status === 405) {
        const responseCsrf = await getOneCsrf({ signal });

        store.dispatch(setCsrf(responseCsrf));

        const responseAgain = await fetchApi();

        return responseAgain;
    }

    if (response.status == 200) {
        if (onData) {
            onData(response);
        }
    } else {
        if (onError) {
            onError(response);
        }
    }

    return response;
}

export default fetchHandler;