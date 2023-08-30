import store from "@/redux/store";
import initialBrowser from "./initialize/browser";
import initialCsrf from "./initialize/csrf";
import initialCookie from "./initialize/cookie";
import initialUser from "./initialize/user";
import initialCard from "./initialize/card";
import { setInitialed } from "@/redux/initialed";
import initialCreditcard from "./initialize/creditcard";

async function initial() {
  const dispatch = store.dispatch;

  await initialBrowser();
  await initialCsrf();
  await initialCookie();

  const user = await initialUser();

  if (user !== null) {
    await initialCard();
    await initialCreditcard();
  }

  dispatch(setInitialed());
}

export default initial;