import { useEffect, useState } from "react";
import { WeatherState } from "@/recoilAtom/WeatherState";
import { useRecoilState } from "recoil";

export default function MainWeather() {
  const API_KEY = "fa3eba61f243af3e8e69086462763172";
  const kakao_API_KEY = "3a6c3035c801405eaa71ebb9dc7f474b";
  // const [usetemp, setTemp] = useState<string | undefined>();
  // const [max, setMax] = useState<string | undefined>();
  // const [min, setMin] = useState<string | undefined>();
  // const [weat, setWeat] = useState<string | undefined>();
  const [weather, setWeather] = useRecoilState(WeatherState);
  const [address, setAddress] = useState<string | undefined>();

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
        // console.log("위도", latitude);
        const longitude = position.coords.longitude;
        // console.log("경도", longitude);

        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
        );
        const weatherData = await weatherResponse.json();
        // setTemp(weatherData.main.temp.toFixed(1));
        // setMax(weatherData.main.temp_max.toFixed(1));
        // setMin(weatherData.main.temp_min.toFixed(1));
        // setWeat(weatherData.weather[0].main);
        setWeather({
          ...weather,
          weat: weatherData.weather[0].main,
          max: weatherData.main.temp_max.toFixed(1),
          min: weatherData.main.temp_min.toFixed(1),
          usetemp: weatherData.main.temp.toFixed(1),
        });

        console.log("데이터", weatherData);
        // console.log(`온도 : ${temp} ,최고온도 ${max},최저온도 ${min}, 날씨 : ${weat}`);

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

        // console.log(address);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };

    getLocation(); // getLocation 함수 실행
  }, []);

  return (
    <div>
      <div>현재 온도: {weather.usetemp}</div>
      <div>
        최고 온도: {weather.max} / 최저 온도: {weather.min}
      </div>
      <div>날씨: {weather.weat}</div>
    </div>
  );
}
