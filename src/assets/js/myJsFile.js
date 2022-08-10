function giveAlert(){
    alert("external func")
}

function validationEmail() {
    var form = document.getElementById("loginForm");
    var exampleInputEmail1 = document.getElementById("email").value;
    var text = document.getElementById("text");
    var pattern = "/^[^ ]+@[^ ]+\.[a-z]{2,3}$/";
    debugger;
    if (exampleInputEmail1.match(pattern)) {
      form.classList.add("valid");
      form.classList.remove("invalid");
      text.innerHTML="your email address is valid"
    }
    else {
      form.classList.remove("valid");
      form.classList.add("invalid");
      text.innerHTML="your email address is invalid"

    }
  }