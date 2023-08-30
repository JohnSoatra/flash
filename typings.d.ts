import { User, Product, Rate, Order, CreditCard, CreditCardType , ProductOrder, Payment, Shipping, Card, Image, Video, Poster } from "@/gateway-types/index";
import VARS from "@/constants/vars";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { PhoneNumbers, ProductOrders, UserC } from "./gateway-types/typings";

// General
type UserOmit = Omit<UserC, 'image_color'|'id'>
type UpdateField = keyof UserOmit;

// Fetch Types
interface FetchOptions {
  signal: AbortSignal|null,
  onError?: (response: Response) => void,
  onData?: (response: Response) => void,
}

// -> MyFetch
interface Json {
  [key: string]: any
}

interface MyFetchPropGet {
    method: 'get',
    url: string,
    signal: AbortSignal|null,
    body?: Json,
    query?: Json,
}

interface MyFetchPropPost {
    method: 'post',
    url: string,
    signal: AbortSignal|null,
    body: Json|FormData,
    query?: Json,
}

type MyFetchProp = MyFetchPropGet|MyFetchPropPost;

interface WithQuery {
  query: Json
}

interface WithBody {
  body: Json
}

interface GetAllcount extends FetchOptions {
  query: {
    released_at?: ReleasedAt
  }
}

interface BestChoiceProducts extends FetchOptions {
  query: GetAllcount['query'] & {
    skip?: number,
    limit?: number,
  }
}

interface Fetch<T> {
  result: T|null|undefined,
  fetching: boolean
}

type Signin = FetchOptions & {
  body: {
    email: string,
    password: string
  }
}

type Signout = FetchOptions

type Signup = FetchOptions & {
  body: {
    email: string,
    email_token: string,
    password: string
  }
}

type SendEmailVerifyEmail = FetchOptions & {
  body: {
    email: string
  }
}

type VerifyTokenEmail = FetchOptions & {
  body: {
    email: string,
    token: string
  }
}

type VerifyTokenRequest = FetchOptions & {
  body: {
    email: string,
    token: string
  }
}

type SendEmailVerifyRequest = FetchOptions & {
  body: {
    email: string
  }
}

type GetOneCreditCard = FetchOptions;

type GetAllcountSearchProducts = FetchOptions & {
  query: GetAllcount['query'] & {
    string: string
  }
}

type GetManySearchProduct = FetchOptions & {
  query: GetAllcountSearchProducts['query'] & {
    skip?: number,
    limit?: number,
  }
}

type GetManyProductNames = FetchOptions & {
  query: {
    string: string,
    limit?: string,
  }
}

type GetManyNewProducts = FetchOptions & BestChoiceProducts;
type GetManyToprateProducts = FetchOptions & BestChoiceProducts;
type GetManyPopularProducts = FetchOptions & BestChoiceProducts;
type GetManyLoveProducts = FetchOptions & BestChoiceProducts;

type GetManyRelatedProducts = FetchOptions & {
  query: {
    product_id: string,
    limit?: string
  }
}

type GetOneProduct = FetchOptions & {
  query: {
    id: string
  }
}

type GetOneCsrf = FetchOptions;

type GetAllcountNewProducts = FetchOptions & GetAllcount;
type GetAllcountPopularProducts = FetchOptions & GetAllcount;
type GetAllcountToprateProducts = FetchOptions & GetAllcount;
type GetAllcountLoveProducts = FetchOptions;

type GetAllBrands = FetchOptions;
type GetAllCategories = FetchOptions;
type GetAllCollections = FetchOptions;
type GetAllModels = FetchOptions;

type GetOneCard = FetchOptions;
type GetManyCards = FetchOptions;

type AddProductToCard = FetchOptions & {
  body: {
    product_id: string
  }
};

type RemoveProductFromCard = FetchOptions & {
  body: {
    product_id: string
  }
};

type RemoveAllProductsFromCard = FetchOptions & {
  body: {
    product_id: string
  }
};

type GetOneUser = FetchOptions;

type GetManyOrders = FetchOptions & {
  query: {
    limit?: number,
    sort_by?: string,
    order_by?: string,
  }
}

type ToggleLove = FetchOptions & {
  body: {
    product_id: string,
    prev_loved?: boolean
  }
}

type CreateOneOrder = FetchOptions & {
  body: {
    product_orders: ProductOrders,
    receiver_fullname: string,
    receiver_address: string,
    receiver_phone_numbers: PhoneNumbers
  }
}

type ResetPassword = FetchOptions & {
  body: {
    email: string,
    email_token: string,
    new_password: string
  }
};

type VerifyPassword = FetchOptions & {
  body: {
    password: string
  }
};

type UpdateBilling = FetchOptions & {
  body: {
    password: string,
    card_number: string,
    expired_month: string,
    expired_year: string,
    cvc: string,
  }
}

type UpdateGeneral = FetchOptions & {
  body: {
    image_url?: string,
    username?: string,
    fullname?: string,
    address?: string,
  }
}

type UpdateContact = FetchOptions & {
  body : {
    password: string,
    phone_number?: string,
    email?: string,
    email_token?: string
  }
}

type UpdateSecurity = FetchOptions & {
  body: {
    old_password: string,
    new_password: string,
  }
}

type UpdateImage = FetchOptions & {
  body: FormData
}

type GetCookie = FetchOptions & {
  query: {
    name: string,
  }
}

type SetCookie = FetchOptions & {
  body: {
    name: string,
    value: string
  }
}


type DeleteCookie = FetchOptions & {
  body: {
    name: string
  }
}

// -------------------
type ArgsWithContent<T extends (WithQuery | WithBody)> = T & FetchOptions;
type ArgsNoContent = FetchOptions;

type PropUseFetch<T, K extends (WithQuery | WithBody)> = {
  func: (args: ArgsWithContent<K>) => Promise<T|null>,
  args: Omit<ArgsWithContent<K>, 'signal'>
}

type PropUseFetchNoArgs<T> = {
  func: (args: ArgsNoContent) => Promise<T|null>,
  args?: Omit<ArgsNoContent, 'signal'>
}

type UseFetch<T> = Fetch<T>;

type UseFetchLazy<T, K extends (WithQuery | WithBody)> = Fetch<T> & {
  refetch: (args?: Partial<K>) => void
}

type ReloadReason = 'Change string'|'Increase skip';
type ReleasedAt = 'Last hour'|'Yesterday'|'Last week'|'Last month'|'Last year';

//----------------

type BannerType = 'image'|'video';

type SortBy = 'Most Popular'|'Best Rating'|'Newest'|'Lowest Price'|'Highest Price';

type CardType = 'electron'|'maestro'|'dankort'|'interpayment'|'unionpay'|'visa'|'mastercard'|'amex'|'diners'|'discover'|'jcb';

type Suggestion = {
  title: string,
  searched?: boolean
}

type PriceRange = {
  lowest?: number,
  highest?: number
}

type UserResult = {
  error?: {
      field: string,
      message: string
  },
  user?: User
}

type CreditCardResult = {
  error?: {
      field: string,
      message: string
  },
  creditCard?: CreditCard
}

type UserInput = {
  username: string,
  password: string
}

type EmailResult = {
  error?: {
    field: string,
    message: string
  },
  emailInfo?: SentMessageInfo
}

type VideoX = Video & {
  poster: Poster|null
}

type ProductX = Product & {
  images: Image[],
  videos: VideoX[],
  loved?: boolean
}

type PaymentX = Payment & {
  card_type: CreditCardType
}

type ProductOrderX = ProductOrder & {
  product: ProductX
}

type OrderX = Order & {
  product_orders: ProductOrderX[],
  payment: PaymentX|null,
  shipping: Shipping|null
}
