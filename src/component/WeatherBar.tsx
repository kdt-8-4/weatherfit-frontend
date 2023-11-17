import Image from "next/image"
import "../style/weatherBar.scss";

export default function WeatherBar() {
  return (
    <div id="container">
      <div id="weather">
        <Image
              src="/partly-cloudy-day.svg"
              alt="partly-cloudy-day"
              className="dark:invert"
              width={100}
              height={24}
              priority 
        />
        <span>7℃</span>
      </div>
      <div id="maxmin">
        <span>최고 10℃&nbsp;</span>
        &nbsp;
        <span>최저 0℃</span>
      </div>
    </div>
  );
}
