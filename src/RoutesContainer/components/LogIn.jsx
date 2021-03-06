import axios from "axios";
import React, { useState,useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import "../css/LogIn.css";
import { useCookies } from "react-cookie";
import Loader from "../../components/Loader";
import {isLoadingContext} from '../../components/Routes';

function LogIn({ history }) {

  const {isLoading,setIsLoading} = useContext(isLoadingContext);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [, setCookie] = useCookies(["x_auth"]);

  const { email, password } = inputs;

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await axios
      .post("http://localhost:8081/user/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data === 0) {
          alert("아이디가 존재하지 않습니다.");
          setIsLoading(false);
          return false;
        } else if (res.data === 1) {
          alert("비밀번호가 일치하지 않습니다.");
          setIsLoading(false);
          return false;
        } else {
          console.log("인증성공", res);
          //엑세스토큰과 리프레쉬토큰 저장
          setCookie("x_auth", res.data[0], { maxAge: 1800 });
          setCookie("nickname",res.data[2]);
          localStorage.setItem("r_x_auth", res.data[1]);
          history.push("/home");
        }
      }).catch((error)=>{
        alert('인터넷 연결상태를 확인하여주세요.')
      })
      setIsLoading(false);
  };

  return (
    <div className="logIn">
      <h1>Yaja tree</h1>
      {isLoading ? <Loader isLoading={isLoading}/> : null}

      <form className="form_container logIn_form" onSubmit={onSubmitHandler}>
        <h2>LOG IN</h2>
        <TextField
          onChange={onChangeHandler}
          required
          value={email}
          name="email"
          label="Email"
          type="email"
          placeholder="Login Email"
          rowsMax={2}
          variant="outlined"
        />

        <TextField
          onChange={onChangeHandler}
          required
          value={password}
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          variant="outlined"
        />
        <Button
          className="btn_logIn"
          onSubmit={onSubmitHandler}
          type="submit"
          variant="contained"
          color="primary"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}

export default LogIn;
