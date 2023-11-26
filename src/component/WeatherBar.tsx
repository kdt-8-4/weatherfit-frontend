import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Image from "next/image";
import "../style/weatherBar.scss";
import React from "react";

import { TemMaxControl } from "@/recoilAtom/TemMax";
import { TemMinControl } from "@/recoilAtom/TemMin";
import { TemNowControl } from "@/recoilAtom/TemNow";
import { WeatherIcons } from "@/recoilAtom/WeatherIcon";



const WeatherBar:React.FC = () => {
  const API_KEY = "fa3eba61f243af3e8e69086462763172";
  const kakao_API_KEY = "3a6c3035c801405eaa71ebb9dc7f474b";
  let temp: string;
  const [usetemp, setTemp] = useRecoilState(TemNowControl);
  
  const [max, setMax] = useRecoilState(TemMaxControl);
  const [min, setMin] = useRecoilState(TemMinControl);
  const [weat, setWeat] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();

  //openweathermap에서 제공하는 icon
  const [icon, setIcon] = useRecoilState(WeatherIcons);

  useEffect(() => {
    // 위치 정보를 비동기적으로 가져오는 함수
    const getLocation = async () => {
        try {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            }
          );

          const latitude = position.coords.latitude;
          console.log("위도", latitude);
          const longitude = position.coords.longitude;
          console.log("경도", longitude);  

          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const weatherData = await weatherResponse.json();
          temp = weatherData.main.temp.toFixed(1);
          setTemp(temp);
          // max = weatherData.main.temp_max.toFixed(1);
          setMax(weatherData.main.temp_max.toFixed(1));
          setMin(weatherData.main.temp_min.toFixed(1));
          setWeat(weatherData.weather[0].main);
          setIcon(weatherData.weather[0].icon);

          console.log("데이터", weatherData)
          // console.log(`온도 : ${temp} ,최고온도 ${max},최저온도 ${min}, 날씨 : ${weat}`);

          const addressResponse = await fetch(
            `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
            {
              method: "GET",
              headers: { Authorization: `KakaoAK ${kakao_API_KEY}` },
            }
          );
          const addressData = await addressResponse.json();
          setAddress(
            addressData.documents[0].address.region_1depth_name +
            " " +
            addressData.documents[0].address.region_2depth_name
          );

          // console.log(address);
        } catch (error) {
          console.error("Error getting location:", error);
        }
      };

      getLocation(); // getLocation 함수 실행


    }, []);
    
    console.log("온도 아톰에 다 잘 들어갔는지 확인 현재, 최고, 최저", usetemp, max, min);


  
  return (
    <div id="container_w">
      <div id="weather">
        <Image
          src="/images/partly-cloudy-day.svg"
          alt="partly-cloudy-day"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
        <span> {usetemp}℃</span>
      </div>
      <div id="maxmin">
        <span>최고 {max}℃&nbsp;</span>
        &nbsp;
        <span>최저 {min}℃</span>
      </div>
    </div>
  );
}

export default WeatherBar;
