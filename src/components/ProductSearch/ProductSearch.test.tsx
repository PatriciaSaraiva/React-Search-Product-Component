import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { it, describe, expect, vi, beforeEach } from "vitest";
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

describe("<ProductSearch />", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProductData),
      })
    );
  });

  it("renders Product Search component", () => {
    render(<ProductSearch />);

    expect(
      screen.getByRole("button", { name: /search button/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search for products/i)
    ).toBeInTheDocument();
  });

  it("searches and displays products", async () => {
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

  it("Loading State", () => {
    render(<ProductSearch />);

    const searchInput = screen.getByPlaceholderText(/Search for products/i);
    const searchButton = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(searchInput, {
      target: { value: "London Explorer Pass" },
    });
    fireEvent.click(searchButton);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("Does not display search results if there are not any returned from the api", async () => {
    render(<ProductSearch />);

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ err_desc: "No results found" }),
      })
    );

    const searchInput = screen.getByPlaceholderText(/Search for products/i);
    const searchButton = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(searchInput, {
      target: { value: "London Explorer Pass" },
    });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });

  it("Accessibility", async () => {
    render(<ProductSearch />);

    const searchInput = screen.getByPlaceholderText(/Search for products/i);
    const searchButton = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(searchInput, {
      target: { value: "London Explorer Pass" },
    });
    fireEvent.click(searchButton);

    expect(
      screen.getByRole("button", { name: /search button/i })
    ).toHaveAttribute("aria-label", "Search button");

    await waitFor(() => {
      expect(screen.getByRole("region")).toHaveAttribute("aria-live", "polite");
    });

    await waitFor(() => {
      expect(screen.getByRole("article")).toBeInTheDocument();
    });
  });
});
