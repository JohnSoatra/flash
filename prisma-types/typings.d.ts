import { Brand, Card, Category, Collection, Image, Model, Order, Payment, Poster, Product, ProductOrder, Shipping, User, Video } from "./index";
import { JwtPayload } from "jsonwebtoken";

// XType
// -> Product
type ProductX = Product & {
    images: Image[],
    videos: VideoX[],
    loved?: boolean
}

type ProductOrderX = ProductOrder & {
    product: ProductX
}
  
type OrderX = Order & {
    product_orders: ProductOrderX[],
    payment: Payment,
    shipping: Shipping
}

// -> Video
type VideoX = Video & {
    poster: Poster|null
}

// -> Card
type CardX = Card & {
    products: ProductX[]
}

// CType
// -> User
type UserC = {
    id: string,
    username: string,
    email: string,
    
    fullname: string,
    phone_number: string,
    address: string,

    image_url: string|null,
    image_color: string,
}

// -> Creditcard
type CreditCardC = {
    type: number;
    last_four: string;
}

// Response
type ResponseMessage = {
    status?: number,
    reason?: string,
}

type ResponseResult<T=any> = { data: T } & ResponseMessage;

// JWT
type AccessArgs = {
    userId: string,
    visitorId: string,
    browserId: string
}

type RefreshArgs = {
    userId: string,
    visitorId: string,
    browserId: string
}

type AccessContent = JwtPayload & {
    [P in keyof AccessArgs]: AccessArgs[P]
}

type RefreshContent = JwtPayload & {
    [P in keyof RefreshArgs]
}


// Router
// -> Auth
type SigninRouter = boolean;
type SignoutRouter = boolean;
type SignupRouter = { message: FieldMessage }|boolean;
type RefreshRouter = boolean;

// -> Brand
type GetallBrandsRouter = Brand[];

// -> Card
type GetoneCardRouter = CardX|null;

// -> Category
type GetallCategoriesRouter = Category[];

// -> Collection
type GetallCollectionsRouter = Collection[];

// -> Cookie
type DeleteCookieRouter = boolean;
type GetCookieRouter = string|null;
type SetCookieRouter = boolean;

// -> Creditcard
type GetoneCreditcardRouter = CreditCardC|null;

// -> Email
type SendEmailVerifyEmailRouter = { message: FieldMessage }|boolean;
type SendEmailVerifyRequestRouter = { message: FieldMessage }|boolean;
type VerifyTokenEmailRouter = string|false;
type VerifyTokenRequestRouter = string|false;

// -> Love
type ToggleLoveRouter = boolean|null;

// -> Model
type GetallModelsRouter = Model[];

// -> Order
type GetManyOrdersRouter = OrderX[];
type CreateOneOrderRouter = boolean;

// -> Product
type GetOneProductRouter = ProductX|null;
type GetmanyProductNamesRouter = Suggestion[];

type GetmanyNewProductsRouter = ProductX[];
type GetmanyNewProductsAllCountRouter = number;

type GetmanyPopularProductsRouter = ProductX[];
type GetmanyPopularProductsAllCountRouter = number;

type GetmanyRelatedProductsRouter = ProductX[];

type GetmanySearchProductsRouter = ProductX[];
type GetmanySearchProductsAllCountRouter = number;

type GetmanyToprateProductsRouter = ProductX[];
type GetmanyToprateProductsAllCountRouter = number;

// -> User
type UpdateoneBillingRouter = boolean;
type UpdateoneContactRouter = { message: FieldMessage }|boolean;
type UpdateoneGeneralRouter = { message: FieldMessage }|boolean;
type UpdateoneSecurity = boolean;
type GetoneUserRouter = UserC|null;
type ResetPasswordRouter = boolean;

// -> CSRF
type GetCsrfRouter = string;

// General
type ReleasedAt =
    'Last hour'|
    'Yesterday'|
    'Last week'|
    'Last month'|
    'Last year';

type FieldMessage = {
    field?: string,
    content: string
}

type Suggestion = {
    title: string,
    searched?: boolean
}

type FetchResult = {
    data?: string,
    reason?: string
}

type ProductOrders = {
    product_id: string,
    quantity: number,
    price: number,
}[];

type PhoneNumbers = string[];


// Cookie
type CookieName = 'access-token'|'refresh-token'|'csrf-token';

// Email
type Email = 'email'|'request'