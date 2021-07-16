import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUsers } from "../redux/actions/usersActions";
import { Link } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import ReactPaginate from "react-paginate";


const UsersList = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [pageNumber, setPageNumber] = useState(0);
    

    const users = useSelector(state => state.allUsers );
    let dataLength = users.length;


    const rowsPerPage = 5;
    const pagesVisited = pageNumber * rowsPerPage;


    const numberOfPages = Math.ceil(dataLength/rowsPerPage);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveUsers());        
    }, [dispatch]);

    const setActiveUser = (user, index) => {
        setCurrentUser(user);
        setCurrentIndex(index);
    };
  
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    return (
        <div className="list row container">
            
            <div className="col-md-6">
                <h4>Users List</h4>
        
                <ul className="list-group">
                {users &&
                    users
                        .slice(pagesVisited, pagesVisited + rowsPerPage)
                        .map((user, index) => (
                    <li
                        className={
                        "list-group-item " + (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveUser(user, index)}
                        key={index}
                    >
                        {user.name}
                    </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentUser ? (
                    <div>
                        <h4>User</h4>
                        <div>
                            <InputLabel>
                                <strong>Name:</strong>
                            </InputLabel>{" "}
                                {currentUser.name}
                        </div>
                        <div>
                            <InputLabel>
                                <strong>Surname:</strong>
                            </InputLabel>{" "}
                                {currentUser.surname}
                        </div>
                        <div>
                            <InputLabel>
                                <strong>Description:</strong>
                            </InputLabel>{" "}
                                {currentUser.desc}
                        </div>
                        <div className="col-sm-12">
                            <InputLabel>
                                <strong>Avatar:</strong>
                            </InputLabel>{" "}
                                {currentUser.avatar != null ? currentUser.avatar : "There is no Avatar for this user"}
                        </div>
                        <div>
                            <InputLabel>
                                <strong>Status:</strong>
                            </InputLabel>{" "}
                                {currentUser.published ? "Published" : "Pending"}
                        </div>
            
                        <Link to={"/user/" + currentUser.id} className="btn btn-warning">
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a User...</p>
                    </div>
                )}
            </div>

           <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={numberOfPages}
                onPageChange={changePage}
                containerClassName={"pagButtons mt-5"}
                previousLinkClassName={"prevButton"}
                nextLinkClassName={"nextButton"}
                disabledClassName={"disabledButton"}
                activeClassName={"activeButton"}
           />
        </div>
    );
};
    
export default UsersList;