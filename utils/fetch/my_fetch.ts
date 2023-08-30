import { Json, MyFetchProp } from "@/typings";
import store from "@/redux/store";
import cleanUrl from "@/utils/url/clean";
import getGatewayUrl from "@/utils/env/public/gateway_url";
import isFormData from "../json/is_formdata";
import getStoreUrl from "../env/public/store_url";

function httpChecker(url: string, formData: boolean): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    if (url.startsWith('/')) {
        if (formData) {
            return getStoreUrl() + url;
        } else {
            return getGatewayUrl() + url;
        }
    }
    
    throw Error('myFetch url must start with /');
}

function appendQuery(url: string, query?: Json) {
    if (query) {
        let newUrl = url + '?';

        for (let key in query) {
            if (query[key] !== undefined) {
                newUrl += `${key}=${query[key]}&`;
            }
        }

        return newUrl.replace(/&$/, '');
    }

    return url;
}

async function myFetch({
    method,
    url,
    signal,
    body,
    query,
}: MyFetchProp) {
    const state = store.getState();
    const formData = method === 'post' && isFormData(body);
    let _url = cleanUrl(url);
    _url = httpChecker(_url, formData);
    _url = appendQuery(_url, query);

    return fetch(
        _url,
        {
            method: method,
            signal: signal,
            credentials: 'include',
            headers: {
                'browser-id': state.browser.browserId,
                'visitor-id': state.browser.visitorId,
                ...(
                    formData ? {} : {
                        'content-type': 'application/json'
                    }
                ),
                ...(
                    method === 'post' ? {
                        'csrf-token': state.csrf.value
                    } : {}
                ),
            },
            body: method === 'get' ? undefined : formData ? body as FormData : JSON.stringify(body)
        }
    );
}

export default myFetch;