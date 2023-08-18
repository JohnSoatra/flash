import { FetchOptions } from "@/typings";
import { setCsrf } from "@/redux/csrf";
import VARS from "@/constants/vars";
import clear from "@/utils/string/clear";
import getOneCsrf from "../csrf/getone";
import store from "@/redux/store";

type Props = {
    fetchFunc: () => Promise<Response>,
    args?: FetchOptions
}

async function fetchHandler({ fetchFunc, args }: Props) {
    const response = await fetchFunc();
    const status = response.status;

    if (status === 401) {
        const responseRefresh = await fetch(clear(`${VARS.ENV.gate_url}/auth/refresh`), {
            signal: args?.signal,
            credentials: 'include'
        });

        if (responseRefresh.status === 200) {
            const responseAgain = await fetchFunc();

            return responseAgain;
        }

        return responseRefresh;
    } else if (status === 405) {
        const responseCsrf = await getOneCsrf();
        
        store.dispatch(setCsrf(responseCsrf));

        const responseAgain = await fetchFunc();

        return responseAgain;
    }

    return response;
}

export default fetchHandler;