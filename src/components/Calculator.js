import React from "react"
import './calculator.css'

export const Calculator = () => {
    return (
        <>
        <h1>Calculator</h1>
        <div className="calcBody">
            <div className="calcName">
                EZE Calc 3000
            </div>
            <div className="calcDisplay">
                <div>
                    <input 
                        type="text" 
                        />
                </div>
            </div>
            <div className="calcBtns">
                <div className="calcBtns__row">
                    <button id="clear">Clear</button>
                    <button id="delete">Del</button>
                    <button id=""></button>
                </div>
                <div className="calcBtns__row">
                    <button id="para">( )</button>
                    <button id="perc">%</button>
                    <button id="exp">exp</button>
                    <button id="div">/</button>
                </div>
                <div className="calcBtns__row">
                    <button id="seven">7</button>
                    <button>8</button>
                    <button>9</button>
                    <button>x</button>
                </div>
                <div className="calcBtns__row">
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>+</button>
                </div>
                <div className="calcBtns__row">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>-</button>
                </div>
                <div className="calcBtns__row">
                    <button id="zero">0</button>
                    <button id="dec">.</button>
                    <button id="enter">Enter</button>
                </div>
            </div>
        </div>
        </>
    )
}