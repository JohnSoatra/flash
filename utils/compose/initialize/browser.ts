import { setBrowserId, setVisitorId } from "@/redux/browser";
import store from "@/redux/store";
import getBrowserId from "@/utils/browser/get_browser_id";
import getVisitorId from "@/utils/browser/get_visitor_id";

async function initialBrowser() {
    const dispatch = store.dispatch;

    const browserId = await getBrowserId();
    const visitorId = await getVisitorId();

    dispatch(setBrowserId(browserId));
    dispatch(setVisitorId(visitorId));
}

export default initialBrowser;