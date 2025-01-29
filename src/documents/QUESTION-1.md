## Document how you would explain to another developer the approach you would take to build a product search to match the criteria below

My first step is to choose the library we want to use. I approached building the product search functionality with a focus on clean, maintainable React code using TypeScript.

I suggest React, for a clean and maintainable code and TypeScript for type safety.

First we should install Vite, React, TypeScript and SASS (for styling).

I decided to use Vite because it provides extremely fast development and build times, while React’s component-based architecture is perfect for building an interactive search interface.

TypeScript adds crucial type safety, which I leveraged to create strong interfaces for the API responses and prevent potential runtimes errors.
For the:

1. Component Structure:

- Created a `ProductSearch` component that encapsulates all search functionality
- Used TypeScript interfaces (`ProductSearchResult` and `PriceDetail`)
- Implemented responsive design using SCSS for styling

2. Search Functionality:

```typescript
const [searchInput, setSearchInput] = useState("");
const [searchResults, setSearchResults] = useState<ProductSearchResult[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
```

- Managed search state using React hooks
- Implemented error handling and loading states
- Added keyboard accessibility with Enter key search trigger

3. API Integration:

```typescript
const handleSearch = async () => {
  setIsLoading(true);
  const response = await fetch(
    `https://global.atdtravel.com/api/products?geo=en&title=${encodeURIComponent(
      searchInput
    )}`
  );
  // ... error handling and state updates
};
```

- Built a fetch implementation with proper error handling
- Used URL encoding for search parameters
- Implemented loading states for better UX

4. Results Display:

```typescript
<div className="results-container" role="region" aria-live="polite">
  {searchResults?.map((product) => (
    <div className="result-card" key={product.id} role="article">
      <h2 className="product-title">{product.title}</h2>
      <img className="product-img" src={product.img_sml} alt={product.title} />
      <p className="product-dest">{product.dest}</p>
    </div>
  ))}
</div>
```

- Included all required fields (image, title, destination)
- Added proper accessibility attributes

5. Enhanced User Experience:

- Added loading indicators
- Implemented error messaging
- Included proper ARIA labels for accessibility
- Created a clean, intuitive UI with search icon and button

The implementation meets all requirements while maintaining best practices in React development, TypeScript, and web accessibility."
