import axios from "./axios";

export async function getForecast() {
    const { data } = await axios.get("/getForecast");
    console.log("data in actions", data);
    return {
        type: "WEATHER_DATA",
        forecast: data
    };
}
