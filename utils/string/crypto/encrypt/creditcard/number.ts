import encrypt from "../../encrypt";

function encryptCreditcardNumber(
    rawNumber: string,
    rawEmail: string,
    hashPassword: string
) {
    let result = rawNumber;

    if (process.env.CREDIT_CARD_NUMBER) {
        for (let i = 0; i < 2; i++) {
            result = encrypt(
                result,
                [
                    rawEmail,
                    hashPassword,
                    process.env.CREDIT_CARD_NUMBER
                ]
            );
        }

        return result;
    }

    throw new Error('Env file has no secret key for creditcard number');
}

export default encryptCreditcardNumber;