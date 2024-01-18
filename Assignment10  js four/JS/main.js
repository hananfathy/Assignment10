


var username = document.getElementById('name');
var email = document.getElementById('email');
var password = document.getElementById('password');
var loginEmail = document.getElementById('loginemail');
var loginpassword = document.getElementById('loginpassword');
var tagerror = document.getElementById('error');
var tagloginerror = document.getElementById('login-error');
var tagloginname = document.getElementById('loginname');
var pagelogin = document.getElementById('login');
var pagehome = document.getElementById('home');
var currentuser = {};
var users;


if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users").toString());
} else {
    users = []
}
var usersactive;
if (sessionStorage.getItem("usersactive")) {
    usersactive = JSON.parse(sessionStorage.getItem("usersactive").toString());
} else {
    usersactive = [];

}
var pathparts = location.href.split('/');
var baseURL = ''
for (var i = 1; i < pathparts.length - 1; i++) {
    baseURL += pathparts[i] + '/';
}




function signup() {

    var user = {
        name: username.value,
        email: email.value,
        password: password.value,
    };
    var checkerrors = validate(user);
    var checkeduser = Isfound(users, user.email);
    tagerror.classList.replace('d-block', 'd-none');
    console.log(user);
    if (!checkeduser && checkerrors.regexEmail && checkerrors.regexPassword && checkerrors.regexname) {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        console.log(checkerrors);
        tagerror.innerHTML = 'Success';
        tagerror.classList.replace('d-none', 'd-block');
        if (tagerror.classList.contains('text-danger')) {
            tagerror.classList.replace('text-danger', 'text-success');
        } else {
            tagerror.classList.add('text-success');
            clearForm();
        }

    } else {
        switch (true) {
            case user.email == '' || user.name == '' || user.password == '':
                tagerror.innerHTML = 'All Inputs Required';
                tagerror.classList.replace('d-none', 'd-block');
                if (tagerror.classList.contains('text-success')) {
                    tagerror.classList.replace('text-success', 'text-danger');
                } else {
                    tagerror.classList.add('text-danger');
                }

                break;
            case checkeduser != null:
                tagerror.innerHTML = 'Email Already Exists';
                tagerror.classList.replace('d-none', 'd-block');
                if (tagerror.classList.contains('text-success')) {
                    tagerror.classList.replace('text-success', 'text-danger');
                } else {
                    tagerror.classList.add('text-danger');
                }
                break;
            case !checkerrors.regexEmail:
                tagerror.innerHTML = 'Error in Email Format ex:examp@exp.com at least 3 letters in each part in email';
                tagerror.classList.replace('d-none', 'd-block');
                if (tagerror.classList.contains('text-success')) {
                    tagerror.classList.replace('text-success', 'text-danger');
                } else {
                    tagerror.classList.add('text-danger');
                }
                break;
            case !checkerrors.regexPassword:
                tagerror.innerHTML = 'Error in password Format , least 8 letters';
                tagerror.classList.replace('d-none', 'd-block');
                if (tagerror.classList.contains('text-success')) {
                    tagerror.classList.replace('text-success', 'text-danger');
                } else {
                    tagerror.classList.add('text-danger');
                }
                console.log(checkerrors.regexPassword);
                break;
            case !checkerrors.regexname:
                tagerror.innerHTML = 'Error in name Format ex:example least 5 letters in name';
                tagerror.classList.replace('d-none', 'd-block');
                if (tagerror.classList.contains('text-success')) {
                    tagerror.classList.replace('text-success', 'text-danger');
                } else {
                    tagerror.classList.add('text-danger');
                }
                break;
            default:
                break;
        }
    }


}



function login() {
    var lg_email = loginEmail.value;
    var lg_password = loginpassword.value;
    tagloginerror.classList.replace('d-block', 'd-none');
    var checkeduser = Isfound(users, lg_email);
    switch (true) {
        case lg_email == '' || lg_password == '':
            tagloginerror.innerHTML = 'All Inputs Required';
            tagloginerror.classList.replace('d-none', 'd-block');
            tagloginerror.classList.add('text-danger');
            break;
        case checkeduser && checkeduser.password == lg_password:
            usersactive.push(checkeduser);
            sessionStorage.setItem("usersactive", JSON.stringify(usersactive));
            currentuser = checkeduser;
            clearFormlogin();
            home(checkeduser);
            break;
        default:
            tagloginerror.innerHTML = 'incorrect email or password';
            tagloginerror.classList.replace('d-none', 'd-block');
            tagloginerror.classList.add('text-danger');
            break;
    }


}



async function home(checkeduser) {
    pagelogin.classList.replace('d-flex', 'd-none');
    pagehome.classList.replace('d-none', 'd-block');
    console.log(checkeduser.name);
    var container = `<h1 class="my-4">Welcome ${checkeduser.name}</h1>`;
    tagloginname.innerHTML = container;
}




function logout() {
    for (var i = 0; i < usersactive.length; i++) {
        if (usersactive[i].email === currentuser.email) {
            usersactive.slice(i, 1)
            sessionStorage.setItem("usersactive", JSON.stringify(usersactive));
        }
    }
    pagehome.classList.replace('d-block', 'd-none');
    pagelogin.classList.replace('d-none', 'd-flex');
}




function validate(user) {
    var regexusername = /\w{5}(\W|\s|\w)([A-z]|[0-9]){2,10}$/;
    var regexemail = /\w{5,20}@[A-z]{4,6}(\.)[A-z]{3}$/;
    var regexpassword = /(\w|\W |\s){8,}/;
    var error = {
        regexname: regexusername.test(user.name),
        regexEmail: regexemail.test(user.email),
        regexPassword: regexpassword.test(user.password)
    };
    console.log(error);
    return error;
}



function Isfound(users, email) {
    if (users.length == 0) {
        return null;
    }
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            return users[i];
        }
    }
    return null;
}

function clearForm() {
    username.value = '';
    email.value = '';
    password.value = '';
}

function clearFormlogin() {

    loginEmail.value = '';
    loginpassword.value = '';
}
