

function ForgetPassword() {
    return(
        <div className="apps-container">
            <div className="forget-password-container">
                <form action="#">
                    <label htmlFor="reset-email">Enter your email</label>
                    <input type="email" required placeholder="john@example.com" className="inputs em-pas" name="reset-email" />
                    <input type="submit" name="submit" className="inputs btn btn1" value="Send reset link" />
                </form>
            </div>
        </div>
    )
}


export default ForgetPassword