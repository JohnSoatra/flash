'use client';
import ROUTE from "@/constants/route";
import VARS from "@/constants/vars";
import Image from "next/image";
import Link from "next/link";

const SITEMAP = [
    {
        title: "Company",
        links: ["About Us"],
    },
    {
        title: "Help Center",
        links: ["Support"],
    },
    {
        title: "Resources",
        links: ["Blog"],
    },
    {
        title: "Products",
        links: ["Apple", "Samsung"],
    },
];
 
const Footer = () => {
    return (
        <footer className="relative w-full">
            
            <div className="w-screen h-px bg-light-400"></div>

            <div className="w-full min-h-[19rem] bg-white/60 p-10">
                <div className="flex justify-center">
                    <Link href={ROUTE.HOME}>
                        <div className='relative h-10 w-10 cursor-pointer opacity-75 transition hover:opacity-100'>
                            <Image
                                priority
                                src={'/flash.svg'}
                                alt='header'
                                fill={true}
                                sizes="100%"
                                className='object-contain'
                            />
                        </div>
                    </Link>
                </div>

                <div className="mx-auto w-full flex flex-col items-center max-w-7xl px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-8 py-12 md:grid-cols-4">
                        {
                            SITEMAP.map(({ title, links }, key) =>
                                <div key={key} className="w-full flex flex-col space-y-1">
                                    <h2
                                        className="text-sm font-bold uppercase opacity-50">
                                        {title}
                                    </h2>
                                    <ul className="space-y-1">
                                    {
                                        links.map((link, key) =>
                                            <li
                                                key={key}
                                                className="font-normal opacity-75 hover:underline underline-offset-2">
                                                <Link
                                                    href="#"
                                                    className="py-1 pr-2">
                                                    {link}
                                                </Link>
                                            </li>
                                        )
                                    }
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="w-screen h-px bg-light-400"></div>

            <div className="flex justify-center bg-gradient-to-b from-white">
                <div className="w-full max-w-2xl flex flex-col items-center justify-center py-4 md:py-10 md:flex-row md:justify-between">
                
                    <p className="text-sm mb-4 text-center font-normal opacity-75 text-blue-gray-900 md:mb-0">
                        &copy; {
                            VARS.START_YEAR < VARS.CURRENT_YEAR ?
                                (VARS.START_YEAR + '-' + VARS.CURRENT_YEAR) :
                                VARS.CURRENT_YEAR
                        }
                        <a href="https://material-tailwind.com/">&nbsp;Flash</a>.&nbsp;
                        All Rights Reserved.
                    </p>
                    <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
                
                        <Link
                            href="https://facebook.com/flash"
                            className="opacity-60 transition-opacity hover:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                            </svg>
                        </Link>
                        <Link
                            href="https://tweeter.com/flash"
                            className="opacity-60 transition-opacity hover:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                            </svg>
                        </Link>
                        <Link
                            href="https://youtube.com/flash"
                            className="opacity-60 transition-opacity hover:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;