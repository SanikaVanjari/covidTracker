import React, { useState, useEffect } from "react"
import "./App.css"
import { MenuItem, FormControl, Select } from "@material-ui/core"

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")

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
          setCountries(countries)
        })
    }
    //Call the function in useEffect
    getCountiresData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    //Change value of the dropdown
    setCountry(countryCode)
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">WorldWide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default App
