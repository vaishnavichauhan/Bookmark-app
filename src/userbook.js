import React, { useEffect, useState } from "react";

const Userbookmark = () => {
    var [data, setdata] = useState([])
    var [dataid, setdataid] = useState([])
    const [buttonText, setButtonText] = useState("bookmark ok");
    useEffect(() => {
        fetch("https://api.github.com/users")
            .then(y => y.json())
            // .then((response) => setdata(response))   
            .then((response) => {
                const testData = response.map((value) => {
                    return {
                        isBookmarked: false,
                        ...value,
                    }
                });
                setdata(testData)
            });
    }, []);

    let booked = (e, para) => {
        setButtonText("unbooked")
        var bookedid = data.find(dataids => dataids.id == para);
        bookedid.isBookmarked = true;
        setdataid([...dataid, bookedid])

    }

    let bookcancel = (e, para) => {
        var bookremove = dataid.filter(dataids => dataids.id !== para);
        var newbook = data.find(dataids => dataids.id == para)
        newbook.isBookmarked = false;
        setdataid(bookremove)
    }


    return (
        <div className="d-flex">
            <div className="w-50 mx-2 px-4">
                <h1 className="text-center">User-Lists</h1>
                {
                    data.map((useritem) => {

                        var bookUnbookBtn = '';
                        if (useritem.isBookmarked) {
                            bookUnbookBtn = <button className="bg-danger" onClick={e => bookcancel(e, useritem.id)}>Unbook <i class="fa-solid fa-xmark"></i></button>
                        } else {
                            bookUnbookBtn = <button onClick={e => booked(e, useritem.id)}>Bookmark <i class="fa-solid fa-bookmark"></i></button>
                        }
                        return (<div className="d-flex justify-content-between p-2 mb-2 border">
                            <img className="rounded-circle" src={useritem.avatar_url} height={"100px"} width={"100px"} alt={"userpics"}></img>
                            <div>
                                <div><b>Id:</b>{useritem.id}</div>
                                <div><b>UserName:</b>{useritem.login}</div>
                            </div>
                            <div>{bookUnbookBtn}</div>
                        </div>
                        )
                    })
                }
            </div>
            <div className="w-50">
                <h1 className="text-center">Bookmark-Users</h1>
                {
                    dataid.map((useritem) => {
                        return (<div className="d-flex justify-content-between p-2 mb-2 border">
                            <img className="rounded-circle" src={useritem.avatar_url} height={"100px"} width={"100px"} alt={"userpics"}></img>
                            <div>
                                <div><b>Id:</b>{useritem.id}</div>
                                <div><b>UserName:</b>{useritem.login}</div>
                            </div>
                            <div><button className="bg-danger" onClick={e => bookcancel(e, useritem.id)}><i class="fa-solid fa-xmark"></i></button></div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Userbookmark;