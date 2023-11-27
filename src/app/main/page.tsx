"use client"
import MainWeather from "@/component/MainWeather"
import { RecoilRoot } from "recoil"

export default function Mainpage() {

    return(<>
    <RecoilRoot>
        <MainWeather />
    </RecoilRoot>
    </>)
}
