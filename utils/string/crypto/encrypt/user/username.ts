import encrypt from "../../encrypt";

function encodeUsername(rawUsername: string) {
    if (process.env.USER_USERNAME) {
        return encrypt(
            rawUsername,
            [
                rawEmail,
                hashPassword,
                process.env.USER_USERNAME
            ]
        );
    }

    throw new Error('Env file has no secret key for user username');
}

export default encodeUsername;