import getStoreUrl from "../env/public/store_url";
import hasProtocol from "./has_protocol";

function withStoreUrl(url: string) {
    return hasProtocol(url) ? url : (getStoreUrl() + '/file/get?name=' + url);
}

withStoreUrl('helloworld')

export default withStoreUrl;