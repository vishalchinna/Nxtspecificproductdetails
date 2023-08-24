import './index.css'

const SimilarProductItem = prop => {
  const {productDetails} = prop
  const {imageUrl, price, rating, title, brand} = productDetails
  return (
    <li className="similar-card">
      <img src={imageUrl} alt="similar product" className="similar-img" />
      <h2 className="s-title">{title}</h2>
      <p className="s-brand">by {brand}</p>
      <div className="price-rating">
        <p className="s-price">RS {price}/-</p>
        <div className="rating-container-s">
          <p className="rating s">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="s-star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
