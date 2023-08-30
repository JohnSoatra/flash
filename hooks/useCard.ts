import { useSelector } from "react-redux";
import { selectCard } from "@/redux/card";

function useCard() {
    return useSelector(selectCard);
}

export default useCard;