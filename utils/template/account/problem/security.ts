import { FieldValues, UseFormTrigger } from "react-hook-form";

type Props = {
    trigger: UseFormTrigger<FieldValues>,
}
async function hasSecurityProblem({ trigger }: Props): Promise<boolean> {
    if (await trigger('password')) {
        return false;
    }

    return true;
}

export default hasSecurityProblem;