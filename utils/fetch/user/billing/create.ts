import { UpdateoneBillingRouter } from "@/prisma-types/typings";
import { CreateBilling } from "@/typings";
import clear from "@/utils/string/clear";

async function createBilling(args: CreateBilling): Promise<UpdateoneBillingRouter> {
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

export default createBilling;