const ROUTE = {
    PRODUCT: (id: string) => `/product?id=${id}`,
    HOME: '/',
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    VERIFY: '/verify',
    RESET_PASS: '/reset',
    SEARCH: (search: string) => `/search?string=${search}`,
    CHECKOUT: '/checkout',
    SHIPPING: '/shipping',
    ACCOUNT: '/account',
    LOVE: '/love',
    PRODUCT_NEW: '/product/new',
    PRODUCT_TOPRATE: '/product/toprate',
    PRODUCT_POPULAR: '/product/popular',
}

export default ROUTE;