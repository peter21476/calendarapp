import React from 'react'

const Switch = (props) => {
    return (
        <>
            <div className="form-check">
                <input onChange={props.checkBoxFunc} className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" />
                <label className="form-check-label">
                    Hide Past Events
                </label>
            </div>
        </>
    )
}

export default Switch
