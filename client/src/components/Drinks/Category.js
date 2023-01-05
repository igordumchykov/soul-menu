// base
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// material ui
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// components
import SubCategory from './SubCategory'
import SelectedDrinkModal from '../Modals/SelectedDrinkModal'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 48,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 32,
    fontWeight: 700,
    lineHeight: '36.8px',
    marginBottom: 30
  },
  flexContainer: {
    display: 'flex',
    width: '100%'
  }
}))

const Category = ({ item = {} }) => {
  const { name = {}, items: subCategories} = item
  const classes = useStyles()
  const [activeItem, setActiveItem] = useState({})

  const handleClose = () => setActiveItem({})

  const handleClick = (id) => () => {
    setActiveItem(subCategories.find(item => item.subId === id))
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{name.ua}</Typography>
      {subCategories.map((item = {}) => {
        if (!item.available) return false
        return (
          <div onClick={handleClick(item.subId)} key={item.subId} className={classes.flexContainer}>
            <SubCategory
              item={item}
            />
          </div>
        )
      })}
      <SelectedDrinkModal activeItem={activeItem} handleClose={handleClose}/>
    </div>
  )
}

Category.propTypes = {
  item: PropTypes.object.isRequired,
}

export default Category