// base
import React, { useRef } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

// material ui
import { makeStyles } from '@material-ui/core/styles'
import { Carousel } from 'react-responsive-carousel'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: 216
  }
}))

const list = [
  'https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-03/plant-based-food-mc-220323-02-273c7b.jpg',
  'https://images.everydayhealth.com/images/diet-nutrition/34da4c4e-82c3-47d7-953d-121945eada1e00-giveitup-unhealthyfood.jpg?sfvrsn=a31d8d32_0',
  'https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000',
  'https://www.eatthis.com/wp-content/uploads/sites/4/2019/06/deep-dish-pizza-chicago.jpg'
]

const CarouselComponent = () => {
  const classes = useStyles()
  const ref = useRef({})

  const carouselProps = {
    axis: 'horizontal',
    swipeable: true,
    showThumbs: false,
    // autoPlay: true,
    infiniteLoop: true,
    showArrows: false,
    showStatus: false,
    interval: 4000
    // onChange: onChange,
    // onClickItem: onClickItem,
    // onClickThumb: onClickThumb
  }

  return (
    <div className={classes.root}>
      <Carousel {...carouselProps}>
        {list.map((item, index) => (
          <div ref={ref} key={index}>
            <img style={{ height: 300, borderRadius: 16 }} src={item} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselComponent
