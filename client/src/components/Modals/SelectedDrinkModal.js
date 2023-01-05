// base
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

// material ui
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    overflow: 'auto',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffffff',
    borderRadius: '40px 40px 0px 0px',
    outline: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  name: {
    padding: '0 40px',
    fontFamily: 'Helvetica',
    fontWeight: 700,
    fontSize: 42,
    lineHeight: '48.3px',
    color: 'rgba(52, 52, 52, 1)',
    marginBottom: 16,
    textAlign: 'center',
  },
  ingredient: {
    padding: '0 20px',
    fontSize: 32,
    lineHeight: '36.96px',
    fontFamily: 'Yeseva One',
    color: '#000000',
    margin: '2px 0'
  },
  preview: {
    display: 'flex',
    justifyContent: 'center',
    margin: '40px 0',
    position: 'relative',
    width: '66%',
    maxWidth: 400,
  },
  img: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  price: {
    position: 'absolute',
    right: -40,
    bottom: -15,
    width: 142,
    height: 142,
    backgroundColor: 'rgba(255, 85, 74, 1)',
    borderRadius: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  priceCost: {
    marginTop: 40,
    fontFamily: 'Yeseva One',
    fontSize: '46px',
    lineHeight: '53.13px',
    color: 'rgba(27, 25, 25, 1)'
  },
  priceValue: {
    fontSize: '20px',
    color: 'rgba(27, 25, 25, 1)',
    fontFamily: 'Yeseva One',
    lineHeight: '23.1px'
  },
  closeIcon: {
    color: '#000000',
    position: 'fixed',
    top: 24,
    right: 24,
    cursor: 'pointer'
  }
}))

const SelectedDrinkModal = ({ activeItem = {}, handleClose }) => {
  const { name = {}, ingredients = [], volumeUnit = {}, prices, imageUrl } = activeItem
  const classes = useStyles()

  return (
    <Modal
      open={!_.isEmpty(activeItem)}
      onClose={handleClose}
    >
      <div className={classes.root}>
        <div className={classes.preview}>
          <img className={classes.img} src={imageUrl} alt={name.eng}/>
          <div className={classes.price}>
            <Typography className={classes.priceCost}>
              {_.get(prices, '[0].price', '-')}
            </Typography>
            <Typography className={classes.priceValue}>
              {_.get(prices, '[0].volume', '-')}{volumeUnit.eng}
            </Typography>
          </div>
        </div>
        <Typography className={classes.name}>{name.ua}</Typography>
        {ingredients.map((ingredient = {}) => {
          if (!ingredient.available) return false
          return (
            <Typography className={classes.ingredient} key={ingredient.subId}>
              {_.get(ingredient, 'name.ua')}
            </Typography>
          )
        })}
        <CancelOutlinedIcon onClick={handleClose} className={classes.closeIcon}/>
      </div>
    </Modal>
  )
}

SelectedDrinkModal.propTypes = {
  activeItem: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default SelectedDrinkModal
