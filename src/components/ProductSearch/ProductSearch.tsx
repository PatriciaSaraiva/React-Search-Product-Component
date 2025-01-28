import { useState } from "react";
import { ImSearch } from "react-icons/im";

import "./ProductSearch.scss";

export interface PriceDetail {
  desc: string;
  price_from: string;
  rrp: string;
  type_description: string;
}

export interface ProductSearchResult {
  id: string;
  title: string;
  updated: string;
  dest: string;
  price_from_adult: string;
  price_from_child: string;
  rrp_adult: string;
  rrp_child: string;
  price_from_all: PriceDetail[];
  seasons: string;
  img_sml: string;
}

const ProductSearch: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<ProductSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://global.atdtravel.com/api/products?geo=en&title=${encodeURIComponent(
        searchInput
      )}`
    );

    const data = await response.json();

    if (data.err_desc) {
      setError(data.err_desc);
    } else {
      setError(null);
      setSearchResults(data.data);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h1 className="search-title">Product Search</h1>
      <div className="search-container">
        <div className="input-wrapper">
          <ImSearch className="search-icon" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for products"
            aria-label="Search for products"
          />
        </div>
        <button
          className="search-btn"
          onClick={handleSearch}
          aria-label="Search button"
        >
          Search
        </button>
      </div>
      {error ? <div className="error-results">{error}</div> : null}
      {isLoading ? (
        <p className="loading-spinner">Loading...</p>
      ) : (
        <div className="results-container" role="region" aria-live="polite">
          {searchResults?.map((product) => (
            <div className="result-card" key={product.id} role="article">
              <h2 className="product-title">{product.title}</h2>
              <img
                className="product-img"
                src={product.img_sml}
                alt={product.title}
              />
              <p className="product-dest">{product.dest}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
