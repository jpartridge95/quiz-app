import React from "react"
import { render, screen } from "@testing-library/react"
import NavBar from "../../components/navbar/navbar"
import SignedInUser from "../../components/navbar/SignedInUser"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"

describe("Navbar Suite", () => {

    it("renders nav correctly", async () => {

        render(<NavBar />)

        expect(screen.getByText("Quizzaro")).toBeInTheDocument()
        expect(await screen.findByText("Sign in with Google")).toBeInTheDocument()
    })

    it("renders signedinuser component correctly", () => {

        render(<SignedInUser />);

        expect(screen.getByTestId("user-image")).toBeInTheDocument();
        expect(screen.getByTestId("dropdown-button")).toBeInTheDocument();

    })

    it("Clicking user dropdown prompts signOut button to appear", () => {

        render(<SignedInUser />, {wrapper: MemoryRouter});

        userEvent.click(screen.getByTestId("dropdown-button"));

        expect(screen.getByTestId("sign-out-button")).toBeInTheDocument()
        expect(screen.getByTestId("view-user-quiz")).toBeInTheDocument()
    })

    it("Clicking user dropdown again hides it", () => {

        render(<SignedInUser />, {wrapper: MemoryRouter});

        userEvent.click(screen.getByTestId("dropdown-button"));

        expect(screen.getByTestId("sign-out-button")).toBeInTheDocument()

        userEvent.click(screen.getByTestId("dropdown-button"));

        expect(screen.queryByTestId("sign-out-button")).toBeNull()
    })
})