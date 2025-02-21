import { useParams } from 'react-router-dom'; // Import useParams hook

const ProductDetails = () => {
  const { id } = useParams(); // Get the 'id' from the URL

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
      {/* Your product details content */}
    </div>
  );
};

export default ProductDetails;