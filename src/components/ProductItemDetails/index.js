import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    mainProduct: [],
    similarProducts: [],
    count: 1,
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.ProductItemDetails()
  }

  ProductItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const details = await response.json()
    if (response.ok === true) {
      const main = {
        id: details.id,
        availability: details.availability,
        brand: details.brand,
        description: details.description,
        imageUrl: details.image_url,
        price: details.price,
        rating: details.rating,
        title: details.title,
      }
      const similar = details.similar_products.map(each => ({
        imageUrl: each.image_url,
        title: each.title,
        price: each.price,
        rating: each.rating,
        id: each.id,
        brand: each.brand,
      }))
      this.setState({
        mainProduct: main,
        similarProducts: similar,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onIncrement = () => {
    this.setState(prev => ({count: prev.count + 1}))
  }

  onDecrement = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prev => ({count: prev.count - 1}))
    }
  }

  renderBackProduct = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderSuccessView = () => {
    const {mainProduct, similarProducts, count} = this.state
    const {
      imageUrl,
      availability,
      brand,
      description,
      price,
      rating,
      title,
    } = mainProduct
    return (
      <div className="product-details-container">
        <div className="product-details-box">
          <img src={imageUrl} alt="product" className="product-details-img" />
          <div className="product-details-info">
            <h1 className="title">{title}</h1>
            <p className="price">RS {price}/-</p>
            <div className="rating-container">
              <p className="rating">{rating}</p>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
            </div>
            <p className="desc">{description}</p>
            <p className="ava">Available: {availability} </p>
            <p className="ava">Brand : {brand}</p>
            <hr />
            <div className="cart-count">
              <button
                type="button"
                data-testid="minus"
                onClick={this.onDecrement}
                className="sign"
              >
                <BsDashSquare />
              </button>
              <p>{count}</p>
              <button
                type="button"
                data-testid="plus"
                onClick={this.onIncrement}
                className="sign"
              >
                <BsPlusSquare />
              </button>
            </div>
            <button type="button" className="add-cart">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar-product-box">
          <h1 className="titleName">similar product</h1>
          <ul className="ul-list">
            {similarProducts.map(each => (
              <SimilarProductItem key={each.id} productDetails={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="product-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1>Product Not Found</h1>
      <button type="button" className="btn" onClick={this.renderBackProduct}>
        Continue shopping
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllProductsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderAllProductsView()}
      </div>
    )
  }
}

export default ProductItemDetails
