// base
import React from 'react'
import PropTypes from 'prop-types'

// material ui
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

// components
import SubCategory from './SubCategory'

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px 0 12px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  img: {
    height: 100,
    width: '100%',
    borderRadius: 16,
    display: 'flex',
    objectFit: 'cover',
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 32,
    lineHeight: '36.8px',
    fontWeight: 700,
    marginBottom: 4
  },
  description: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    lineHeight: '23px',
    fontWeight: 400,
    marginBottom: 32
  },
  flexContainer: {
    display: 'flex',
    width: '100%'
  }
}))

const Category = ({ item = {} }) => {
  const { name = {}, items: subCategories = [], imageUrl } = item
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{name.ua}</Typography>
      <Typography className={classes.description}>{name.eng}</Typography>
      {imageUrl && (<img src={imageUrl} className={classes.img} alt={name.eng}/>)}
      {subCategories.map((subCategory = {}) => {
        const { available, subId } = subCategory
        if (!available) return false
        return (
          <div key={subId} className={classes.flexContainer}>
            <SubCategory item={subCategory}/>
          </div>
        )
      })}
    </div>
  )
}

Category.propTypes = {
  item: PropTypes.object.isRequired
}

export default Category
