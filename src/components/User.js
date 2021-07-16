import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../redux/actions/usersActions";
import UserDataService from "../services/UserService";

//Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const User = (props) => {
  const initialUserState = {
    id: null,
    name: " ",
    surname: " ",
    desc: " ",
    avatar: " ",
    published: false
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      id: currentUser.id,
      name: currentUser.name,
      surname: currentUser.surname,
      desc: currentUser.desc,
      avatar: currentUser.avatar,
      published: status
    };
    dispatch(updateUser(currentUser.id, data))
      .then(response => {
        

        setCurrentUser({ ...currentUser, published: status });
        console.log(response);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateUser(currentUser.id, currentUser))
      .then(response => {
        console.log(response);
        setMessage("The user was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeUser = () => {
    dispatch(deleteUser(currentUser.id))
      .then(() => {
        props.history.push("/users");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <FormControl>
                <InputLabel htmlFor="name">Name:</InputLabel>
                <Input 
                    id="name" 
                    aria-describedby="my-helper-text" 
                    name="name" 
                    required
                    value={currentUser.name}
                    onChange={handleInputChange} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="surname">Surname:</InputLabel>
                <Input 
                    id="surname" 
                    aria-describedby="my-helper-text" 
                    name="surname" 
                    required
                    value={currentUser.surname}
                    onChange={handleInputChange} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="desc">Description:</InputLabel>
                <Input 
                    id="desc" 
                    aria-describedby="my-helper-text" 
                    name="desc" 
                    required
                    value={currentUser.desc}
                    onChange={handleInputChange} />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="avatar">Avatar:</InputLabel>
                <Input 
                    id="avatar" 
                    aria-describedby="my-helper-text" 
                    name="avatar" 
                    required
                    value={currentUser.avatar}
                    onChange={handleInputChange} />
            </FormControl>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentUser.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentUser.published ? (
            <Button
                size="small" 
                color="primary"
                onClick={() => updateStatus(false)}
            >
                UnPublish
            </Button>
          ) : (
            <Button
                size="small" color="success"
                onClick={() => updateStatus(true)}
            >
              Publish
            </Button>
          )}

          <Button size="small" color="secondary" onClick={removeUser}>
            Delete
          </Button>

          <Button
            size="small" color="success"
            onClick={updateContent}
          >
            Update
          </Button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;