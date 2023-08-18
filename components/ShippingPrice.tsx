import { TruckIcon } from "@heroicons/react/24/outline";

type Prop = {
    shippingPrice: number|null
}

const ShippingPrice = ({ shippingPrice }: Prop) => {
    return (
        <div className="w-fit font-semibold text-sm flex items-center justify-center space-x-2 opacity-75">
            <TruckIcon className="w-4 h-4" />
            {
                shippingPrice ?
                <p>${shippingPrice}</p> :
                <p>Free Shipping</p>
            }
        </div>
    );
}

export default ShippingPrice;