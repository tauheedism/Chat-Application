function signup(e) {
  e.preventDefault();
  const signUpDetails = {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
    phoneNumber:e.target.phoneNumber.value
  };
  console.log(signUpDetails);
  axios
    .post("http://localhost:3000/signup", signUpDetails)
    .then((response) => {
      console.log(response);
      window.location='login.html';
    })
    .catch((err) => {
      console.log(err);
    });
  }