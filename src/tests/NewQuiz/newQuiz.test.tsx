import React from "react"
import { fireEvent, getByLabelText, render, screen, waitFor } from "@testing-library/react"
import NewQuiz from "../../components/NewQuiz/newQuiz"
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Router } from "react-router"
import { createMemoryHistory } from "history"

describe("New Quiz Section", () => {  
    
    it("Renders correctly", async () => {

        render(<NewQuiz />)

        await waitFor(() => {
            expect(screen.queryAllByTestId("question-input-field")).toHaveLength(1)
            expect(screen.getByTestId("remove-question-button")).toBeInTheDocument()
            expect(screen.getByTestId("add-question-button")).toBeInTheDocument()
        })

    })

    it("adds new question on click", async () => {

        render(<NewQuiz />)

        userEvent.click(screen.getByTestId("add-question-button"))

        await waitFor(() => {
            expect(screen.queryAllByTestId("question-input-field")).toHaveLength(2)
            expect(screen.queryAllByTestId("answer-input-field")).toHaveLength(4)
        })

        userEvent.click(screen.getByTestId("add-question-button"))

        await waitFor(() => {
            expect(screen.queryAllByTestId("question-input-field")).toHaveLength(3)
            expect(screen.queryAllByTestId("answer-input-field")).toHaveLength(6)
        })
    })

    it("removes the correct component on delete component click", async () => {

        render(<NewQuiz />)

        userEvent.click(screen.getByTestId("add-question-button"))
        userEvent.click(screen.getByTestId("add-question-button"))

        userEvent.type(screen.queryAllByTestId("question-input-field")[0], "To Stay")
        userEvent.type(screen.queryAllByTestId("question-input-field")[1], "To Go")
        userEvent.type(screen.queryAllByTestId("question-input-field")[2], "To Stay")

        userEvent.click(screen.getAllByTestId("remove-question-button")[1])

        await waitFor(() => {
            expect(screen.queryAllByTestId("question-input-field")).toHaveLength(2)

            expect(screen.queryAllByTestId("question-input-field")[1]).toHaveAttribute("value", "To Stay")
        })
    })

    // Big Validation test, will take time

    it("Validates inputs for empty strings and including an answer marked correct", async () => {

        const history = createMemoryHistory()

        render(<NewQuiz />, {wrapper: MemoryRouter})

        userEvent.click(screen.getByTestId("submit-quiz-button"))

        await waitFor(() => {
            expect(screen.getByText("One or more question fields are empty")).toBeInTheDocument()
        })

        userEvent.type(screen.getByTestId("question-input-field"), "Test question")

        userEvent.click(screen.getByTestId("submit-quiz-button"))

        await waitFor(() => {
            expect(screen.queryByText("One or more question fields are empty")).toBeNull
            expect(screen.getByText("One or more answer fields are empty")).toBeInTheDocument()
        })

        userEvent.type(screen.getAllByTestId("answer-input-field")[0], "input")
        userEvent.type(screen.getAllByTestId("answer-input-field")[1], "input")

        userEvent.click(screen.getByTestId("submit-quiz-button"))

        await waitFor(() => {
            expect(screen.queryByText("One or more answer fields are empty")).toBeNull()
            expect(screen.queryByText("One or more question fields are empty")).toBeNull()
            expect(screen.getByText("One or more question is missing a correct answer")).toBeInTheDocument()
        })

        userEvent.click(screen.getByTestId("correct-check-test"))

        userEvent.click(screen.getByTestId("submit-quiz-button"))

        await waitFor(() => {
            expect(screen.queryByText("One or more question is missing a correct answer")).toBeNull()
        })
    })

    // Have a seperate file/suite for e-2-e testing
})