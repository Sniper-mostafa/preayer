import Divider from "@mui/material/Divider";
import Cards from "./Cards";
import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import moment from "moment";
import "moment/dist/locale/ar-dz";
moment.locale("ar_dz");
import Clock from "./Clock";
import Form from "react-bootstrap/Form";

const MainContent = () => {
  const [city, setCity] = useState({
    countryName: "SA",
    apiName: "Makkah al Mukarramah",
    cityName: "مكة المكرمة",
  });
  const availableCity = [
    {
      countryName: "SA",
      apiName: "Mecca",
      cityName: "مكة المكرمة",
    },
    {
      countryName: "SA",
      apiName: "Medina",
      cityName: "المدينة",
    },
    {
      countryName: "EG",
      apiName: "Cairo",
      cityName: "القاهرة",
    },
  ];
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);

  const [timings, setTimings] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });
  const [time, setTime] = useState("");
  const [remainingTime, setRemainingTime] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const prayerName = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  useEffect(() => {
    const countTimer = () => {
      const momentNow = moment();
      let PrayerIndex = 0;

      if (
        momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
        momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
      ) {
        PrayerIndex = 1;
      } else if (
        momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
        momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
      ) {
        PrayerIndex = 2;
      } else if (
        momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
        momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
      ) {
        PrayerIndex = 3;
      } else if (
        momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
        momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
      ) {
        console.log("next prayer is Isha");
      } else {
        PrayerIndex = 0;
      }
      setNextPrayerIndex(PrayerIndex);

      const nextPrayerObject = prayerName[PrayerIndex];
      const nextPrayerTime = timings[nextPrayerObject.key];

      let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

      if (remainingTime < 0) {
        const midNightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
        const fajrToMidnightDiff = moment(nextPrayerTime, "hh:mm").diff(
          moment("00:00:00", "hh:mm:ss")
        );
        const totalDiff = midNightDiff + fajrToMidnightDiff;
        remainingTime = totalDiff;
      }

      const momentDuration = moment.duration(remainingTime);

      setRemainingTime(
        `${momentDuration.seconds()} : ${momentDuration.minutes()} : ${momentDuration.hours()}`
      );
    };
    const timeNow = moment().format("dddd D MMMM Y");
    setTime(timeNow);
    let interval = setInterval(() => {
      countTimer();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [prayerName, timings]);
  const handleChange = (event) => {
    const cityObject = availableCity.find((city) => {
      return city.apiName == event.target.value;
    });
    setCity(cityObject);
  };

  useEffect(() => {
    const getTimings = async () => {
      const date = moment().format("Do-MM-YYYY");
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity/${date}?city=${city.apiName}&country=${city.countryName}`
      );
      setTimings(response.data.data.timings);
    };
    getTimings();
  }, [city]);
  return (
    <>
      <Grid container sx={{ marginTop: "50px" }}>
        <Grid item xs={12} md={6} sx={{ marginBottom: "1.6rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>{city.cityName}</h1>
            <h2>{time}</h2>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>باقي علي صلاة {prayerName[nextPrayerIndex].displayName}</h1>
            <h2>{remainingTime}</h2>
          </div>
        </Grid>
      </Grid>
     
      <Clock />
      <div className="d-flex justify-content-center" style={{marginTop: "50px"}}>
        <Form.Select aria-label="Default select example" onChange={handleChange} style={{cursor: "pointer", width: "300px"}}>
          {availableCity.map((city) => {
            return (
              <option key={city} value={city.apiName}>
                {city.cityName}
              </option>
            );
          })}
        </Form.Select>
      </div>
      <Divider variant="middle" sx={{ opacity: "0.2", margin: "50px 0" }} />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          gridTemplateColumns: {
            xs: "repeat(1, 350px)",
            sm: "repeat(1, 350px)",
            md: "repeat(1, 350px)",
            lg: "repeat(2, 350px)",
            xl: "repeat(3, 350px)",
          },
        }}
      >
        <Cards name="الفجر" time={timings.Fajr} img="./image/fajr-prayer.png" />
        <Cards
          name="الظهر"
          time={timings.Dhuhr}
          img="./image/dhhr-prayer-mosque.png"
        />
        <Cards
          name="العصر"
          time={timings.Asr}
          img="./image/asr-prayer-mosque.png"
        />
        <Cards
          name="المغرب"
          time={timings.Maghrib}
          img="./image/sunset-prayer-mosque.png"
        />
        <Cards
          name="العشاء"
          time={timings.Isha}
          img="./image/night-prayer-mosque.png"
        />
      </Grid>
    </>
  );
};

export default MainContent;
