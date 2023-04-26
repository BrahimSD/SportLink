//give me test for myhome page

import { render, screen, fireEvent } from "@testing-library/react";
import { DataContext } from "../../dataContext";
import {MyHome} from "../src/onglets/myHomeComps/MyHome";

// Mock the data context
const mockContext = {
  currentUser: { email: "test@test.com" },
  getUserTable: jest.fn(),
  rooms: [
    {
      id: "1",
      Title: "Test Room 1",
      Organiser: "test@test.com",
    },
    {
      id: "2",
      Title: "Test Room 2",
      Organiser: "other@test.com",
    },
  ],
  setRooms: jest.fn(),
  getRooms: jest.fn(),
  deleteOuPas: jest.fn(),
  droom: null,
};

describe("MyHome", () => {
  beforeEach(() => {
    render(
      <DataContext.Provider value={mockContext}>
        <MyHome />
      </DataContext.Provider>
    );
  });

  it("renders the search bar", () => {
    const searchInput = screen.getByPlaceholderText("Rechercher un salon");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders the 'Trouvez tous vos Salons!' title", () => {
    const title = screen.getByText("Trouvez tous vos Salons!");
    expect(title).toBeInTheDocument();
  });

  it("renders the rooms joined by the user", () => {
    const room1 = screen.getByText("Test Room 1");
    const room2 = screen.queryByText("Test Room 2");
    expect(room1).toBeInTheDocument();
    expect(room2).not.toBeInTheDocument();
  });

  it("renders the rooms created by the user", () => {
    const room1 = screen.getByText("Test Room 1");
    const room2 = screen.queryByText("Test Room 2");
    expect(room1).toBeInTheDocument();
    expect(room2).not.toBeInTheDocument();
  });

  it("filters the rooms by title when searching", () => {
    const searchInput = screen.getByPlaceholderText("Rechercher un salon");
    fireEvent.change(searchInput, { target: { value: "Test Room 1" } });
    const room1 = screen.getByText("Test Room 1");
    const room2 = screen.queryByText("Test Room 2");
    expect(room1).toBeInTheDocument();
    expect(room2).not.toBeInTheDocument();
  });
});
