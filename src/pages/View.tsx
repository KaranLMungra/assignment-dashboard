import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data)


function View() {
    const action = useAppSelector(state => state.action.type);
    if (action === 'view') {
        const user = useAppSelector(state => state.action.user);
        // const { data, error, isLoading } = useSWR(`/users/${id}`, fetcher)
        // if (error) return <p>Failed To Load Data</p>;
        // if (isLoading) return <p>Loading ...</p>;
        // const user = data;

        return (<div><Link className="link" to="/">Back</Link>
           <ul>
                <li>
                    <span className="li-head">ID: </span>
                    <span>{user.id}</span>
                </li>
                <li>
                    <span className="li-head">Name: </span>
                    <span>{user.name}</span>
                </li>
                <li>
                    <span className="li-head">Email: </span>
                    <span>{user.email}</span>
                </li>
                <li>
                    <span className="li-head">Phone Number: </span>
                    <span>{user.phno}</span>
                </li>
            </ul>
            </div>)
    }
    return (<p>Error: Invalid Action</p>);
}

export default View