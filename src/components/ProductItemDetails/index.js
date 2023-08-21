import {Component} from 'react'

class ProductItemDetails extends Component {
  componentDidMount() {
    this.ProductItemDetails()
  }

  ProductItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`http://localhost:3000/products/${id}`)
    const details = await response.json()
    console.log(response)
  }

  render() {
    return (
      <div className="">
        <h1>hello</h1>
      </div>
    )
  }
}

export default ProductItemDetails
