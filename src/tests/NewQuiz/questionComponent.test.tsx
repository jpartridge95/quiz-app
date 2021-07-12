import React from "react"
import { act, fireEvent, getByLabelText, render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import QuestionComponent from "../../components/NewQuiz/QuestionComponent"
import { debug } from "console"
import NewQuiz from "../../components/NewQuiz/newQuiz"
import { MemoryRouter, Router } from "react-router"

const ENV_ANSWERS = {
        rootQuestion: "",
        rootAnswers:[
            {
                answerText: "",
                correct: false
            },
            {
                answerText: "",
                correct: false
            }
        ]
    }


const ENV_INDEX = 1


describe("Add question component", () => {

    it("renders correctly", async () => {

        render(<NewQuiz />, {wrapper: MemoryRouter})

        await waitFor(() => {
            expect(screen.getByTestId("question-input-field")).toBeInTheDocument();
            expect(screen.getAllByTestId("answer-input-field")).toHaveLength(2);
            expect(screen.getAllByTestId("correct-checkbox")).toHaveLength(1);
            expect(screen.queryByTestId("remove-answer-button")).toBeNull();
            expect(screen.getByTestId("add-answer-button")).toBeInTheDocument();
        })
    });

    it("clicking add answer adds an answer input", async () => {

        render(<NewQuiz />, {wrapper: MemoryRouter});

        userEvent.click(screen.getByTestId("add-answer-button"));

        await waitFor(() => {    
            expect(screen.queryAllByTestId("answer-input-field")).toHaveLength(3);
            expect(screen.queryAllByTestId("correct-checkbox")).toHaveLength(2);
            expect(screen.queryAllByTestId("remove-answer-button")).toHaveLength(1);
        })
    });

    it("clicking add answer twice adds another answer input", async () => {

        render(<NewQuiz />, {wrapper: MemoryRouter});

        userEvent.click(screen.getByTestId("add-answer-button"));
        userEvent.click(screen.getByTestId("add-answer-button"));

        await waitFor(() => {
            expect(screen.queryAllByTestId("answer-input-field")).toHaveLength(4);
            expect(screen.queryAllByTestId("correct-checkbox")).toHaveLength(3);
            expect(screen.queryAllByTestId("remove-answer-button")).toHaveLength(2);
        })

    });

    it("clicking checkbox sets checked to true", async () => {

        render(<NewQuiz />, {wrapper: MemoryRouter});

        userEvent.click(screen.getByTestId("correct-check-test"));

        await waitFor(() => {
            expect(screen.getByTestId("correct-check-test")).toHaveProperty("checked", true);
            expect(screen.getByTestId("correct-checkbox")).toHaveProperty("checked", false)
        })
    });

    it("adding input functions as intended", async () => {
        
        render(<NewQuiz />, {wrapper: MemoryRouter});

        userEvent.type(screen.getAllByTestId("answer-input-field")[0], "this is the right answer")
        userEvent.click(screen.getByTestId("correct-check-test"))

        userEvent.type(screen.getAllByTestId("answer-input-field")[1], "this is the wrong answer")

        await waitFor(() => {
            expect(screen.getAllByTestId("answer-input-field")[0]).toHaveAttribute("value", "this is the right answer")
            expect(screen.getAllByTestId("answer-input-field")[1]).toHaveAttribute("value", "this is the wrong answer")
            expect(screen.getByTestId("correct-check-test")).toHaveProperty("checked", true)
        })
    })

    it("adding a question does not disrupt inputs", async () => {

        render(<NewQuiz/>, {wrapper: MemoryRouter});

        userEvent.type(screen.getAllByTestId("answer-input-field")[0], "this is the right answer")
        userEvent.click(screen.getByTestId("correct-check-test"))

        userEvent.type(screen.getAllByTestId("answer-input-field")[1], "this is the wrong answer")

        userEvent.click(screen.getByTestId("add-answer-button"))

        await waitFor(() => {
            expect(screen.getAllByTestId("answer-input-field")[0]).toHaveAttribute("value", "this is the right answer")
            expect(screen.getAllByTestId("answer-input-field")[1]).toHaveAttribute("value", "this is the wrong answer")
            expect(screen.getByTestId("correct-check-test")).toHaveProperty("checked", true)

            expect(screen.getAllByTestId("answer-input-field")[2]).toHaveAttribute("value", "")
            expect(screen.getAllByTestId("correct-checkbox")[0]).toHaveProperty("checked", false)
            expect(screen.getAllByTestId("correct-checkbox")[1]).toHaveProperty("checked", false)
        })
    })

    it("pressing the remove button does so", async () => {

        render(<NewQuiz />, {wrapper: MemoryRouter});

        userEvent.click(screen.getByTestId("add-answer-button"))

        userEvent.click(screen.getByTestId("remove-answer-button"))

        await waitFor(() => {
            expect(screen.queryByTestId("remove-answer-button")).toBeNull()
        })
    })
})