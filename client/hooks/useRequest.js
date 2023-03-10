import { useState } from 'react';
import axios from "axios";

const useRequest = ({ url, method, body }) => {
    const [errors, setErrors] = useState();

    const doRequest = async () => {
        try {
            setErrors(null);
            const res = await axios[method](url, body);
            return res.data;
        } catch (err) {
            setErrors(
                <div className='alert alert-danger'>
                    <h4>Oops...</h4>
                    <ul className="my-0">
                        {err.response.data.errors.map(e => <li key={e.message}>{e.message}</li>)}
                    </ul>
                </div>
            );
        }
    };

    return [doRequest, errors];
};

export default useRequest;