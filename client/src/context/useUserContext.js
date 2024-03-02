import { useContext } from "react"
import { QuestionContext } from "./QuestionsContext"

export const useQuestions = () => {
    const context = useContext(QuestionContext)
    if (context === undefined)
    {
        throw new Error("useQuestions must be used within a QuestionsContextProvider")
    }
    return context
}