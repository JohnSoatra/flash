import encrypt from "../../encrypt";

function encryptEmail(
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.USER_EMAIL) {
        return encrypt(
            rawEmail, [
                hashPassword,
                process.env.USER_EMAIL
            ]
        );
    }

    throw new Error('Env file has no secret key for user email');
}

export default encryptEmail;