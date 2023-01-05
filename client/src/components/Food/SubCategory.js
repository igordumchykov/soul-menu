// base
import React from 'react'
import PropTypes from 'prop-types'

// material ui
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
  item: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  itemTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    width: '85%'
  },
  itemIngredients: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 400,
  },
  itemMain: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    lineHeight: '23px',
    fontWeight: 700,
  },
  itemVolume: {
    fontFamily: 'Helvetica',
    marginTop: 4,
    fontSize: 10,
    lineHeight: '11.5px',
    fontWeight: 400
  },
  priceItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  flexContainer: {
    marginLeft: 10,
    display: 'flex',
    gap: 15
  }
}))

const SubCategory = ({ item = {} }) => {
  const { name = {}, prices = [], ingredients, volumeUnit = {} } = item
  const classes = useStyles()

  return (
    <div key={item.id} className={classes.item}>
      <div className={classes.itemTextContainer}>
        <Typography className={classes.itemMain}>
          {name.ua}
        </Typography>
        <Typography className={classes.itemIngredients}>
          {name.eng}
        </Typography>
        <Typography className={classes.itemIngredients}>
          {ingredients.map((i) => i?.name?.ua).filter((i) => i !== null && i !== undefined).join(', ')}
        </Typography>
      </div>
      <div className={classes.flexContainer}>
        {prices.map((variant) => {
          const { subId, price, volume } = variant
          return (
            <div key={subId} className={classes.priceItem}>
              <Typography className={classes.itemMain}>
                {price}
              </Typography>
              <Typography className={classes.itemVolume}>
                {volume === 0 ? '-- ' : volume}{volume === 0 ? '' : volumeUnit.eng}
              </Typography>
            </div>
          )
        })}
      </div>
    </div>
  )
}

SubCategory.propTypes = {
  item: PropTypes.object.isRequired
}

export default SubCategory
