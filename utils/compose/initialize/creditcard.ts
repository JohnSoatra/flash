import store from "@/redux/store";
import getOneCreditCard from "@/utils/fetch/creditcard/getone";
import { setCreditcard } from "@/redux/creditcard";

async function initialCreditcard() {
  const dispatch = store.dispatch;

  const creditcard = await getOneCreditCard({
    signal: null
  });

  dispatch(setCreditcard(creditcard));
}

export default initialCreditcard;