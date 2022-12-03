import "./style.scss";
import { FaEnvelopeOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { useState } from "react";
import { logIn } from "../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../features/userSlice";
import { setState } from "../../features/userSlice";

export const LogIn = ({ showLogIn }) => {
  const dispatch = useDispatch();
  const [user] = useState({
    email: "simonyan@alen.com",
    password: "simonyan@alen.com",
  });
  const error = useSelector(state => state.error.data.message)

  const onChangeHandler = (e, id) => {
    user[id] = e.target.value;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await logIn(user);
    if (res.status === 200) {
      dispatch(setUserData(res.data));
      showLogIn(false);
      dispatch(setState())
    } else {
      console.log("error")
    }
  };
  
  return (
    <div className="background">
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Log in</h2>
            <p className="close" onClick={() => showLogIn(false)}>
              <FaRegWindowClose />
            </p>
          </div>
          <div className="row clearfix">
            <p className="error">{error && error}</p>
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
                    id="email"
                    defaultValue={'simonyan@alen.com'}
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
                    id="password"
                    defaultValue={'simonyan@alen.com'}
                  />
                </div>
                <input className="button" type="submit" value="Log in" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
