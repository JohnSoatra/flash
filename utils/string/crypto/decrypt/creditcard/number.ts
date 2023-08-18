import decrypt from "../../decrypt";

function decryptCreditcardNumber(
    rawNumber: string,
    rawEmail: string,
    hashPassword: string
) {
    let result = rawNumber;

    if (process.env.CREDIT_CARD_NUMBER) {
        for (let i = 0; i < 2; i++) {
            result = decrypt(
                result,
                [
                    process.env.CREDIT_CARD_NUMBER,
                    hashPassword,
                    rawEmail,
                ]
            );
        }

        return result;
    }

    throw new Error('Env file has no secret key for creditcard number');
}

export default decryptCreditcardNumber;