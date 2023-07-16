import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../utils/UserType";
import { useAppSelector } from "../app/hooks";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

function Update() {
    const selectUser = useAppSelector(state => state.action.user);
    const action = useAppSelector(state => state.action.type);
    let navigate = useNavigate();
    if (action === 'view' || action === 'none') {
        return <p>Error: Invalid Action</p>;
    }

    const user = selectUser;
    const [id, setId] = useState(user.id);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phno, setPhno] = useState(user.phno);
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const _user = { name, email, phno };
        if (action == 'add') {
            const res = await fetch('/users/',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(_user)
                });
            navigate('/');
        }
        if (action == 'edit') {
            const res = await fetch(`/users/${id}`,
                {
                    method: 'PUT',
                    mode: 'cors',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(_user)
                });

            const data = JSON.parse(await (await res.blob()).text());
            if (data.errror) {
                alert("User doesn't exists");
            } else {
                navigate('/');
            }

        }

    }

    return (
        <div className="container">
            <Link to="/" className="link">Back</Link>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label>
                            Name:
                        </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} pattern="[a-zA-Z]+" title="Name must contain only English alphabets" required/>
                    </div>
                    <div className="form-group">
                        <label>
                            Email
                        </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>
                            Phone Number
                        </label>
                        <input type="tel" value={phno} onChange={(e) => setPhno(e.target.value)} pattern="[0-9]{10}" title="Please enter a 10-digit phone number (digits 0-9 only)" required />
                    </div>
                    <div className="form-group">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Update