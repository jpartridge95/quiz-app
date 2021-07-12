import React from "react"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import NavBar from "../../components/navbar/navbar"
import SignedInUser from "../../components/navbar/SignedInUser"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router"

describe("Navbar Suite", () => {

    beforeEach(() => {
        localStorage.setItem("cookies-accepted", "yes")
    })

    it("renders nav correctly", async () => {

        render(<NavBar />, {wrapper: MemoryRouter})

        await waitFor(() => {
            expect(screen.getByText("Quizzaro")).toBeInTheDocument()
            expect(screen.getByText("Sign in with Google")).toBeInTheDocument()
        })
    })

    it("renders signedinuser component correctly", () => {

        render(<SignedInUser />, {wrapper: MemoryRouter});

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