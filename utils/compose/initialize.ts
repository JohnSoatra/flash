import getOneCsrf from "@/utils/fetch/csrf/getone";
import store from "@/redux/store";
import { setCsrf } from "@/redux/csrf";
import getCookie from "../fetch/cookie/get";
import { changeMuted, changeVolume } from "@/redux/cookie";
import { isNumber } from "../number/number";
import getOneUser from "../fetch/user/getone";

async function initializeJob() {
    const dispatch = store.dispatch;
    const muted = await getCookie({ name: 'muted' });
    const volume = await getCookie({ name: 'volume' });
    const csrfToken = await getOneCsrf();
    const user = await getOneUser();


  
    dispatch(changeMuted({
      muted: muted ? (muted === 'true') : false
    }));
  
    dispatch(changeVolume({
      volume: (volume && isNumber(volume)) ? +volume : 1 
    }));

    store.dispatch(setCsrf(csrfToken));
}

export default initializeJob;