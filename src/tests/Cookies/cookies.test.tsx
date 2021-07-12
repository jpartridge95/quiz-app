import React from "react"
import { fireEvent, getByLabelText, render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import CookiePage from "../../components/Cookies/cookiePage"
import { MemoryRouter, Router } from "react-router"

describe("cookies suite", () => {

    it("renders correctly", async () => {

        render(<CookiePage />, {wrapper: MemoryRouter})

        await waitFor(() => {    
            expect(screen.getByText("cookies and shizz")).toBeInTheDocument()
            expect(screen.getByText("I am okay with cookies")).toBeInTheDocument()
            expect(screen.getByText("I do not like cookies")).toBeInTheDocument()
        })
    })
    
    it("Shows correct message for cookies accepted", async () => {
        
        render(<CookiePage />, {wrapper: MemoryRouter})

        await waitFor(() => {
            expect(screen.getByText("cookies and shizz")).toBeInTheDocument();
        })

        userEvent.click(screen.getByText("I am okay with cookies"));

        await waitFor(() => {
            expect(screen.getByText("thanks!")).toBeInTheDocument()
        })
    })
    
    it("Shows right message for not accepted", async () => {
        
        render(<CookiePage />, {wrapper: MemoryRouter})

        await waitFor(() => {
            expect(screen.getByText("cookies and shizz")).toBeInTheDocument();
        })

        userEvent.click(screen.getByText("I do not like cookies"));

        await waitFor(() => {
            expect(screen.getByText("aww, shucks")).toBeInTheDocument()
        })
    })

    it("message changes when status changes", async () => {
        
        render(<CookiePage />, {wrapper: MemoryRouter})

        await waitFor(() => {
            expect(screen.getByText("cookies and shizz")).toBeInTheDocument();
        })

        userEvent.click(screen.getByText("I do not like cookies"));

        await waitFor(() => {
            expect(screen.getByText("aww, shucks")).toBeInTheDocument()
        })

        userEvent.click(screen.getByText("I am okay with cookies"));

        await waitFor(() => {
            expect(screen.getByText("thanks!")).toBeInTheDocument()
        })

        userEvent.click(screen.getByText("I do not like cookies"));

        await waitFor(() => {
            expect(screen.getByText("aww, shucks")).toBeInTheDocument()
        })
    })


})