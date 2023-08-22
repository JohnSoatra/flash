import { ReleasedAt, ReloadReason } from "@/typings";
import path from 'path';

const rootPath = path.dirname(__dirname);

const VARS = {
    START_YEAR: 2023,
    ENV_PATH: path.join(rootPath, '.env.local'),
    CURRENT_YEAR: new Date().getFullYear(),
    ConfigAge: 60 * 60 * 24,
    HIDE_HEADER: [
        '/signin',
        '/signup',
        '/reset',
        '/test',
        // '/account',
        '/checkout'
    ],
    HIDE_FOOTER: [
        '/signin',
        '/signup',
        '/reset',
        '/test',
        // '/account'
    ],
    MEDIA_SERVER: 'http://localhost:9999',
    YEAR: 1000 * 60 * 60 * 24 * 30 * 12,
    MONTH: 1000 * 60 * 60 * 24 * 30,
    WEEK: 1000 * 60 * 60 * 24 * 7,
    DAY: 1000 * 60 * 60 * 24,
    HOUR: 1000 * 60 * 60,
    MINUTE: 1000 * 60,
    SECOND: 1000,
    MILLISECOND: 1,
    SIZE: {
        MB: 1048576,
        KB: 1024
    },
    RELEASED_AT: {
        LAST_HOUR: 'Last hour',
        YESTERDAY: 'Yesterday',
        LAST_WEEK: 'Last week',
        LAST_MONTH: 'Last month',
        LAST_YEAR: 'Last year',
    } as { [key: string]: ReleasedAt },
    LIMIT: {
        PRODUCT: 5,
        PRODUCT_RELATED: 6,
        PRODUCT_VIDEO: 3,
        PRODUCT_NEW: 5,
        PRODUCT_SEARCH: 5,

        VIDEO: 6,

        SUGGESTION: 10,
        ORDER: 5,
    },
    RELOAD_REASON: {
        CHANGE_STRING: 'Change string',
        INCREASE_SKIP: 'Increase skip'
    } as { [key: string]: ReloadReason },
    
    SORT_BYS: [
        'Most Popular',
        'Best Rating',
        'Newest',
        'Lowest Price',
        'Highest Price'
    ],
    SORT_BY: {
        MOST_POPULAR: 'Most Popular',
        BEST_RATING: 'Best Rating',
        NEWEST: 'Newest',
        LOWEST_PRICE:'Lowest Price',
        HIGHEST_PRICE: 'Highest Price'
    },
    DURATION: {
        DBCLICK: 200,
        HIDE_CONTROL: 2500
    }
}

export default VARS;