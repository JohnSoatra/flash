'use client';
import BillingAccount from "@/components/template/account/Creditcard";
import ContactAccount from "@/components/template/account/Contact";
import GeneralAccount from "@/components/template/account/General";
import SecurityAccount from "@/components/template/account/Security";
import React, { useState } from "react";
import { PiSlidersHorizontal } from 'react-icons/pi';
import { MdOutlineAssignment, MdOutlineSecurity, MdPayment } from 'react-icons/md';
import { RegisterOptions, useForm } from "react-hook-form";
import VARS from "@/constants/vars";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import zxcvbn from "zxcvbn";
import updateGeneral from "@/utils/fetch/user/general/update";
import userChanged from "@/utils/user/changed";
import { toast } from "react-hot-toast";
import updateUserState from "@/utils/user/update";
import PasswordPopover from "@/components/template/password/PasswordPopover";
import sendEmailVerifyEmail from "@/utils/fetch/email/send/verify_email";
import updateContact from "@/utils/fetch/user/contact/update";
import verifyPassword from "@/utils/fetch/user/verify_password";
import updateSecurity from "@/utils/fetch/user/security/update";
import updateBilling from "@/utils/fetch/user/billing/update";
import expiredMonth from "@/utils/number/creditcard/month";
import expiredYear from "@/utils/number/creditcard/year";
import updateImage from "@/utils/fetch/file/update_image";
import hasContactProblem from "@/utils/template/account/problem/contact";
import hasSecurityProblem from "@/utils/template/account/problem/security";
import hasBillingProblem from "@/utils/template/account/problem/billing";
import hasGeneralProblem from "@/utils/template/account/problem/general";
import trimCardNumber from "@/utils/number/creditcard/trim_number";
import useCreditcard from "@/hooks/useCredicard";

const Class = {
    Icon: 'w-4 h-4 opacity-75',
    TabWrapper: (selected: boolean) => selected ? 'visible' : 'invisible',
    Container: 'relative min-h-[calc(100vh-3rem)] max-w-4xl md:min-h-[calc(100vh-4rem)] mx-auto flex flex-col md:flex-row md:items-stretch',
    BlockWrapper: '',
}

const buttonIds = [
    'general',
    'contact',
    'security',
    'billing'
]

const icons = [
    <PiSlidersHorizontal className={Class.Icon} />,
    <MdOutlineAssignment className={Class.Icon} />,
    <MdOutlineSecurity className={Class.Icon} />,
    <MdPayment className={Class.Icon} />,
];

const BlockWrapper = ({
    className,
    id,
    children
}: { 
    className?: string,
    id: string,
    children: React.ReactNode
}) => {
    return (
        <div
            id={id}
            className={className}>
            <div className="mb-5 flex items-end justify-between">
                <p className="opacity-75 text-xl md:text-2xl lg:text-3xl font-semibold capitalize">{id}</p>
            </div>
            {children}
        </div>
    );
}

const OPTIONS: { [key: string]: RegisterOptions } = {
    'avatar': {
        validate: (images: FileList) => {
            if (images['length'] > 0) {
                if (images[0].size > (2 * VARS.SIZE.MB)) {
                    return 'must not more then 2MB.';
                }
            }
        }
    },
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
    'fullname': {
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
            value: /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])( (?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.]))*$/,
            message: 'is in wrong format.'
        }
    },
    'address': {
        minLength: {
            value: 3,
            message: 'must be at lease 3 characters.'
        },
    },

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
    'code': {
        required: {
            value: true,
            message: 'is required.'
        },
        minLength: {
            value: 6,
            message: 'has 6 characters.'
        },
        maxLength: {
            value: 6,
            message: 'has 6 characters.'
        }
    },
    'phone_number': {
        pattern: {
            value: /^0[0-9]{8,9}$/,
            message: 'is in wrong format.'
        }
    },

    'password': {
        minLength: {
            value: 8,
            message: 'must be at lease 8 characters.'
        },
        maxLength: {
            value: 40,
            message: 'must not be more then 40 characters.'
        },
        validate: (value: string) => {
            if (zxcvbn(value).score > 2) {
                return true
            }

            return 'is not strong enough.'
        }
    },

    'card_number': {
        required: {
            value: true,
            message: 'is require.',
        },
        pattern: {
            value: /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/,
            message: 'is in wrong format.'
        }
    },
    'expired_at': {
        required: {
            value: true,
            message: 'is require.',
        },
        pattern: {
            value: /^[0-9]{2} \/ [0-9]{2}$/,
            message: 'is in wrong format.'
        }
    },
    'cvc': {
        required: {
            value: true,
            message: 'is require.',
        },
        pattern: {
            value: /^[0-9]{3,4}$/,
            message: 'is in wrong format.'
        }
    },

    'confirm_password': {
        required: {
            value: true,
            message: 'is require.',
        },
        minLength: {
            value: 8,
            message: 'must be at lease 8 characters.'
        },
        maxLength: {
            value: 40,
            message: 'must not be more then 40 characters.'
        }
    },
}

const Index = () => {
    const user = useUser({ require: true });
    const creditcard = useCreditcard();
    const {
        register,
        trigger,
        watch,
        setError,
        clearErrors,
        formState: { errors },
        setValue
    } = useForm();
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [changedGeneral, setChangedGeneral] = useState(false);
    const [changedContact, setChangedContact] = useState(false);
    const [changedSecurity, setChangedSecurity] = useState(false);
    const [changedBilling, setChangedBilling] = useState(false);

    const onSave = async () => {
        if (changedContact || changedSecurity || changedBilling) {
            if (
                (changedGeneral ? !(await hasGeneralProblem({ trigger })) : true) &&
                (changedContact ? !((await hasContactProblem({ trigger, watch, setError })) === true) : true) &&
                (changedSecurity ? !(await hasSecurityProblem({ trigger })) : true) &&
                (changedBilling ? !(await hasBillingProblem({ trigger })) : true)
            ) {
                setShowConfirm(true);
            } else {
                toast.error(
                    'There a an invalid input value.',
                    {
                        position: 'bottom-center',
                        duration: VARS.DURATION.TOAST.DEFAULT
                    }
                );
            }
        } else {
            const ok = await saveGeneral();

            if (ok === false) {
                toast.error(
                    'Updating General has a problem.',
                    {
                        position: 'bottom-center',
                        duration: VARS.DURATION.TOAST.DEFAULT
                    }
                );
            } else if (ok === true) {
                toast.success(
                    'Updated General information.',
                    {
                        position: 'bottom-center',
                        duration: VARS.DURATION.TOAST.DEFAULT
                    }
                );

                setChangedGeneral(false);
            }
        }
    }

    const onConfirm = async () => {
        if (await trigger('confirm_password')) {
            const password = watch('confirm_password');

            const matchedPassword = await verifyPassword({
                signal: null,
                body: {
                    password: password
                }
            });

            if (matchedPassword) {
                setValue('confirm_password', '');
                setShowConfirm(false);

                if (changedGeneral) {
                    const ok = await saveGeneral();
        
                    if (ok === false) {
                        toast.error(
                            'Updating General has a problem.',
                            {
                                position: 'bottom-center',
                                duration: VARS.DURATION.TOAST.DEFAULT
                            }
                        );
                    } else if (ok === true) {
                        toast.success(
                            'Updated General information.',
                            {
                                position: 'bottom-center',
                                duration: VARS.DURATION.TOAST.DEFAULT
                            }
                        );
        
                        setChangedGeneral(false);
                    }
                }

                if (changedContact) {
                    const ok = await saveContact(password);

                    if (ok === false) {
                        toast.error(
                            'Updating Contact has a problem.',
                            {
                                position: 'bottom-center',
                                duration: VARS.DURATION.TOAST.DEFAULT
                            }
                        );
                    } else if (ok === true) {
                        toast.success(
                            'Updated Contact information.',
                            {
                                position: 'bottom-center',
                                duration: VARS.DURATION.TOAST.DEFAULT
                            }
                        );

                        setChangedContact(false);
                    }
                }

                if (changedSecurity) {
                    const ok = await saveSecurity(password);

                    if (ok === false) {
                        toast.error(
                            'Updating Security has a problem.',
                            {
                                position: 'bottom-center',
                                duration: VARS.DURATION.TOAST.DEFAULT
                            }
                        );
                    } else if (ok === true) {
                        toast.success(
                            'Updated Security information.',
                            {
                                position: 'bottom-center',
                                duration: VARS.DURATION.TOAST.DEFAULT
                            }
                        );

                        setChangedSecurity(false);
                    }
                }

                if (changedBilling) {
                    const ok = await saveBilling(password);

                    if (ok === false) {
                        toast.error(
                            'Updating Billing has a problem.',
                            {
                                position: 'bottom-center',
                                duration: VARS.DURATION.TOAST.DEFAULT
                            }
                        );
                    } else if (ok === true) {
                        toast.success(
                            'Updated Billing information.',
                            {
                                position: 'bottom-center',
                                duration: VARS.DURATION.TOAST.DEFAULT
                            }
                        );

                        setChangedBilling(false);
                    }
                }

            } else {
                setError(
                    'confirm_password',
                    {
                        message: 'is wrong.'
                    }
                );
            }
        }
    }

    const saveGeneral = async (): Promise<null|boolean> => {
        if (!(await hasGeneralProblem({ trigger }))) {
            const avatar = watch('avatar');
            const username = watch('username');
            const fullname = watch('fullname');
            const address = watch('address');

            let image_url: string|undefined;

            if (avatar.length > 0) {
                const avatar = watch('avatar');
                const data = new FormData();

                data.append('file', avatar[0]);

                const result = await updateImage({
                    signal: null,
                    body: data
                });

                if (result !== null) {
                    image_url = result;
                } else {
                    setError(
                        'avatar',
                        {
                            message: 'uploaded failed.'
                        }
                    );

                    return null;
                }
            }

            const atLeastOne =
                avatar.length > 0 ||
                userChanged('username', username) ||
                userChanged('fullname', fullname) ||
                userChanged('address', address);

            if (atLeastOne) {
                const body = {
                    image_url: image_url,
                    username: userChanged('username', username) ? username : undefined,
                    fullname: userChanged('fullname', fullname) ? fullname : undefined,
                    address: userChanged('address', address) ? address : undefined
                }

                const result = await updateGeneral({
                    signal: null,
                    body: body
                });

                if (result === true) {
                    setValue('avatar', []);
                    updateUserState(body);
                }

                return result === true;
            }

            return true;
        }

        return null;
    }

    const saveContact = async (password: string): Promise<null|boolean> => {
        const hasProblem = await hasContactProblem({ trigger, watch, setError });

        if (hasProblem !== true) {
            const verified = hasProblem === false ? undefined : hasProblem;
            const email = watch('email');
            const phoneNumber = watch('phone_number');
            const atLeastOne =
                userChanged('email', email) ||
                userChanged('phone_number', phoneNumber);

            if (atLeastOne) {
                const body = {
                    email: userChanged('email', email) ? email : undefined,
                    email_token: userChanged('email', email) ? verified : undefined,
                    phone_number: userChanged('phone_number', phoneNumber) ? phoneNumber : undefined,
                    password: password,
                }

                const result = await updateContact({
                    signal: null,
                    body: {
                        email: userChanged('email', email) ? email : undefined,
                        email_token: userChanged('email', email) ? (verified! as string) : undefined,
                        phone_number: userChanged('phone_number', phoneNumber) ? phoneNumber : undefined,
                        password: password,
                    }
                });

                if (result === true) {
                    updateUserState(body);
                }

                return result === true;
            }

            return true;
        }

        return null;
    }

    const saveSecurity = async (password: string): Promise<null|boolean> => {
        if (!(await hasSecurityProblem({ trigger }))) {
            const newPassword = watch('password');

            if (newPassword !== password) {

                const result = await updateSecurity({
                    signal: null,
                    body: {
                        new_password: newPassword,
                        old_password: password
                    }
                });

                if (result === true) {
                    setValue('password', '');
                }

                return result === true;
            }

            return true;
        }

        return null;
    }

    const saveBilling = async (password: string): Promise<null|boolean> => {
        if (!(await hasBillingProblem({ trigger }))) {
            const cardNumber = watch('card_number');
            const expired_at = watch('expired_at');
            const cvc = watch('cvc');

            const result = await updateBilling({
                signal: null,
                body: {
                    card_number: trimCardNumber(cardNumber),
                    expired_month: expiredMonth(expired_at),
                    expired_year: expiredYear(expired_at),
                    cvc: cvc,
                    password: password,
                }
            });

            if (result === true) {
                setValue('card_number', '');
                setValue('expired_at', '');
                setValue('cvc', '');
            }

            return result === true;
        }

        return null;
    }

    const requestCode = async () => {
        clearErrors('email');

        if (await trigger('email')) {
            const email = watch('email');
            const result = await sendEmailVerifyEmail({
                body: {
                    email
                },
                signal: null
            });

            if (result === true) {
                toast.success(
                    <p>Code has been send to <b>{email}</b>.</p>,
                    {
                        position: 'bottom-center',
                        duration: VARS.DURATION.TOAST.DEFAULT
                    }
                );
            } else if (result === false) {
                setError(
                    'email',
                    {
                        message: 'cannot receive message.'
                    }
                );
            } else {
                setError(
                    'email',
                    {
                        message: 'is already used with another account.'
                    }
                );
            }
        }
    }

    if (user === null) {
        return null;
    }

    return (
        <div className={Class.Container}>

            <div className="md:min-w-[10rem] max-h-80 flex flex-col justify-center items-center">
                <ul
                    className={`
                        flex flex-nowrap overflow-x-scroll md:w-full
                        md:flex-col md:overflow-y-scroll
                    `}>
                    {
                        buttonIds.map((info, index) => 
                            <Link
                                key={index}
                                href={'#' + buttonIds[index]}
                                className={`
                                    w-full flex space-x-2 py-3 px-4 pb-5 items-center hover:text-blue-500
                                    md:pl-10 md:space-x-3 md:pb-0
                                    ${
                                        (selectedIndex === index) &&
                                        'text-blue-600'
                                    }
                                `}
                                onClick={() => setSelectedIndex(index)}>
                                {
                                    icons[index]
                                }
                                <p className={`text-sm font-medium text-start cursor-default capitalize`}>
                                    {info}
                                </p>
                            </Link>
                        )
                    }

                </ul>
            </div>
            
            <div className="flex flex-1 flex-col p-5 md:p-10 mb-8 mx-5 md:ml-0 md:mr-10 md:mt-5 bg-stone-50 border border-light-400 rounded-lg">
                <div className="space-y-10">
                    <BlockWrapper id="general">
                        <GeneralAccount
                            user={user}
                            register={register}
                            errors={errors}
                            options={OPTIONS}
                            onFormChanged={() => {
                                const avatar = watch('avatar');
                                const username = watch('username');
                                const fullname = watch('fullname');
                                const address = watch('address');

                                if (
                                    avatar.length > 0 ||
                                    userChanged('username', username) ||
                                    userChanged('fullname', fullname) ||
                                    userChanged('address', address)
                                ) {
                                    setChangedGeneral(true);
                                } else {
                                    setChangedGeneral(false);
                                }

                            }}
                            onImageOversize={() => {
                                setError('avatar', {
                                    message: 'must not more then 2MB.'
                                });
                            }}
                            onImageRightsize={() => {
                                clearErrors('avatar');
                            }}
                        />
                    </BlockWrapper>

                    <BlockWrapper
                        id="contact"
                        className={Class.BlockWrapper}>
                        <ContactAccount
                            user={user}
                            register={register}
                            errors={errors}
                            options={OPTIONS}
                            onFormChanged={() => {
                                const email = watch('email');
                                const phone_number = watch('phone_number');

                                if (
                                    userChanged('email', email) ||
                                    userChanged('phone_number', phone_number)
                                ) {
                                    setChangedContact(true);
                                } else {
                                    setChangedContact(false);
                                }

                            }}
                            onRequestCode={requestCode}
                        />
                    </BlockWrapper>

                    <BlockWrapper
                        id="security"
                        className={Class.BlockWrapper}>
                        <SecurityAccount
                            user={user}
                            register={register}
                            errors={errors}
                            options={OPTIONS}
                            onFormChanged={() => {
                                const password = watch('password');

                                if (password) {
                                    setChangedSecurity(true);
                                } else {
                                    setChangedSecurity(false);
                                }
                            }}
                        />
                    </BlockWrapper>

                    <BlockWrapper
                        id="billing"
                        className={Class.BlockWrapper}>
                        <BillingAccount
                            creditCard={creditcard}
                            register={register}
                            errors={errors}
                            options={OPTIONS}
                            onFormChanged={({ cardNumber, expiredAt, cvc }) => {
                                if (cardNumber || expiredAt || cvc) {
                                    setChangedBilling(true);
                                } else {
                                    setChangedBilling(false);
                                }
                            }}
                        />
                    </BlockWrapper>

                </div>
                {
                    (
                        changedGeneral ||
                        changedContact ||
                        changedSecurity ||
                        changedBilling
                    ) &&
                    <div className="my-5 sticky bottom-2.5 right-0 flex justify-end">
                        <button
                            type="button"
                            className="w-fit transition text-white border border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm md:text-base px-3 py-1.5 md:px-4 md:py-2 text-center"
                            onClick={onSave}>
                            Save
                        </button>

                        <PasswordPopover
                            open={showConfirm}
                            errors={errors}
                            options={OPTIONS}
                            register={register}
                            onConfirm={onConfirm}
                            onCancel={() => setShowConfirm(false)}
                            onOutside={() => setShowConfirm(false)}
                        />
                    </div>
                }
            </div>

        </div>
    );
}

export default Index;