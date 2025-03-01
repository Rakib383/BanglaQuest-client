import { useEffect, useState } from "react"
import { Banner } from "../Components/Banner"
import { Info } from "../Components/Info"
import { NewsLetter } from "../Components/NewsLetter"
import { Overview } from "../Components/Overview"
import { Stories } from "../Components/Stories"
import { Tourism } from "../Components/Tourism"
import offers from "../assets/Images/offers2.png"
import { Link } from "react-router-dom"
import Reviews from "../Components/Reviews"

export const HomePage = () => {
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        const hasSeenOffer = sessionStorage.getItem("hasSeenOffer");
        if(!hasSeenOffer) {
            setShowPopup(true);
            sessionStorage.setItem("hasSeenOffer","true")
        }
    },[])
    return (
        <div>
            {
                showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-SecondaryColor rounded-lg  shadow-lg text-center relative  w-4/5 max-w-md ">
                            {/* Close Button */}
                            <button
                                className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-black rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => setShowPopup(false)}
                            >
                                ✖
                            </button>

                            {/* Popup Content */}
                            <img
                                src={offers}
                                alt="Discount Offer"
                                className="w-full rounded-md "
                            />
                            <h2 className="text-xl font-bold text-PrimaryColor">Limited Time Offer!</h2>
                            <p className="text-white mt-2">Get Up to <span className="font-bold text-lg"> 30% OFF</span> on your first booking.</p>
                            <Link to="/hot-offers">
                                <button className=" bg-PrimaryColor my-2 mb-4 hover:bg-yellow-500  text-white font-semibold py-2 px-4 rounded">
                                    Grab the Deal
                                </button></Link>
                        </div>
                    </div>)
            }
            <Banner />
            <Overview />
            <Tourism />
            <Info />
            <Stories />
            <Reviews/>
            <NewsLetter />

        </div>
    )
}
