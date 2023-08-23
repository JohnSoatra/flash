import { Json, MyFetchProp } from "@/typings";
import store from "@/redux/store";
import cleanUrl from "@/utils/url/clean";
import getGatewayUrl from "@/utils/env/public/gateway_url";

function httpChecker(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    if (url.startsWith('/')) {
        return getGatewayUrl() + url;
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
    query
}: MyFetchProp) {
    const state = store.getState();
    let _url = cleanUrl(url);
    _url = httpChecker(_url);
    _url = appendQuery(_url, query);

    return fetch(
        _url,
        {
            method: method,
            signal: signal,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                'browser-id': state.browser.browserId,
                'visitor-id': state.browser.visitorId,
                ...(
                    method === 'post' ? {
                        'csrf-token': state.csrf.value
                    } : {}
                ),
            },
            body: method === 'post' ? JSON.stringify(body) : undefined
        }
    );
}

export default myFetch;