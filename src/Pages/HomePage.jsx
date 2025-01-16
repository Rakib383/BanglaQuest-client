import { Banner } from "../Components/Banner"
import { Info } from "../Components/Info"
import { NewsLetter } from "../Components/NewsLetter"
import { Overview } from "../Components/Overview"
import { Story } from "../Components/Story"
import { Tourism } from "../Components/Tourism"

export const HomePage = () => {
    return (
        < >
        <Banner/>
        <Overview/>
        <Tourism/>
        <Info/>
        <Story/>
        <NewsLetter/>
        
        </>
    )
}
