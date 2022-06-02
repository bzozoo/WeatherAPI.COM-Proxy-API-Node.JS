const fetch = require("node-fetch");
const API_ENDPOINT =
  "https://api.weatherapi.com/v1/current.json?key=" +
  process.env.API_KEY +
  "&q=Budapest&aqi=no";
const allowedHost = "https://cdpn.io";
const http = require("http");
http.createServer(proxy).listen(8080, async () => {
  console.clear();
  console.log("Server started...");
});

async function proxy(req, res) {
  res.setHeader("Access-Control-Allow-Origin", allowedHost);
  res.setHeader("Content-Type", "application/json");
  View(res);
}

async function View(res) {
  try {
    const data = await getWeather();
    res.write(
      JSON.stringify({
        error: false,
        cityname: data.location.name,
        temperature: {
          celsius: data.current.temp_c,
          updatetime: data.current.last_updated
        },
        weathericon: data.current.condition.icon,
        currenttime: data.location.localtime
      })
    );
  } catch (e) {
    res.write(
      JSON.stringify({
        error: true
      })
    );
  }
  res.end();
}

async function getWeather() {
  const response = await fetch(API_ENDPOINT);
  const data = response.json();
  return data;
}
