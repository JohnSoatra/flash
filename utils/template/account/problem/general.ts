import { FieldValues, UseFormTrigger } from "react-hook-form";

type Props = {
    trigger: UseFormTrigger<FieldValues>,
}
async function hasGeneralProblem({ trigger }: Props): Promise<boolean> {
    if (
        await trigger('avatar') &&
        await trigger('username') &&
        await trigger('fullname') &&
        await trigger('address')
    ) {
        return false;
    }

    return true;
}

export default hasGeneralProblem;