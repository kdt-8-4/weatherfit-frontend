import { useEffect, useState } from "react";
import { WeatherState } from "@/recoilAtom/WeatherState";
import { useRecoilState } from "recoil";
import Image from "next/image";

export default function MainWeather() {
  const API_KEY = "fa3eba61f243af3e8e69086462763172";
  const kakao_API_KEY = "3a6c3035c801405eaa71ebb9dc7f474b";
  const [weather, setWeather] = useRecoilState(WeatherState);
  const [address, setAddress] = useState<string | undefined>();
  const [icon, setIcon] = useState<string | undefined>();

  const weatherValue = {
    Clear: "맑음",
    Rain: "비",
    Thunderstorm: "뇌우",
    Snow: "눈",
    Mist: "옅은 안개",
    Drizzle: "이슬비",
    Clouds: "흐림",
    Fog: "안개",
    Haze: "실안개",
  };

  const weatherIcon = {
    Clear: "clear.jpg",
    Rain: "rain.jpg",
    Thunderstorm: "thunderstorm.jpg",
    Snow: "snow.jpg",
    Mist: "mist.jpg",
    Drizzle: "rain.jpg",
    Clouds: "clouds.jpg",
    Fog: "mist.jpg",
    Haze: "mist.jpg",
  };

  useEffect(() => {
    // 위치 정보를 비동기적으로 가져오는 함수
    const getLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          },
        );

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
        );
        const weatherData = await weatherResponse.json();
        setIcon(weatherData.weather[0].icon);
        setWeather({
          ...weather,
          weat: weatherData.weather[0].main,
          max: weatherData.main.temp_max.toFixed(1),
          min: weatherData.main.temp_min.toFixed(1),
          usetemp: weatherData.main.temp.toFixed(1),
        });

        console.log("데이터", weatherData);

        const addressResponse = await fetch(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
          {
            method: "GET",
            headers: { Authorization: `KakaoAK ${kakao_API_KEY}` },
          },
        );
        const addressData = await addressResponse.json();
        setAddress(
          addressData.documents[0].address.region_1depth_name +
            " " +
            addressData.documents[0].address.region_2depth_name,
        );
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    getLocation(); // getLocation 함수 실행
  }, []);

  console.log("날씨 아이콘: ", weather.weat);

  return (
    <section className="mainweather">
      <div className="weather_box">
        {weather.weat && (
          <Image
            src={`/images/${weatherIcon[weather.weat]}`}
            alt={weather.weat}
            width={500}
            height={300}
          />
        )}
        <div className="weather_info">
          <div className="weather_now">
            <p className="weather_value">
              {weather.weat && weatherValue[weather.weat]}
            </p>
            <p className="weather_temp">{weather.usetemp}</p>
          </div>
          <p className="weather_max_min_temp">
            최고: {weather.max} / 최저: {weather.min}
          </p>
        </div>
      </div>
    </section>
  );
}
