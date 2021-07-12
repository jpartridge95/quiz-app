import React from "react"
import { fireEvent, getByLabelText, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Router } from "react-router"
import CookieNotification from "../../components/reusables/acceptCookies"

describe("banner suite", () => {

    beforeEach(() => {
        localStorage.clear()
    })

    it("renders correctly", async () => {

        render(<CookieNotification />, {wrapper: MemoryRouter})

        await waitFor(() => {
            expect(screen.getByText("Do you accept cookies?")).toBeInTheDocument();
        })
    })

    it("doesn't display when already answered", () => {

        localStorage.setItem("cookies-accepted", "yes")
        
        render(<CookieNotification />)

        expect(screen.queryByText("Do you accept cookies")).toBeNull();
    })

    it("disappears on accept cookies", () => {

        render(<CookieNotification />)

        expect(screen.getByText("Do you accept cookies?")).toBeInTheDocument();

        userEvent.click(screen.getByText("Okay"))

        expect(screen.queryByText("Do you accept cookies?")).toBeNull()
    })

    it("disappears on reject cookies", () => {

        render(<CookieNotification />)

        expect(screen.getByText("Do you accept cookies?")).toBeInTheDocument();

        userEvent.click(screen.getByText("No thanks"))

        expect(screen.queryByText("Do you accept cookies?")).toBeNull()
        expect(screen.getByText("I would like cookies actually")).toBeInTheDocument();
    })
})