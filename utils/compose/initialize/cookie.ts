import { changeMuted, changeVolume } from "@/redux/cookie";
import { isNumber } from "@/utils/number/number";
import store from "@/redux/store";
import getCookie from "@/utils/fetch/cookie/get";

async function initialCookie() {
    const dispatch = store.dispatch;

    const muted = await getCookie({
      signal: null,
      query: {
        name: 'muted'
      }
    });

    const volume = await getCookie({
      signal: null,
      query: {
        name: 'volume'
      }
    });

    dispatch(changeMuted(muted ? (muted === 'true') : false));
    dispatch(changeVolume((volume && isNumber(volume)) ? +volume : 1));
}

export default initialCookie;