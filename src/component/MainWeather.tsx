import { useEffect, useState } from "react";
import { WeatherState } from "@/recoilAtom/WeatherState";
import { useRecoilState } from "recoil";

export default function MainWeather() {
  const API_KEY = "fa3eba61f243af3e8e69086462763172";
  const kakao_API_KEY = "3a6c3035c801405eaa71ebb9dc7f474b";
  const [weather, setWeather] = useRecoilState(WeatherState);
  const [address, setAddress] = useState<string | undefined>();
  const [icon, setIcon] = useState<string | undefined>();

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


  return (
    <section className="">
      <div>현재 온도: {weather.usetemp}</div>
      <div>
        최고 온도: {weather.max} / 최저 온도: {weather.min}
      </div>
      <div>날씨: {weather.weat}</div>
    </section>
  );
}
