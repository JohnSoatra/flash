import decrypt from "../../decrypt";

function decryptPhoneNumber(
    rawPhoneNumber: string,
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.USER_PHONE_NUMBER) {
        return decrypt(
            rawPhoneNumber,
            [
                process.env.USER_PHONE_NUMBER,
                hashPassword,
                rawEmail,
            ]
        );
    }

    throw new Error('Env file has no secret key for user phone number');
}

export default decryptPhoneNumber;