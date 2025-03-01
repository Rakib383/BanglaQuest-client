import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { CheckoutForm } from "./CheckoutForm"


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
export const Payment = () => {

    return (
        <div className="max-w-md mx-auto">
            <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements>
        </div>
    )
}
