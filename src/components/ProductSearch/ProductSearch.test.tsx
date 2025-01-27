import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";
import ProductSearch from "./ProductSearch";

const mockProductData = {
  data: [
    {
      id: "213492",
      title: "London Explorer Pass",
      updated: "2024-11-06 15:10:24",
      dest: "London",
      price_from_adult: "69.00",
      price_from_child: "54.00",
      rrp_adult: "0.00",
      rrp_child: "0.00",
      price_from_all: [
        {
          desc: "Adult",
          price_from: "69.00",
          rrp: "0.00",
          type_description: "Choose 2",
        },
        {
          desc: "Child",
          price_from: "54.00",
          rrp: "0.00",
          type_description: "Choose 2 Attractions 5-15 yrs",
        },
      ],
      seasons: "",
      img_sml:
        "https://global.atdtravel.com/sites/default/files/imagecache/atd_list_thumb/ticket_description/_london_explorer_pass/lonexp.jpg",
    },
  ],
};

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockProductData),
  })
);

describe("<ProductSearch />", () => {
  it("renders Product Search component", () => {
    render(<ProductSearch />);
    const headingElement = screen.getByText(/Product Search/i);
    expect(headingElement).toBeInTheDocument();
  });

  it("searches for products", async () => {
    render(<ProductSearch />);
    const searchInput = screen.getByPlaceholderText(/Search for products/i);
    const searchButton = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(searchInput, {
      target: { value: "London Explorer Pass" },
    });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const productTitle = screen.getByText(/London Explorer Pass/i);
      expect(productTitle).toBeInTheDocument();
    });
  });
});
