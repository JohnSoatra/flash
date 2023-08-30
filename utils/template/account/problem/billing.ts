import { FieldValues, UseFormTrigger } from "react-hook-form";

type Props = {
    trigger: UseFormTrigger<FieldValues>,
}
async function hasBillingProblem({ trigger }: Props): Promise<boolean> {
    if (
        await trigger('card_number') &&
        await trigger('expired_at') &&
        await trigger('cvc')
    ) {
        return false;
    }

    return true;
}

export default hasBillingProblem;