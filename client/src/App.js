// base
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// material ui
import { makeStyles } from '@material-ui/core/styles'

// components
import DrinksPage from './pages/DrinksPage'
import FoodPage from './pages/FoodPage'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    maxWidth: 768,
    overflow: 'auto',
  }
}))

function App() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/drinks">
          <DrinksPage/>
        </Route>
        <Route path={["/", "/food"]}>
          <FoodPage/>
        </Route>
      </Switch>
    </div>
  )
}

export default App
