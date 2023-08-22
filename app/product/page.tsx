import { Metadata } from 'next';
import React from 'react';
import Index from './index';
import getOneProduct from '@/utils/fetch/product/getone';
import { serialize } from 'next-mdx-remote/serialize';

type Prop = {
    searchParams?: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
    title: 'Flash | Product',
    description: 'Product detail page'
}

const ProductDetail = async ({ searchParams }: Prop) => {
    if (
        searchParams &&
        searchParams['id'] &&
        typeof(searchParams['id']) === "string"
    ) {
        const product = await getOneProduct({
            query: {
                id: searchParams['id']
            },
            signal: null
        });
        
        if (product) {
            let mdxSource = null;
            
            if (product.readme_url) {
                const res = await fetch(product.readme_url);
                
                if (res.status === 200) {
                    let readme = await res.text();
                    
                    if (readme) {
                        mdxSource = await serialize(readme, {
                            parseFrontmatter: true,
                            mdxOptions: {
                                format: 'md',
                            },
                        });
                    }
                }
            }

            return (
                <Index
                    product={product}
                    mdxSource={mdxSource}
                />
            );
        }
    }

    return null;
}

export default ProductDetail;