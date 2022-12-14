import { ACTIONS } from "./Calculator"

export const OperationButton = ({ dispatch, operation }) => {
    return (
            <button 
                id="operation-button"
                onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
            >
                {operation}
            </button>
    )
}