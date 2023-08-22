'use client';
import ROUTE from "@/constants/route";
import { Card, Button, Spinner } from "@material-tailwind/react";
import Link from "next/link";
import { RegisterOptions, useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Error from "@/components/Error";
import signin from "@/utils/fetch/auth/signin";
import { useRouter } from "next/navigation";

const OPTIONS: { [key: string]: RegisterOptions } = {
    'email': {
        required: {
            value: true,
            message: 'is required.'
        },
        minLength: {
            value: 5,
            message: 'must be at lease 5 characters.'
        },
        maxLength: {
            value: 40,
            message: 'must not be more then 40 characters.'
        },
        pattern: {
            value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
            message: 'is in wrong format.'
        }
    },
    'password': {
        required: {
            value: true,
            message: 'is required.'
        },
        minLength: {
            value: 8,
            message: 'must be at lease 8 characters.'
        },
        maxLength: {
            value: 40,
            message: 'must not be more then 40 characters.'
        }
    }
}

type Fields = {
    email: string,
    password: string,
}
   
const Index = () => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: any) => {
        clearErrors(['email', 'password', 'signin']);
        setLoading(true);

        const dataField = data as Fields;
        const email = dataField.email;
        const password = dataField.password;

        const result = await signin({
            body: {
                email,
                password,
            },
            signal: null
        });

        if (result) {
            router.push(ROUTE.HOME);
        } else {
            setError(
                'signin',
                {
                    message: 'Input wrong information.'
                }
            );
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="border border-midmain shadow-lg h-fit py-5 px-10 rounded-lg">
                <Card color="transparent" shadow={false}>
                    <div className="flex justify-center items-center space-x-3 mb-3 md:mb-5">
                        <div className='relative border border-midmain rounded-full h-12 w-12 md:w-14 md:h-14 cursor-pointer opacity-80 transition hover:opacity-100'>
                            <Image
                                priority
                                src={'/flash-wb.png'}
                                alt='header'
                                fill={true}
                                sizes="100%"
                                className='object-contain'
                            />
                        </div>
                        <p className="text-xl md:text-2xl font-extrabold">Flash</p>
                    </div>
                    
                    <div>
                        <p className="text-2xl md:text-3xl font-bold">
                            Sign In
                        </p>
                        <p className="text-sm md:text-base mt-1 font-normal opacity-85">
                            Enter your information to sign in.
                        </p>
                    </div>

                    <form
                        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                        onSubmit={handleSubmit(onSubmit)}>

                        <div className="mb-4 flex flex-col gap-6">
                
                            <div>
                                <div className="mb-2 text-sm font-medium flex items-start ">
                                    <label htmlFor="email">
                                        Email&nbsp;
                                    </label>
                                    {
                                        errors['email'] &&
                                        <Error message={String(errors['email']['message'])} />
                                    }
                                </div>
                                <input
                                    type="text"
                                    id="email"
                                    className="w-full block p-2.5 transition text-sm bg-transparent border border-midmain rounded-lg focus:border-blue-500"
                                    { ...register('email', OPTIONS['email']) }
                                />
                            </div>

                            <div>
                                <div className="mb-2 text-sm font-medium flex items-start ">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium">
                                        Password&nbsp;
                                    </label>
                                    {
                                        errors['password'] &&
                                        <Error message={String(errors['password']['message'])} />
                                    }
                                </div>

                                <input
                                    type="password"
                                    id="password"
                                    className="w-full block p-2.5 transition text-sm bg-transparent border border-midmain rounded-lg focus:border-blue-500"
                                    { ...register('password', OPTIONS['password']) }
                                />
                            </div>

                        </div>

                        {
                            errors['signin'] &&
                            <Error message={String(errors['signin']['message'])} />
                        }

                        <div className="mt-6">
                            <div className="flex justify-end text-sm text-center pr-2 pb-2">
                                <p className="opacity-75">Forgot password?&nbsp;</p>
                                <Link
                                    href={ROUTE.RESET_PASS}
                                    className="font-medium transition-colors text-blue-500 hover:text-blue-600">
                                    Reset
                                </Link>
                            </div>
                            <Button
                                type="submit"
                                className="flex items-center justify-center space-x-2"
                                fullWidth
                                disabled={loading}>
                                {
                                    loading ?
                                    <>
                                        <Spinner className="w-4"/>
                                        <p>Signing in...</p>
                                    </> :
                                    <p>Sign in</p>
                                }
                            </Button>
                        </div>

                        <div className="flex justify-center mt-4 text-sm text-center">
                            <p className="opacity-75">Don't have an account yet?&nbsp;</p>
                            <Link
                                href={ROUTE.SIGN_UP}
                                className="font-medium transition-colors text-blue-500 hover:text-blue-600">
                                Sign up
                            </Link>
                        </div>

                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Index;