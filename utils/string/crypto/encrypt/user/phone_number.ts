import encrypt from "../../encrypt";

function encryptPhoneNumber(
    rawPhoneNumber: string,
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.USER_PHONE_NUMBER) {
        return encrypt(
            rawPhoneNumber,
            [
                rawEmail,
                hashPassword,
                process.env.USER_PHONE_NUMBER
            ]
        );
    }

    throw new Error('Env file has no secret key for user phone number');
}

export default encryptPhoneNumber;