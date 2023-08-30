import { useSelector } from "react-redux";
import { selectCreditcard } from "@/redux/creditcard";

function useCreditcard() {
    return useSelector(selectCreditcard);
}

export default useCreditcard;