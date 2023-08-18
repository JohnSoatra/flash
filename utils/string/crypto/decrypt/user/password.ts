import decrypt from "../../decrypt";

function decryptPassword(hashPassword: string) {
    if (process.env.USER_PASSWORD) {
        let result = hashPassword;

        for (let i = 0; i < 5; i ++) {
            result = decrypt(
                result,
                [
                    process.env.USER_PASSWORD
                ]
            );
        }

        return result;
    }

    throw new Error('Env file has no secret key for user password');
}

export default decryptPassword;