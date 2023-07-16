import { useAppDispatch } from "../../app/hooks";
import { UserType } from "../../utils/UserType";
import { useNavigate } from "react-router-dom";
import { add, edit, view } from "./userSlice";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export function User() {
  const { data, error, isLoading } = useSWR('/users/', fetcher)
  const [isDeleting, setIsDeleting] = useState(false);
  const [ids, setIDs] = useState([-1]);

  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  function handleAdd() {
    dispatch(add());
    return navigate('/user/update');
  }

  function handleView(_user: UserType) {
    dispatch(view(_user));
    return navigate('/user/view');
  }

  function handleEdit(_user: UserType) {
    dispatch(edit(_user));
    return navigate('/user/update');
  }
  function handleDelete(_user: UserType) {
    setIsDeleting(true);
    setIDs(ids.concat([_user.id]));
    fetch(`/users/${_user.id}`, {
      method: 'DELETE',
      mode: 'cors',
    }).then((res) => {
      return navigate('/');
    })
  }

  if (error) return <p>Failed To Load Data</p>;
  if (isLoading) return <p>Loading ...</p>;
  const { users } = data;
  console.log(users);

  return (
    <div className="container">
      <div className="insider-container">
        <h1>User Table</h1>
        <button onClick={handleAdd}>Add</button>
      </div>
      <div>
        {users.length !== 0 ?
          (<table>
            <thead>
              <tr className="rounded-header">
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UserType) => (
                isDeleting && ids.find((v) => v === user.id) ?
                 <></>
                  :
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td className="action-buttons button-group">
                      <button onClick={() => handleView(user)}>View</button>
                      <button onClick={() => handleEdit(user)}>Edit</button>
                      <button onClick={() => handleDelete(user)}>Delete</button>
                    </td>
                  </tr>
              )
              )}
            </tbody>
          </table>)
          : <p>No Data</p>}
      </div>
    </div>
  )
}
