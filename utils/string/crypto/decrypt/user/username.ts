import decrypt from "../../decrypt";

function decryptUsername(
    rawUsername: string,
    rawEmail: string,
    hashPassword: string
) {
    if (process.env.USER_USERNAME) {
        return decrypt(
            rawUsername,
            [
                process.env.USER_USERNAME,
                hashPassword,
                rawEmail,
            ]
        );
    }

    throw new Error('Env file has no secret key for user username');
}

export default decryptUsername;