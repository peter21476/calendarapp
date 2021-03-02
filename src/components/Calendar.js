import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CalendarItem from './CalendarItem'
import Pagination from './Pagination'

const Calendar = () => {

    useEffect(() => {
        axios.get(`https://api.bizzabo.com/api/events`, {
            headers: {
                'Accept': 'application/vnd.bizzabo.v2.0+json',
                'Authorization': 'Bearer b2f9b657-d8fd-4c34-a28b-eba13cab25c2',
                'Access-Control-Allow-Origin': "*"
            }
        }).then(res => {
            const data = res.data
            data.content.sort((a, b) => a.startDate > b.startDate ? 1 : -1)
            setfilteredEvents(data.content)
            setBizzaboEvents(data.content)
        });
    }, [])

    const [bizzaboEvents, setBizzaboEvents] = useState([])

    const [bizzaboCategory, setBizzaboCategory] = useState('All')

    const [filteredEvents, setfilteredEvents] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(6)

    const [showSearchOnMobile, setShowSearchOnMobile] = useState(false)

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    let currentPosts = filteredEvents.slice(indexOfFirstPost, indexOfLastPost)


    // Change page
    function paginate(pageNumber) {
        setCurrentPage(pageNumber)
        window.scrollTo(0, 0);
    }

    //Get Categories
    let arrayCat = [];
    bizzaboEvents.map(itm => {
        if (itm.type !== undefined) {
            itm.type.map(itmType => {
                arrayCat.push(itmType);
            })
        }
    })
    let uniqueCategories = [...new Set(arrayCat)]

    //Search Function
    const [searchTerm, setSearchTerm] = useState("")
    const handleChange = event => {
        setSearchTerm(event.target.value)

        let arrayFilt2 = [];
        bizzaboEvents.filter(function (itm) {
            if (bizzaboCategory == 'All') {
                arrayFilt2 = bizzaboEvents
            } else {
                if (itm.type == bizzaboCategory) {
                    arrayFilt2.push(itm)
                }
            }
        })

        let filteredPosts = arrayFilt2.filter(item =>
            item.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setfilteredEvents(filteredPosts)

    };


    //Filter Functions
    let arrayFilt = [];
    function sortingEvent(e) {
        setBizzaboCategory(e.target.value)
        bizzaboEvents.filter(function (itm) {
            if (e.target.value == 'All') {
                setfilteredEvents(bizzaboEvents)
            } else {
                if (itm.type == e.target.value) {
                    arrayFilt.push(itm)
                }
                setfilteredEvents(arrayFilt)
            }
        })
    }

    function handleFunctionsShowing() {
        setShowSearchOnMobile(!showSearchOnMobile);
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-10 col-md-12">
                        <h1>Event Calendar</h1>
                        <div className="row">
                            {currentPosts.map(item => (
                                <CalendarItem
                                    eventName={item.name}
                                    eventPhoto={item.coverPhotoUrl}
                                    eventStartDate={item.startDate}
                                    eventEndDate={item.endDate}
                                    eventURL={item.websiteUrl}
                                    eventType={item.type ? item.type : 'Not Categorized'}
                                    eventId={item.id}
                                    eventURL={item.websiteUrl}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="col-md-2 my-auto search-col">
                        <div className="mobile-menu" onClick={handleFunctionsShowing}><i className="fas fa-bars"></i></div>
                        <div className={`functions-wrapper ${showSearchOnMobile == false ? "hidden" : ""}`}>
                            <div className="search-wrapper">
                                <label>Live Search</label>
                                <input id="search-text" name="search-text" type="text" placeholder="Search" value={searchTerm} onChange={handleChange} />
                            </div>
                            <div className="categories-wrapper">
                                <label>Categories</label>
                                <select name="categories" id="sorting-type" onChange={sortingEvent}>
                                    <option value="All">All</option>
                                    {uniqueCategories.map(cat => (
                                        <option value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={filteredEvents.length}
                paginate={paginate} />
        </>
    )
}

export default Calendar
