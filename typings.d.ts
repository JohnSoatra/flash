import { User, Product, Rate, Order, CreditCard, CreditCardType , ProductOrder, Payment, Shipping, Card, Image, Video, Poster } from "@/prisma-types/index";
import VARS from "@/constants/vars";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";


// Fetch Types
interface FetchOptions {
  signal?: AbortSignal
}

interface FetchPost extends FetchOptions {
  csrfToken: string
}

interface GetAllcount {
  releasedAt?: ReleasedAt
}

interface BestChoiceProducts {
  skip?: number,
  limit?: number,
  releasedAt?: ReleasedAt
}

interface Fetch<T> {
  result: T|null|undefined,
  fetching: boolean
}

type Signin = FetchOptions & {
  email: string,
  password: string
}

type Signout = FetchOptions

type Signup = FetchOptions & {
  email: string,
  password: string
}

type GetOneCreditCard = FetchOptions

type GetAllcountSearchProducts = FetchOptions & {
  string: string,
  releasedAt?: ReleasedAt
}

type GetManySearchProduct = FetchOptions & {
  string: string,
  skip?: number,
  limit?: number,
  releasedAt?: ReleasedAt
}

type GetManyProductNames = FetchOptions & {
  string: string,
  limit?: string,
}

type GetManyNewProducts = FetchOptions & BestChoiceProducts;
type GetManyToprateProducts = FetchOptions & BestChoiceProducts;
type GetManyPopularProducts = FetchOptions & BestChoiceProducts;

type GetManyRelatedProducts = FetchOptions & {
  productId: string,
  limit?: string
}

type GetOneProduct = FetchOptions & {
  id: string
}

type GetOneCsrf = FetchOptions;

type GetAllcountNewProducts = FetchOptions & GetAllcount
type GetAllcountPopularProducts = FetchOptions & GetAllcount
type GetAllcountToprateProducts = FetchOptions & GetAllcount

type GetAllBrands = FetchOptions
type GetAllCategories = FetchOptions
type GetAllModels = FetchOptions

type GetOneCard = FetchOptions;

type GetOneUser = FetchOptions;

type GetManyOrders = FetchOptions & {
  limit?: number,
  sortBy?: string,
  orderBy?: string,
}

type PostOneResetCode = FetchOptions & {
  email: string,
  code: string,
  csrfToken: string
}
type PostOneUser = FetchOptions & {
  username: string,
  email: string,
  password: string,
  csrfToken: string,
}
type PostOneVerifyToken = FetchOptions & {
  email: string,
  csrfToken: string
}

type ToggleLove = FetchOptions & {
  productId: string,
  prevFavorited?: boolean
}


interface CreditCardInfo {
  cardNumber: string;
  expiredMonth: string;
  expiredYear: string;
  cvc: string;
}

type CreateBilling = FetchOptions & {
  password: string
} & {
  [P in keyof CreditCardInfo]: CreditCardInfo[P]
}

type UpdateBilling = FetchOptions & {
  password: string
} & {
  [P in keyof CreditCardInfo]?: CreditCardInfo[P]
}

type UpdateGeneral = FetchPost & {
  imageUrl: string?;
  username: string?;
  fullname: string?,
  address: string?
}

type UpdateContact = FetchOptions & {
  password: string?,
  
}

type GetCookie = FetchOptions & {
  name: string,
}

type SetCookie = FetchOptions & {
  name: string,
  value: string
}


type DeleteCookie = FetchOptions & {
  name: string
}


// -------------------
type PropUseFetch<Type=any, KType=any> = {
  func: (args: KType & FetchOptions) => Promise<Type|null>,
  args: KType & FetchOptions
}

type PropUseFetchNoArgs<Type=any> = {
  func: () => Promise<Type|null>,
  args?: any
}

type UseFetch<T> = Fetch<T>;
type UseFetchLazy<T, K> = Fetch<T> & {
  refetch: (args?: Partial<K & FetchOptions>) => void
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
  favorited?: boolean
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

type CardX = Card & {
  products: ProductX[]
}

type ImageProp = {
  title: string,
  description: string,
  urls: StaticImageData|string
}

type Many = {
  allCount: number
}

// Crypto
// type Encrypt = 'raw'|'hash'
// type SecretField =
//   'user.username'|
//   'user.email'|
//   'user.password'|
//   'user.fullname'|
//   'user.phone_number'|
//   'user.address'|

//   'creditcard.number'|
//   'creditcard.last_four'|
//   'creditcard.cvc'