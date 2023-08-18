import decrypt from "../../decrypt";

function decryptCreditcardCvc(
    rawCvc: string,
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.CREDIT_CARD_CVC) {
        return decrypt(
            rawCvc,
            [
                process.env.CREDIT_CARD_CVC,
                hashPassword,
                rawEmail,
            ]
        );
    }

    throw new Error('Env file has no secret key for creditcard cvc');
}

export default decryptCreditcardCvc;