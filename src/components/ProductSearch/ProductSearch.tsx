import { useState } from "react";

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

  const handleSearch = async () => {
    const response = await fetch(
      `https://global.atdtravel.com/api/products?geo=en&title=${encodeURIComponent(
        searchInput
      )}`
    );

    const data = await response.json();
    setSearchResults(data.data);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h1>Product Search</h1>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for products"
        aria-label="Search for products"
      />
      <button onClick={handleSearch} aria-label="Search button">
        Search
      </button>
      <div role="region" aria-live="polite">
        {searchResults?.map((product) => (
          <div key={product.id} role="article">
            <h2>{product.title}</h2>
            <img src={product.img_sml} alt={product.title}></img>
            <p>{product.dest}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
