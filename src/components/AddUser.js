import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/actions/usersActions";

//Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


const AddUser = () => {
    const initialUserState = {
      id: null,
      name: " ",
      surname: " ",
      desc: " ",
      avatar: " ",
      published: false
    };

    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);
  
    const dispatch = useDispatch();
  
    const handleInputChange = event => {
      const { name, value } = event.target;
      setUser({ ...user, [name]: value });
    };
  
    const saveUser = () => {
      const { name, surname, desc, avatar } = user;
  
      dispatch(createUser(name, surname, desc, avatar))
        .then(data => {
          setUser({
            id: data.id,
            name: data.name,
            surname: data.surname,
            desc: data.desc,
            avatar: data.avatar,
            published: data.published
          });
          setSubmitted(true);
  
          console.log(data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const newUser = () => {
      setUser(initialUserState);
      setSubmitted(false);
    };
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                <h4>You submitted successfully!</h4>
                <Button size="small" color="success" onClick={newUser}>
                    Add
                </Button>
                </div>
            ) : (
                <div>
                <FormControl>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input 
                        id="name" 
                        aria-describedby="my-helper-text" 
                        name="name" 
                        required
                        value={user.name}
                        onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="surname">Surname</InputLabel>
                    <Input 
                        id="surname" 
                        aria-describedby="my-helper-text" 
                        name="surname" 
                        required
                        value={user.surname}
                        onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="desc">Description</InputLabel>
                    <Input 
                        id="desc" 
                        aria-describedby="my-helper-text" 
                        name="desc" 
                        required
                        value={user.desc}
                        onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="avatar">Avatar</InputLabel>
                    <Input 
                        id="avatar" 
                        aria-describedby="my-helper-text" 
                        name="avatar" 
                        required
                        value={user.avatar}
                        onChange={handleInputChange} />
                </FormControl>
                <Button size="small" color="primary" onClick={saveUser}>
                    Submit
                </Button>
                </div>
            )}
        </div>
    );
};
    
export default AddUser;