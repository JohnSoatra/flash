import encrypt from "../../encrypt";

function encryptCreditcardLastFour(
    rawLastFour: string,
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.CREDIT_CARD_LAST_FOUR) {
        return encrypt(
            rawLastFour,
            [
                rawEmail,
                hashPassword,
                process.env.CREDIT_CARD_LAST_FOUR
            ]
        );
    }

    throw new Error('Env file has no secret key for creditcard last four');
}

export default encryptCreditcardLastFour;