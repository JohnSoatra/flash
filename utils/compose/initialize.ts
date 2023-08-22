import store from "@/redux/store";
import getOneCsrf from "@/utils/fetch/csrf/getone";
import getCookie from "../fetch/cookie/get";
import getOneUser from "../fetch/user/getone";
import { setCsrf } from "@/redux/csrf";
import { changeMuted, changeVolume } from "@/redux/cookie";
import { isNumber } from "../number/number";
import { setUser } from "@/redux/user";

async function initializeJob() {
    const dispatch = store.dispatch;
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
  
    dispatch(changeMuted(muted ? (muted === 'true') : false));
    dispatch(changeVolume((volume && isNumber(volume)) ? +volume : 1));
    dispatch(setCsrf(csrfToken));
    dispatch(setUser(user));
}

export default initializeJob;