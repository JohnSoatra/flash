import { Json, MyFetchProp } from "@/typings";
import store from "@/redux/store";
import cleanUrl from "@/utils/url/clean";
import getBrowserId from "@/utils/browser/get_browser_id";
import getVisitorId from "@/utils/browser/get_visitor_id";
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
                'browser-id': await getBrowserId(),
                'visitor-id': await getVisitorId(),
                ...(
                    method === 'post' ? {
                        'csrf-token': store.getState().csrf.value
                    } : {}
                ),
            },
            body: method === 'post' ? JSON.stringify(body) : undefined
        }
    );
}

export default myFetch;