import { FieldValues, UseFormSetError, UseFormTrigger, UseFormWatch } from "react-hook-form";
import userChanged from "@/utils/user/changed";
import verifyEmailToken from "@/utils/fetch/email/verify/email";

type Props = {
    trigger: UseFormTrigger<FieldValues>,
    watch: UseFormWatch<FieldValues>,
    setError: UseFormSetError<FieldValues>
}
async function hasContactProblem({ trigger, watch, setError }: Props): Promise<boolean|string> {
    if (
        await trigger('email') &&
        await trigger('phone_number')
    ) {
        const email = watch('email');
        let verified: string|false;

        if (userChanged('email', email)) {
            if (await trigger('code')) {
                const code = watch('code');

                verified = await verifyEmailToken({
                    signal: null,
                    body: {
                        email,
                        token: code
                    }
                });

                if (verified === false) {
                    setError(
                        'code',
                        {
                            message: 'is incorrect.'
                        }
                    );

                    return true;
                } else {
                    return verified;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    return true;
}

export default hasContactProblem;