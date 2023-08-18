import { UpdateoneBillingRouter } from "@/prisma-types/typings";
import { UpdateBilling } from "@/typings";
import clear from "@/utils/string/clear";

async function updateBilling(args: UpdateBilling): Promise<UpdateoneBillingRouter> {
    const res = await fetch(clear(`
        ${process.env.GATEWAY_URL}/user/updateone/billing
    `), {
        signal: args.signal,
        credentials: 'include',
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            'password': args.password,
            'card_number': args.cardNumber,
            'expired_month': args.expiredMonth,
            'expired_year': args.expiredYear,
            'cvc': args.cvc,
        })
    });

    const json = await res.json();

    return json;
}

export default updateBilling;