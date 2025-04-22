import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "@/components/SearchInput";
import { useSearchStore } from "@/store/searchStore";
import { MemoryRouter } from "react-router-dom";

jest.mock("lodash.debounce", () => (fn) => {
  fn.cancel = jest.fn();
  return fn;
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("@/store/searchStore", () => {
  return {
    useSearchStore: jest.fn(),
  };
});

jest.mock("@/api/useSearchTicker", () => () => ({
  searchResult: [],
}));

describe("SearchInput", () => {
  const setQuery = jest.fn();
  const clearQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSearchStore.mockImplementation((selector) =>
      selector({
        query: "AAPL",
        setQuery,
        clearQuery,
        searchedList: [],
      })
    );
  });

  it("renders input with initial value", () => {
    render(<SearchInput />, { wrapper: MemoryRouter });

    const input = screen.getByPlaceholderText("Search stocks...");
    expect(input.value).toBe("AAPL");
  });

  it("updates input value and triggers navigate on change", () => {
    render(<SearchInput />, { wrapper: MemoryRouter });

    const input = screen.getByPlaceholderText("Search stocks...");
    fireEvent.change(input, { target: { value: "MSFT" } });

    expect(mockNavigate).toHaveBeenCalledWith("/explore");
  });

  it("shows clear icon when query exists", () => {
    render(<SearchInput />, { wrapper: MemoryRouter });

    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); // X icon
  });

  it("clears query when clear icon is clicked", () => {
    render(<SearchInput />, { wrapper: MemoryRouter });

    const clearIcon = screen.getByRole("img", { hidden: true });
    fireEvent.click(clearIcon);

    expect(setQuery).toHaveBeenCalledWith("");
  });
});
