import React, { useState, useEffect } from "react"
import "./App.css"
import {
  MenuItem,
  FormControl,
  Select,
  CardContent,
  Card,
} from "@material-ui/core"
import InfoBox from "./InfoBox"
import Map from "./Map"
import Table from "./Table"
import LineGraph from "./LineGraph"
import { sortData } from "./util"

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])

  // if the useeffect input is [] -- then it will run once when the app component loads
  useEffect(() => {
    const getCountiresData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          //get values from the api
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
          // set it to local variable
          const sortedData = sortData(data)
          setCountries(countries)
          setTableData(sortedData)
        })
    }
    //Call the function in useEffect
    getCountiresData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url).then((response) =>
      response.json().then((data) => {
        //Change value of the dropdown
        setCountry(countryCode)
        // All the data about the country
        setCountryInfo(data)
      })
    )
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.todayRecovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  )
}

export default App
