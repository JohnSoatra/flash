import store from "@/redux/store";
import getManyCards from "@/utils/fetch/card/getmany";
import { setCard } from "@/redux/card";

async function initialCard() {
  const dispatch = store.dispatch;

  const card = await getManyCards({
    signal: null
  });

  dispatch(setCard(card));
}

export default initialCard;