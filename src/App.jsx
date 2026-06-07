import Prayer from "./Components/prayer"
import { useEffect, useState } from "react"
import axios from "axios"
function App() {

  const [prayers, setPrayers] = useState({})
  const [date, setDate] = useState("")
  const [city, setCity] = useState("cairo")
  const [nextPrayer, setNextPrayer] = useState(null)
  const [remainingTime, setRemainingTime] = useState("")
  const [activeTab, setActiveTab] = useState("prayers")
  const [weatherData, setWeatherData] = useState(null)
  const [prayersLoading, setPrayersLoading] = useState(false)
  const [weatherLoading, setWeatherLoading] = useState(false)

  const cities = [    
    { name: "القاهرة", value: "cairo", lat: 30.0444, lon: 31.2357 },
    { name: "الإسكندرية", value: "alexandria", lat: 31.2001, lon: 29.9187 },
    { name: "الجيزة", value: "giza", lat: 30.0131, lon: 31.2089 },
    { name: "الغربية", value: "gharbia", lat: 30.7865, lon: 31.0004 },
    { name: "الدقهلية", value: "dakahlia", lat: 31.0409, lon: 31.3785 },
    { name: "الشرقية", value: "sharqia", lat: 30.5877, lon: 31.5016 },
    { name: "المنوفية", value: "monufia", lat: 30.5610, lon: 31.0085 },
    { name: "القليوبية", value: "qalyubia", lat: 30.4591, lon: 31.1856 },
    { name: "البحيرة", value: "beheira", lat: 31.0364, lon: 30.4688 },
    { name: "كفر الشيخ", value: "kafr_el_sheikh", lat: 31.1107, lon: 30.9388 },
    { name: "دمياط", value: "damietta", lat: 31.4175, lon: 31.8144 },
    { name: "بورسعيد", value: "port_said", lat: 31.2653, lon: 32.3019 },
    { name: "الإسماعيلية", value: "ismailia", lat: 30.6043, lon: 32.2723 },
    { name: "السويس", value: "suez", lat: 29.9668, lon: 32.5498 },
    { name: "الفيوم", value: "fayoum", lat: 29.3084, lon: 30.8428 },
    { name: "بني سويف", value: "beni_suef", lat: 29.0744, lon: 31.0978 },
    { name: "المنيا", value: "minya", lat: 28.0871, lon: 30.7618 },
    { name: "أسيوط", value: "asyut", lat: 27.1810, lon: 31.1837 },
    { name: "سوهاج", value: "sohag", lat: 26.5570, lon: 31.6948 },
    { name: "قنا", value: "qena", lat: 26.1551, lon: 32.7160 },
    { name: "الأقصر", value: "luxor", lat: 25.6872, lon: 32.6396 },
    { name: "أسوان", value: "aswan", lat: 24.0889, lon: 32.8998 },
    { name: "البحر الأحمر", value: "red_sea", lat: 27.2579, lon: 33.8116 },
    { name: "الوادي الجديد", value: "new_valley", lat: 25.4390, lon: 30.5486 },
    { name: "مطروح", value: "matrouh", lat: 31.3543, lon: 27.2373 },
    { name: "شمال سيناء", value: "north_sinai", lat: 31.1321, lon: 33.8032 },
    { name: "جنوب سيناء", value: "south_sinai", lat: 28.2382, lon: 33.6212 },
  ]

  const getWeatherDescription = (code) => {
    switch (code) {
      case 0: return { desc: "صافي", icon: "☀️" }
      case 1:
      case 2:
      case 3: return { desc: "غائم جزئياً", icon: "🌤️" }
      case 45:
      case 48: return { desc: "ضباب", icon: "🌫️" }
      case 51:
      case 53:
      case 55: return { desc: "رذاذ خفيف", icon: "🌧️" }
      case 61:
      case 63:
      case 65: return { desc: "أمطار", icon: "🌧️" }
      case 71:
      case 73:
      case 75: return { desc: "ثلوج", icon: "❄️" }
      case 80:
      case 81:
      case 82: return { desc: "زخات مطرية", icon: "🌦️" }
      case 95:
      case 96:
      case 99: return { desc: "عاصفة رعدية", icon: "⛈️" }
      default: return { desc: "غير معروف", icon: "☁️" }
    }
  }

  useEffect(() => {
    const prayersApi = async () => {
      try {
        setPrayersLoading(true)
        const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt`)
        const data_of_api = response.data
        
        setTimeout(() => {
          setPrayers(data_of_api.data.timings)
          const timestamp = data_of_api.data.date.timestamp
          const formattedDate = new Date(timestamp * 1000).toLocaleDateString('ar-EG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
          setDate(formattedDate)
          setPrayersLoading(false)
        }, 400)
      } catch (error) {
        console.log(error)
        setPrayersLoading(false)
      }
    }
    prayersApi()
  }, [city])

  useEffect(() => {
    const fetchWeather = async () => {
      const selectedCityObj = cities.find(c => c.value === city)
      if (!selectedCityObj) return
      
      try {
        setWeatherLoading(true)
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedCityObj.lat}&longitude=${selectedCityObj.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        )
        const current = response.data.current
        const descAndIcon = getWeatherDescription(current.weather_code)
        
        setTimeout(() => {
          setWeatherData({
            temp: current.temperature_2m,
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            desc: descAndIcon.desc,
            icon: descAndIcon.icon
          })
          setWeatherLoading(false)
        }, 400)
      } catch (error) {
        console.log("Error fetching weather:", error)
        setWeatherLoading(false)
      }
    }
    
    if (activeTab === "weather") {
      fetchWeather()
    }
  }, [city, activeTab])

  useEffect(() => {
    if (!prayers || Object.keys(prayers).length === 0) return

    const updateCountdown = () => {
      const now = new Date()
      
      const list = [
        { key: "Fajr", name: "صلاة الفجر", time: prayers.Fajr },
        { key: "Dhuhr", name: "صلاة الظهر", time: prayers.Dhuhr },
        { key: "Asr", name: "صلاة العصر", time: prayers.Asr },
        { key: "Maghrib", name: "صلاة المغرب", time: prayers.Maghrib },
        { key: "Isha", name: "صلاة العشاء", time: prayers.Isha }
      ]

      const parseTime = (timeStr, isTomorrow = false) => {
        const [hours, minutes] = timeStr.split(":").map(Number)
        const dateObj = new Date()
        dateObj.setHours(hours, minutes, 0, 0)
        if (isTomorrow) {
          dateObj.setDate(dateObj.getDate() + 1)
        }
        return dateObj
      }

      const prayerDates = list.map(item => ({
        ...item,
        dateObj: parseTime(item.time)
      }))

      let target = prayerDates.find(item => item.dateObj > now)

      if (!target) {
        target = {
          ...list[0],
          dateObj: parseTime(list[0].time, true)
        }
      }

      const diff = target.dateObj - now
      const hours = String(Math.floor(diff / 3600000)).padStart(2, "0")
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0")
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0")

      setNextPrayer(target)
      setRemainingTime(`${hours}:${minutes}:${seconds}`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [prayers])

  return (
    <div className="app_wrapper">
      <nav className="navbar">
        <button className={activeTab === "prayers" ? "active" : ""} onClick={() => setActiveTab("prayers")}>
          مواقيت الصلاة
        </button>
        <button className={activeTab === "weather" ? "active" : ""} onClick={() => setActiveTab("weather")}>
          الطقس
        </button>
      </nav>

      <section>
        {activeTab === "prayers" ? (
          <>
            <div className={`container ${prayersLoading ? 'loading_active' : ''}`}>
              <div className="top_section">
                <div className="city">
                  <h3>المدينه</h3>
                  <select value={city} onChange={(e) => setCity(e.target.value)}>
                    {cities.map((city_obj) => (
                      <option key={city_obj.value} value={city_obj.value}>{city_obj.name}</option>
                    ))}
                  </select>
                </div>
                <div className="date">
                  <h3>التاريخ</h3>
                  <h4> {date}</h4>
                </div>
              </div>

              <Prayer name="صلاة الفجر:" time={prayers.Fajr} />
              <Prayer name="صلاة الظهر:" time={prayers.Dhuhr} />
              <Prayer name="صلاة العصر:" time={prayers.Asr} />
              <Prayer name="صلاة المغرب:" time={prayers.Maghrib} />
              <Prayer name="صلاة العشاء:" time={prayers.Isha} />
            </div>

            {nextPrayer && (
              <div className={`countdown_container ${prayersLoading ? 'loading_active' : ''}`}>
                <h2>المتبقي على صلاة</h2>
                <div className="prayer_name">{nextPrayer.name}</div>
                <div className="timer">{remainingTime}</div>
              </div>
            )}
          </>
        ) : (
          <div className="weather_container">
            <div className="top_section">
              <div className="city">
                <h3>المدينه</h3>
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  {cities.map((city_obj) => (
                    <option key={city_obj.value} value={city_obj.value}>{city_obj.name}</option>
                  ))}
                </select>
              </div>
              <div className="date">
                <h3>التاريخ</h3>
                <h4> {date}</h4>
              </div>
            </div>

            {weatherLoading && !weatherData ? (
              <div className="weather_info skeleton">
                <div className="weather_icon skeleton_circle"></div>
                <div className="weather_temp skeleton_text skeleton_temp"></div>
                <div className="weather_status skeleton_text skeleton_status"></div>
                
                <div className="weather_details skeleton_details">
                  <div className="detail_item">
                    <span className="skeleton_text skeleton_label"></span>
                    <span className="skeleton_text skeleton_val"></span>
                  </div>
                  <div className="detail_item">
                    <span className="skeleton_text skeleton_label"></span>
                    <span className="skeleton_text skeleton_val"></span>
                  </div>
                </div>
              </div>
            ) : weatherData ? (
              <div className={`weather_info ${weatherLoading ? 'loading_active' : ''}`}>
                <div className="weather_icon">{weatherData.icon}</div>
                <div className="weather_temp">{weatherData.temp}°م</div>
                <div className="weather_status">{weatherData.desc}</div>
                
                <div className="weather_details">
                  <div className="detail_item">
                    <span className="label">الرطوبة</span>
                    <span className="val">{weatherData.humidity}%</span>
                  </div>
                  <div className="detail_item">
                    <span className="label">الرياح</span>
                    <span className="val">{weatherData.windSpeed} كم/س</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="weather_info skeleton">
                <div className="weather_icon skeleton_circle"></div>
                <div className="weather_temp skeleton_text skeleton_temp"></div>
                <div className="weather_status skeleton_text skeleton_status"></div>
                
                <div className="weather_details skeleton_details">
                  <div className="detail_item">
                    <span className="skeleton_text skeleton_label"></span>
                    <span className="skeleton_text skeleton_val"></span>
                  </div>
                  <div className="detail_item">
                    <span className="skeleton_text skeleton_label"></span>
                    <span className="skeleton_text skeleton_val"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default App
