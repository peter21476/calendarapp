import React from 'react'

const Categories = (props) => {
    return (
        <div>
            <div className="categories-wrapper">
                <label>Categories</label>
                <select name="categories" id="sorting-type" onChange={props.sortingEventProps}>
                    <option value="All">All</option>
                    {props.uniqueCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Categories
