import axios from "axios"

// export function fetchUser() {
//   return (dispatch) => {
//     axios.get('/users')
//       .then(response) => {
//         dispatch({type: "SOME_CASE", payload: response.data})
//       })
//       .catch(err) => {
//         dispatch({type: "SOME_OTHER_CASE", payload: err})
//       });
//   };
// }

export function createUser(id, name) {
  return {
    type: 'create_user',
    payload: {
      id: id,
      name: name
    }
  };
}

export function deleteUser(id) {
  return {
    type: 'delete_user',
    payload: {
      id: id
    }
  };
}
