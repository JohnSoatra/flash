type Prop = {
    code: string
}

const ResetPass = ({ code }: Prop) => {
    return ({
        subject: `Reset Password`,
        body: (
            <div>
                <span>
                    <span>This is the code to reset your password,</span>
                    <span style={{fontSize: 18}}>{code}</span>
                    <span>.</span>
                </span>
            </div>
        )
    });
}

export default ResetPass;