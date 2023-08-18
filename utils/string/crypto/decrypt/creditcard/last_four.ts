import decrypt from "../../decrypt";

function decryptCreditcardLastFour(
    rawLastFour: string,
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.CREDIT_CARD_LAST_FOUR) {
        return decrypt(
            rawLastFour,
            [
                process.env.CREDIT_CARD_LAST_FOUR,
                hashPassword,
                rawEmail,
            ]
        );
    }

    throw new Error('Env file has no secret key for creditcard last four');
}

export default decryptCreditcardLastFour;