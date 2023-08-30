import { setCsrf } from "@/redux/csrf";
import store from "@/redux/store";
import getOneCsrf from "@/utils/fetch/csrf/getone";

async function initialCsrf() {
    const dispatch = store.dispatch;

    const csrfToken = await getOneCsrf({
        signal: null
    });

    dispatch(setCsrf(csrfToken));
}

export default initialCsrf;