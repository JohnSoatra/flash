'use client';
import VARS from "@/constants/vars";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";
import { UserC } from "@/prisma-types/typings";

function isEmptySearchPage(
    pathName: string,
    param: ReadonlyURLSearchParams
) {
    const string = param.get('string');


    if (pathName === '/search' && (string === null || string === '')) {
        return true;
    }

    return false;
}

const Index = ({ children, user }: {
    children: React.ReactNode
}) => {
    const pathName = usePathname();
    const param = useSearchParams();
    const includeHeader = VARS.HIDE_HEADER.findIndex(header => pathName.startsWith(header)) < 0;
    const includeFooter = VARS.HIDE_FOOTER.findIndex(footer => pathName.startsWith(footer)) < 0;
    const emptySearchPage = isEmptySearchPage(pathName, param);

    return (
        <>
            {
                includeHeader ?
                    <Header
                        pathName={pathName}
                        isEmptySearchPage={emptySearchPage}
                    /> :
                    <div></div>
            }
            {
                children
            }
            {
                (includeFooter && !emptySearchPage) ?
                    <Footer /> :
                    <div></div>

            }
        </>
    );
}

export default Index;