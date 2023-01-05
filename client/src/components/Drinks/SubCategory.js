// base
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

// material ui
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  item: {
    cursor: 'pointer',
    margin: '10px 0',
    display: 'flex',
    width: '100%',
    gap: 12,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 24,
  },
  ingredients: {
    overflowX: 'auto',
    gap: 8,
    display: 'flex',
    width: '100%'
  },
  ingredient: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  info: {
    overflowX: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  ingredientName: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    lineHeight: '23px',
    fontWeight: 700
  },
  price: {
    margin: '4px 0 10px',
    fontFamily: 'Yeseva One',
    fontSize: 20,
    lineHeight: '23px',
    color: 'rgba(148, 148, 148, 1)'
  }
}))

const SubCategory = ({ item = {} }) => {
  const { name = {}, priceUnit = {}, volumeUnit = {}, prices, ingredients, imageUrl } = item
  const classes = useStyles()

  return (
    <div className={classes.item}>
      <div>
        <img
          src={imageUrl}
          alt={name.eng}
          className={classes.img}
        />
      </div>
      <div className={classes.info}>
        <Typography className={classes.ingredientName}>{name.ua}</Typography>
        <Typography className={classes.price}>
          {_.get(prices, '[0].volume', '-')}{volumeUnit.eng}/
          {_.get(prices, '[0].price', '-')}{priceUnit.eng}
        </Typography>
        <div className={classes.ingredients}>
          {ingredients.map((ingredient = {}) => {
            const { name = {}, available, subId, imageUrl } = ingredient

            if (!available) return false
            return (
              <div key={subId}>
                <img
                  alt={name.eng}
                  src={imageUrl}
                  className={classes.ingredient}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

SubCategory.propTypes = {
  item: PropTypes.object.isRequired
}

export default SubCategory
