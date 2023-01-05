// base
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getConfig } from '../../config'
import _ from 'lodash'

// material ui
import { makeStyles } from '@material-ui/core/styles'
import Category from './Category'

const useStyles = makeStyles(() => ({
  root: {
    boxSizing: 'border-box',
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  flexContainer: {
    display: 'flex',
    width: '100%'
  },
}))

const { apiHost } = getConfig()

const Drinks = () => {
  const classes = useStyles()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`${apiHost}/api/v1/drinks`)
      .then((res = {}) =>  setCategories(_.get(res, 'data.groups[0].groups', {})))
      .catch(e => console.log(e))
  }, [])

  return (
    <div className={classes.root}>
      {categories.map((item = {}) => {
        if (!item.available) return false
        return (
          <div key={item.subId} className={classes.flexContainer}>
            <Category
              item={item}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Drinks
