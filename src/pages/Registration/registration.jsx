import "./style.scss";
import { FaEnvelopeOpen, FaUser, FaLock, FaRegWindowClose } from 'react-icons/fa';
import { useState } from "react";
import { registration } from "../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../features/userSlice";

export const Registration = ({showRegistration}) => {
  const dispatch = useDispatch();
  const [data] = useState({
    userName: '',
    lastName: '',
    email: '',
    password: '',
    avatar: ''
  })

  const error  = useSelector(state => state.error.data);

  const onChangeHandler = (e,id) => {    
    if (['email','password','userName','lastName'].includes(e.target.id)){
      data[id] = e.target.value
    }
    if (id === 'avatar') {
      data[id] = e.target.files[0]
    }
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    const formData = new FormData();

    formData.append('userName',data.userName);
    formData.append('lastName',data.lastName);
    formData.append('email',data.email);
    formData.append('password',data.password);
    formData.append('file',data.avatar);

    const res  = await registration(formData);
    if (res.status === 200) {
      dispatch(setUserData(res.data))
      showRegistration(false)
    }
  } 

  return (
    <div className="background">
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Registration Form</h2>
            <p className="close" onClick={()=> showRegistration(false)}><FaRegWindowClose/></p>
          </div>
          <div className="row clearfix">
            <p className="error">
              {error ? ((error.msg !== undefined ? `${error.msg} (fill in correctly)` : '' ) ?? 
              error.message) : ''}
            </p>
            <div className="">
              <form 
                onChange={(e) => onChangeHandler(e, e.target.id)}
                onSubmit={(e) => onSubmitHandler(e)}
              >
                <div className="input_field">
                  {" "}
                  <span>
                    <FaEnvelopeOpen />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    id='email'
                  />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    id='password'
                  />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Re-type Password"
                    required
                  />
                </div>
                <div className="row clearfix">
                  <div className="col_half">
                    <div className="input_field">
                      {" "}
                      <span>
                        <FaUser />
                      </span>
                      <input type="text" name="name" placeholder="First Name" id='userName' />
                    </div>
                  </div>
                  <div className="col_half">
                    <div className="input_field">
                      {" "}
                      <span>
                      <FaUser />
                      </span>
                      <input
                        type="text"
                        name="name"
                        placeholder="Last Name"
                        required
                        id='lastName'
                      />
                    </div>
                  </div>
                  <div className="col_half">
                    <div className="input_field">
                      {" "}
                      <input
                        type="file"
                        name="avatar"
                        required
                        id='avatar'
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="input_field radio_option">
                  <input type="radio" name="radiogroup1" id="rd1" />
                  <label htmlFor="rd1">Male</label>
                  <input type="radio" name="radiogroup1" id="rd2" />
                  <label htmlFor="rd2">Female</label>
                </div>
                <div className="input_field checkbox_option">
                  <input type="checkbox" id="cb1" />
                  <label htmlFor="cb1">I agree with terms and conditions</label>
                </div> */}
                {/* <div className="input_field checkbox_option">
                  <input type="checkbox" id="cb2" />
                  <label htmlFor="cb2">I want to receive the newsletter</label>
                </div> */}
                <input className="button" type="submit" value="Register" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
