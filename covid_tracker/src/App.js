import React from "react"
import "./App.css"
import { MenuItem, FormControl, Select } from "@material-ui/core"

function App() {
  return (
    <div className="app">
      <h1>COVID-19 TRACKER</h1>
      <div className="app__header">
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default App
