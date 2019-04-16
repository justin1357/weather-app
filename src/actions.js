import axios from "./axios";

export async function getForecast(val1, val2) {
    const { data } = await axios.post("/getForecast", {
        lat: val1,
        long: val2
    });
    console.log("data in actions", data);
    return {
        type: "WEATHER_DATA",
        forecast: data
    };
}
