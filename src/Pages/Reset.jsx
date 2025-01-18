
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../provider/AuthProvider"

export const Reset = () => {
    const { resetPassword } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleResetPassword = (e) => {
        e.preventDefault()
        const email = e.target.email.value

        resetPassword(email)
            .then(() => {
                navigate("/")
                window.open("https://mail.google.com","_blank")
            })
            .catch((error) => {
                console.log(error)

            });
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen">

            <h2 className="text-4xl  text-PrimaryColor  w-64 text-center italic font-bold mb-2">Don't worry</h2>
            <h4 className="text-2xl font-bold text-ThirdColor mb-8 w-64 text-center">Reset your password</h4>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                <form onSubmit={handleResetPassword} className="card-body pb-0">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email"  type="email" placeholder="your Email" className="input input-bordered" required />
                    </div>

                    <div className="form-control mt-2 pb-6">
                        <button className="btn bg-SecondaryColor text-white hover:text-black hover:outline outline-4 ">Reset Password</button>

                    </div>
                </form>

            </div>

        </div>
    )
}
