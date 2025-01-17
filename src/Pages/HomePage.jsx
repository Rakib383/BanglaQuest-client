import { Banner } from "../Components/Banner"
import { Info } from "../Components/Info"
import { NewsLetter } from "../Components/NewsLetter"
import { Overview } from "../Components/Overview"
import { Stories } from "../Components/Stories"
import { Tourism } from "../Components/Tourism"

export const HomePage = () => {
    return (
        < >
            <Banner />
            <Overview />
            <Tourism />
            <Info />
            <Stories />
            <NewsLetter />

        </>
    )
}
