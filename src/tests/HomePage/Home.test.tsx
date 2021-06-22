import React from "react"
import { fireEvent, getByLabelText, render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Home from "../../components/HomePage/home"
import { MemoryRouter, Router } from "react-router"

describe("Home Page test suite", () => {

    it("renders correctly", async () => {

        render(<Home />, {wrapper: MemoryRouter})
        
        await waitFor(() => {
            expect(screen.getByText("Quizzaro")).toBeInTheDocument();
            expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
            expect(screen.getByTestId("quiz-search-input")).toBeInTheDocument();
            expect(screen.getByTestId("quiz-search-button")).toBeInTheDocument();
            expect(screen.getByTestId("recent-quiz-container")).toBeInTheDocument()
            expect(screen.getByTestId("quiz-id-link")).toBeInTheDocument();
        })

    })

    it("Typing input sets value correctly", async () => {
        
        render(<Home />, {wrapper: MemoryRouter})

        userEvent.type(screen.getByTestId("quiz-search-input"), "qwerty654321")

        await waitFor(() => {
            expect(screen.getByTestId("quiz-search-input")).toHaveValue("qwerty654321")
        })
    })

})