import { cleanup, render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import BloodStk from "./BloodStk";
import BloodStkInsert from "./BloodStkInsert";

describe("Test suite for the Blood Stock Page", () => {
  test("Test the Blood Stock Page", () => {
    render(<BloodStk />);
    expect(screen.getByTestId("btnBlood")).toBeEnabled();
    expect(screen.getByTestId("stockTable")).toBeInTheDocument();
  });

  test("Test the BloodStock InsertPage input box", () => {
    render(<BloodStkInsert />);

    expect(screen.getByPlaceholderText("Blood Group")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Blood Count")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("RBC Count")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("WBC Count")).toBeInTheDocument();
    expect(screen.getByTestId("btnInsert")).toBeEnabled();
  });
});
