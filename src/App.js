
import "./App.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import axios from "axios";

import { useEffect, useState } from "react";
import moment from "moment"
import "moment/min/locales"
import { useTranslation } from 'react-i18next';
moment.locale("ar");







const theme = createTheme({
  typography: {
    fontFamily: ["IBM"]
  }
})

let cancelToken = null
function App() {
  const { t, i18n } = useTranslation();
  console.log("mounting")
  const [temp, setTemp] = useState({
    number: null,
    min: null,
    max: null,
    description: "",
    icon: null

  })
  const [locale, setLocale] = useState("ar")
  const direction = locale == "ar" ? "rtl" : "ltr"



  function cancelAxios() {
    if (cancelToken) {
      cancelToken();
      console.log("request canceled");
    }
  }

  const [dayAndTime, setDayAndTime] = useState("")
  function handleLanguageClick() {
    if (locale == "en") {
      setLocale("ar")
      i18n.changeLanguage("ar");
      moment.locale("ar");

    }
    else {
      setLocale("en")
      i18n.changeLanguage("en");
      moment.locale("en");


    }
    setDayAndTime(moment().format('MMMM Do YYYY, h:mm a'))

  }



  useEffect(() => {
    i18n.changeLanguage("ar");
  }, [])


  useEffect(() => {
    setDayAndTime(moment().format('MMMM Do YYYY, h:mm a'))
    // const axios = require('axios');

    // Make a request for a user with a given ID
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=24.46&lon=39.60&appid=568ed8891b7fdad746303ada339f876c',
      {
        cancelToken: new axios.CancelToken((c) => {
          cancelToken = c;
        })
      }
    )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 272.15)
        const min = Math.round(response.data.main.temp_min - 272.15)
        const max = Math.round(response.data.main.temp_max - 272.15)
        const description = response.data.weather[0].description
        const icon = response.data.weather[0].icon


        console.log(temp)
        setTemp({
          number: responseTemp,
          min, max, description, icon: `https://openweathermap.org/img/wn/${icon}@2x.png`
        })


      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    return () => {
      console.log("canceling");
      cancelAxios();
    }
  }, [])

  return (
    <div className="App"
      style={{
        padding: "25px",
        minHeight: "100vh",
        overflowY: "auto",
        display: "flex",
        justifyContent: "center", alignItems: "center",
        background: "#fce4ec",
        direction: direction
      }}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" >
          {/* CONTENT CONTINER */}
          <div style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",

          }}>
            {/* CARD */}
            <div
              style={{
                //   direction: { locale == "ar" ? "rtl" : "ltr"
                // },
                width: "100%",
                color: "white",
                backgroundColor: "#880e4f",
                borderRadius: "10px",
                padding: "10px"
              }}>
              {/* CONTENT */}
              <div style={{}}>

                {/* CITY & TIME */}
                <div style={{ display: "flex", alignItems: "end", direction: direction }}
                >
                  <Typography variant="h2" style={{ marginRight: "10px" }} >
                    {t("Riyadh")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "10px" }}>
                    {dayAndTime}
                  </Typography>

                </div>
                <hr />
                {/* DEGREE & DESCRIPTION */}
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  {/* TEMP */}
                  <div style={{ textAlign: "right" }}>
                    <Typography variant="h1" >
                      {temp.number}
                    </Typography>
                    {/* TODO: TEMP IMAGE */}
                    {/* <img src={temp.icon} /> */}
                    <Typography variant="h5" style={{ textAlign: "right" }}>
                      {t(temp.description)}

                    </Typography>

                    {/* MIN & MAX */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h3> {t("min")}: {temp.min}</h3>
                      <h3 style={{ margin: "0px 5px" }}> | </h3>

                      <h3> {t("max")}: {temp.max}</h3>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <img style={{
                      width: 151,
                      height: 151,
                    }} src={temp.icon} />
                  </div>

                </div>
              </div>
            </div>

            {/* TRANSALATION CONTEINER */}
            <div

              style={{
                direction: direction,
                display: "flex",
                justifyContent: "end",
                width: "100%"
              }}>
              <Button style=
                {{ color: "gray" }}
                variant="text"
                onClick={handleLanguageClick}>
                {locale == "en" ? "Arabic" : "انجليزي"}
              </Button>

            </div>
            {/*=== TRANSALATION CONTEINER ===*/}


          </div>

        </Container>
      </ThemeProvider>

    </div >



  )

}
export default App;