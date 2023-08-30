import { Brand, Card, Category, Collection, Image, Model, Order, Payment, Poster, Product, ProductOrder, Shipping, User, Video } from "./index";

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
    product: ProductX
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
    type: number
}

// -> Creditcard
type CreditCardC = {
    type: number;
    last_four: string;
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
type GetmanyCardsRouter = CardX[];
type AddProductToCardRouter = CardX|string|null;
type RemoveProductFromCardRouter = boolean;
type RemoveAllProductsFromCardRouter = boolean;

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
type ToggleLoveRouter = boolean;

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

type GetmanyLoveProductsRouter = ProductX[];
type GetmanyLoveProductsAllCountRouter = number;

// -> User
type UpdateoneBillingRouter = boolean;
type UpdateoneContactRouter = { message: FieldMessage }|boolean;
type UpdateoneGeneralRouter = { message: FieldMessage }|boolean;
type UpdateoneSecurity = boolean;
type GetoneUserRouter = UserC|null;
type ResetPasswordRouter = boolean;
type VerifyPasswordRouter = boolean;
type UploadImageRouter = boolean;

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

type ProductOrders = {
    product_id: string,
    quantity: number,
    price: number,
}[];

type PhoneNumbers = string[];