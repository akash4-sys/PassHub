import { useState } from 'react';
import useRequest from '../../hooks/useRequest';

const SignUp = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [doRequest, errors] = useRequest({
        url: 'api/users/signup',
        method: 'post',
        body: { email, password }
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        doRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label for="Email">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)}
                    type="email" className="form-control" placeholder="Type your email here" />
            </div>
            <div className="form-group">
                <label for="Password">Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)}
                    type="password" className="form-control" placeholder="Type your password here" />
            </div>
            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
};

export default SignUp;