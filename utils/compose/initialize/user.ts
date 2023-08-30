import store from "@/redux/store";
import getCookie from "@/utils/fetch/cookie/get";
import VARS from "@/constants/vars";
import getOneUser from "@/utils/fetch/user/getone";
import { setUser } from "@/redux/user";
import { UserC } from "@/gateway-types/typings";

async function initialUser(): Promise<UserC|null> {
  const accessToken = await getCookie({
    signal: null,
    query: {
      name: VARS.COOKIE.ACCESS_TOKEN
    }
  });

  if (accessToken !== null) {
    const dispatch = store.dispatch;

    const user = await getOneUser({
      signal: null
    });

    dispatch(setUser(user));

    return user;
  }

  return null;
}

export default initialUser;