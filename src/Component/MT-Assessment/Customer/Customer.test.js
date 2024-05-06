import { cleanup, render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import Cust from "./Cust";

describe("Test suite for the Customer Page", () => {
  test("Test the BloodGroup combo box is displayed", () => {
    render(<Cust />);

    expect(screen.getByTestId("bldgrpBox")).toBeInTheDocument();
  });

  test("Test the BloodGroup Table is displayed or Not", () => {
    render(<Cust />);

    expect(screen.getByTestId("bldTable")).toBeInTheDocument();
  });

  test("search button for the Donor Details is working or not", () => {
    render(<Cust />);

    expect(screen.getByTestId("btnSearch")).toBeInTheDocument();
    expect(screen.getByTestId("btnSearch")).toBeEnabled();
  });
});
