import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useContext, useEffect, useState } from "react"
import { useAxiosSecure } from "../hooks/useAxiosSecure"
import { AuthContext } from "../provider/AuthProvider"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

export const CheckoutForm = () => {

    const [transactionId, setTransactionId] = useState("")
    const [clientSecret, setClientSecret] = useState("")
    const [error, setError] = useState()
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext);
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: bookingItem, refetch, isLoading } = useQuery({
        queryKey: ['bookingItem'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allBookings/${id}`)
            return res.data
        }
    })


    useEffect(() => {
        if (bookingItem) {
            axiosSecure.post('/create-payment-intent', { price: bookingItem.price })
                .then(res => {
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, bookingItem])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })
        if (error) {
            console.log('payment method error', error)
            setError(error.message)
        }
        else {
            // console.log('payment method', paymentMethod)
            setError("")
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error')
        }
        else {
            // console.log('payment intent', paymentIntent)
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id)
                const paymentInfo = {
                    transactionId: paymentIntent.id,
                    status: "Success",
                    bookingId: bookingItem._id,
                    amount: bookingItem.price,
                    timestamp: new Date().toISOString(),
                    userEmail: bookingItem.email
                }

                Swal.fire({
                    title: "Payment Successful!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                })

                const res = await axiosSecure.patch(`/bookings/${id}`, { status: "In Review" })
                const result = await axiosSecure.post('/payments', paymentInfo)
                refetch()

                navigate("/dashboard/bookings")

            }
        }
    }

    const isDarkMode = document.documentElement.classList.contains("dark");


    return (
        <form onSubmit={handleSubmit} className={`${isDarkMode ? "bg-black/70" : ""} mt-5 mx-5  border border-[#e0e0e0] rounded-md p-3`}>
            <CardElement options={{
                style: {
                    base: {
                        fontSize: '16px',
                        color: isDarkMode ? '#ffffff' : '#424770',
                        '::placeholder': {
                            color: isDarkMode ? '#cccccc' : '#aab7c4',
                        },
                        iconColor: isDarkMode ? '#ffffff' : '#000'

                    },
                    invalid: {
                        color: '#9e2146',

                    },
                },
            }} />
            <button className="btn btn-md  bg-SecondaryColor/80 hover:bg-SecondaryColor text-white my-2 mt-5" type="submit" disabled={!stripe || !clientSecret}>Pay</button>
            <p className="text-red-500">
                {
                    error
                }
            </p>


        </form>
    )
}
