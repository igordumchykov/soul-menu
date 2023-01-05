// base
import React, {useEffect, useState} from 'react'
import _ from 'lodash'
import { Link } from 'react-scroll'
import axios from 'axios'
import { getConfig } from '../../config'

// material ui
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// components
import Category from './Category'

const useStyles = makeStyles(() => ({
  root: {
    boxSizing: 'border-box',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  flexContainer: {
    display: 'flex',
    width: '100%'
  },
  tagsList: {
    marginTop: 45,
    display: 'flex',
    width: '100%',
    overflow: 'auto',
    height: 50,
    gap: 8
  },
  tag: {
    fontFamily: 'Helvetica',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    height: 40,
    lineHeight: '16px',
    fontWeight: 700,
    fontSize: 14,
    color: '#000000',
    borderRadius: 24,
    whiteSpace: 'nowrap',
    backgroundColor: '#FFFFFF'
  }
}))

const { apiHost } = getConfig()

const Food = () => {
  const classes = useStyles()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`${apiHost}/api/v1/food`)
      .then((res = {}) =>  setCategories(_.get(res, 'data.groups', [])))
      .catch(e => console.log(e))
  }, [])

  return (
    <div className={classes.root}>
      <div className={classes.tagsList}>
        {categories.map((item = {}) => {
          const { name = {}, subId } = item
          return (
            <Link key={subId} to={`category-${subId}`} duration={500} smooth={true}>
              <Typography className={classes.tag}>
                {`${name.ua} / ${name.eng}`}
              </Typography>
            </Link>
          )
        })}
      </div>
      <div>
        {categories.map((item = {}) => {
          const { available, subId} = item

          if (!available) return false
          return (
            <div id={`category-${subId}`} key={subId} className={classes.flexContainer}>
              <Category item={item}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Food
