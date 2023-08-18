const Error = ({ message }: { message: string }) => {
    return (
        <div className="text-sm text-red-600 opacity-90"><pre>{message}</pre></div>
    );
}

export default Error;