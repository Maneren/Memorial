$("#submit-guest").click(guestLogin);

function guestLogin() {
    let username = $('#username');
    let password = $('#password');
    username.val("host");
    password.val("host");
}
