"use client"
import Menubar from "@/component/MenuBar"
import WeatherBar from "@/component/WeatherBar"

export default function Feed(){
    


    return(<>
        <div className="container">
            <div id="search"></div>
            <WeatherBar />
            <div id="category"></div>
            <div id="feed_img">

            </div>

        </div>
    </>)
}