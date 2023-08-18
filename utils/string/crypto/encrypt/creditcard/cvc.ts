import encrypt from "../../encrypt";

function encryptCreditcardCvc(
    rawCvc: string,
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.CREDIT_CARD_CVC) {
        return encrypt(
            rawCvc,
            [
                rawEmail,
                hashPassword,
                process.env.CREDIT_CARD_CVC
            ]
        );
    }

    throw new Error('Env file has no secret key for creditcard cvc');
}

export default encryptCreditcardCvc;