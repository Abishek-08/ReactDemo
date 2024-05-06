import { cleanup, render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import BloodDnrInsert from "./BloodDnrInsert";
import BloodDnr from "./BloodDnr";

afterEach(cleanup);

describe("Test suite for Donor-Page", () => {
  test("Testing the DonorInsertPage", () => {
    render(<BloodDnrInsert />);

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("btngoback")).toBeEnabled();
    expect(screen.getByTestId("btninsert")).toBeEnabled();
  });

  test("Test the Donor Input box in the Insert-Page", () => {
    render(<BloodDnrInsert />);

    expect(screen.getByPlaceholderText("Donor Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Donor Age")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Weight")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mobile")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Location")).toBeInTheDocument();
  });

  test("Test the Donor detail Table is displayed or not", () => {
    render(<BloodDnr />);
    expect(screen.getByTestId("donorTable")).toBeInTheDocument();
  });
});
