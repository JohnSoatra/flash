'use client';
import OrderTracking from "@/components/OrderTracking";
import { OrderX } from "@/gateway-types/typings";

const Index = ({ orders }: { orders: OrderX[] }) => {
    return (
        <div>
            {
                orders.map((order, index) =>
                    <div key={index}>
                        <OrderTracking order={order} />
                    </div>
                )
            }
        </div>
    );
}

export default Index;