import store from "@/redux/store";
import getOneCsrf from "@/utils/fetch/csrf/getone";
import getCookie from "@/utils/fetch/cookie/get";
import getOneUser from "@/utils/fetch/user/getone";
import { setCsrf } from "@/redux/csrf";
import { changeMuted, changeVolume } from "@/redux/cookie";
import { isNumber } from "@/utils/number/number";
import { setUser } from "@/redux/user";
import { setInitialed } from "@/redux/initialed";
import getBrowserId from "@/utils/browser/get_browser_id";
import getVisitorId from "@/utils/browser/get_visitor_id";
import { setBrowserId, setVisitorId } from "@/redux/browser";

async function initialize() {
    const dispatch = store.dispatch;

    const browserId = await getBrowserId();
    const visitorId = await getVisitorId();

    const csrfToken = await getOneCsrf({
      signal: null
    });

    const muted = await getCookie({
      query: {
        name: 'muted'
      },
      signal: null
    });
    const volume = await getCookie({
      query: {
        name: 'volume'
      },
      signal: null
    });
    const user = await getOneUser({
      signal: null
    });

    dispatch(setBrowserId(browserId));
    dispatch(setVisitorId(visitorId));
    dispatch(setCsrf(csrfToken));
    dispatch(changeMuted(muted ? (muted === 'true') : false));
    dispatch(changeVolume((volume && isNumber(volume)) ? +volume : 1));
    dispatch(setUser(user));
    dispatch(setInitialed());
}

export default initialize;