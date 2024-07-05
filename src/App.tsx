import { useState, useEffect } from "react";
import axios from 'axios';
import CurrentWeatherIcon from "./components/CurrentWeatherIcon";

function App() {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState({
    method: 'GET',
    url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    params: {
      location: 'sunnyvale',
      format: 'json',
      u: 'f'
    },
    headers: {
      'x-rapidapi-key': 'c5f1566899msh5194a192ad9f744p1e8ddajsn14ab6b59159e',
      'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
    }
  })
  const [currentConditions, setCurrentConditions] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    setOptions(prevOptions => ({
      ...prevOptions,
      params: {
        ...prevOptions.params,
        location: search
      }
    }))
  }, [search]);

  const handleSearch = async () => {
    try {
      const response = await axios.request(options);
      const current = response.data.current_observation;
      const fc = response.data.forecasts;
      setCurrentConditions(current);
      setForecast(fc);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="background flex flex-col h-screen w-screen justify-center">
      <h1 className="text-xl font-semibold text-center py-2">weather app</h1>
      <div className="text-center p-3 w-1/2 mx-auto">
        <div className="flex justify-center gap-2">
          <input type='text' className="bg-white rounded-md text-center border border-black" placeholder="City, State" onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" className="bg-neutral-300 border border-black p-2 rounded-md" onClick={handleSearch}>Search</button>
        </div>
        <CurrentWeatherIcon keyword={currentConditions?.condition.text || "sunny"} />
        <p>{currentConditions?.condition.text}</p>
        {/* <p>{forecast?.[0].day}</p> */}
      </div>
    </div>
  )
}

export default App
