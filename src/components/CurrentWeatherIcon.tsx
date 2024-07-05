import sunny from "../assets/day_clear.png";
import cloudy from '../assets/cloudy_day.png';
import tstorm from '../assets/tstorm_day.png';
import rain from '../assets/rain_day.png';

type CurrentWeatherIconProps = {
    keyword: string
}

const CurrentWeatherIcon = ({ keyword }: CurrentWeatherIconProps) => {
    const getIcon = () => {
        switch (keyword.toLowerCase()) {
            case "sunny":
            case "mostly sunny":
            case "fair":
            case "clear":
                return sunny;
                break;
            case "cloudy":
            case "partly cloudy":
            case "mostly cloudy":
                return cloudy;
                break;
            case "thunderstorms":
                return tstorm;
                break;
            case "scattered showers":
            case "rain":
            case "showers":
                return rain;
        }
    }

    return (
        <img className="mx-auto" src={getIcon()} />
    )
}

export default CurrentWeatherIcon;