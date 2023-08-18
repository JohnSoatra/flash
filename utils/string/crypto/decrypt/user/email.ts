import decrypt from "../../decrypt";

function decryptEmail(
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.USER_EMAIL) {
        return decrypt(
            rawEmail, [
                process.env.USER_EMAIL,
                hashPassword,
            ]
        );
    }

    throw new Error('Env file has no secret key for user email');
}

export default decryptEmail;