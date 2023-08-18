'use client';
import ROUTE from "@/constants/route";
import { Card, Button, Spinner } from "@material-tailwind/react";
import Link from "next/link";
import { RegisterOptions, useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Error from "@/components/Error";
import getOneUser from "@/utils/fetch/user/getone";
import { signIn } from "next-auth/react";

const OPTIONS: { [key: string]: RegisterOptions } = {
    'username': {
        required: {
            value: true,
            message: 'is required.'
        },
        minLength: {
            value: 3,
            message: 'must be at lease 3 characters.'
        },
        maxLength: {
            value: 30,
            message: 'must not be more then 30 characters.'
        },
        pattern: {
            value: /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
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
    condition: boolean,
    email: string,
    password: string,
    username: string
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

    const onSubmit = async (data: any) => {
        clearErrors('signin');
        setLoading(true);

        const dataField = data as Fields;

        const userRes = await getOneUser({
            username: dataField.username,
            password: dataField.password
        });

        if (userRes?.error) {
            
            setError('signin', { message: 'Input wrong information.' });

        } else if (userRes?.user) {

            const res = await signIn(
                'credentials',
                {
                    username: dataField.username,
                    password: dataField.password,
                    callbackUrl: ROUTE.HOME,
                }
            );

            if (res?.error) {
                setError('signin', { message: 'There are problem with signing in.' });
            }

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
                                    <label htmlFor="username">
                                        Username&nbsp;
                                    </label>
                                    {
                                        errors['username'] &&
                                        <Error message={String(errors['username']['message'])} />
                                    }
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    className="w-full block p-2.5 transition text-sm bg-transparent border border-midmain rounded-lg focus:border-blue-500"
                                    { ...register('username', OPTIONS['username']) }
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