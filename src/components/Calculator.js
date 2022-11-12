import React, { useReducer } from "react";
import { DigitButton } from "./DigitButton";
import { OperationButton } from "./OperationButton";
import "./calculator.css"

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}

const reducer = (state, { type, payload }) => {
    switch(type) {
        case ACTIONS.ADD_DIGIT:
            // After a calculation, this puts the next digit typed as a new currentOperand instead of adding the digit onto the previous result
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }
            // Ensures only one zero can be placed at start of number
            if (payload.digit === '0' && state.currentOperand === '0') {
                return state
            }
            // Ensures only one decimal can be included in number
            if (payload.digit === '.' && state.currentOperand.includes('.')) {
                return state
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload.digit}`
            }
        case ACTIONS.CHOOSE_OPERATION:
            // Ensures operator can't be selected without first selecting a number
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }
            // Overwrites operator in case user hits wrong operand
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                }
            }
            // Displays the current number as the previous and displays it and operator on top of an empty input for currentOperand
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }

            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null
            }
        case ACTIONS.CLEAR: 
            return {}
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null,
                }
            }
            // If don't have a currentOperand, can't delete anything from it
            if (state.currentOperand == null) {
                return state
            }
            // If only one digit in currentOperant, returns to null state
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: null
                }
            }
            return {
                ...state,
                // Removes last digit from currentOperand
                currentOperand: state.currentOperand.slice(0, -1)
            }
        case ACTIONS.EVALUATE:
            if (
                state.operation == null || 
                state.currentOperand == null || 
                state.previousOperand == null
            ) {
                return state
            } return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state)
            }
    }
}

const evaluate = ({ currentOperand, previousOperand, operation }) => {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)

    if (isNaN(prev) || isNaN(current)) {
        return ''
    }
    let computation = ''
    switch (operation) {
        case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case '*':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
    }

    return computation.toString()
}

// Puts commas where needed
const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
    maximumFractionDigits: 0,
})

// Checks to make sure operand exists first, and then if it has a decimal
const formatOperand = (operand) => {
    if (operand == null) {
        return
    }
    const [integer, decimal] = operand.split('.')
    if (decimal == null) {
        return INTEGER_FORMATTER.format(integer)
    }
    // Keeps decimal from having commas
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

export const Calculator = () => {
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

return (
    <>
    <div className="calculator-grid">
        <div className="output">
            <div className="previous">
                {formatOperand(previousOperand)} {operation}
            </div>
            <div className="current">
                {formatOperand(currentOperand)}
            </div>
        </div>
        <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR})}>Clear</button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT})}>Del</button>
        <OperationButton operation='÷' dispatch={dispatch}/> 
        <DigitButton digit='7' dispatch={dispatch}/> 
        <DigitButton digit='8' dispatch={dispatch}/> 
        <DigitButton digit='9' dispatch={dispatch}/> 
        <OperationButton operation='*' dispatch={dispatch}/>
        <DigitButton digit='4' dispatch={dispatch}/> 
        <DigitButton digit='5' dispatch={dispatch}/> 
        <DigitButton digit='6' dispatch={dispatch}/> 
        <OperationButton operation='+' dispatch={dispatch}/>
        <DigitButton digit='1' dispatch={dispatch}/>
        <DigitButton digit='2' dispatch={dispatch}/> 
        <DigitButton digit='3' dispatch={dispatch}/> 
        <OperationButton operation='-' dispatch={dispatch}/>
        <DigitButton digit='0' dispatch={dispatch}/> 
        <DigitButton digit='.' dispatch={dispatch}/> 
        <button id="equal-button" className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE})}>=</button>
    </div>
    </>
)
}