import axios from 'axios';
import { useLoaderData, useNavigation } from 'react-router-dom';
export async function loader({ request }) {
  //console.log('RoleList loader');
  const url = request.url.toLowerCase().replace('http://localhost:5173/', '');
  console.log(url);
  //  `${import.meta.env.VITE_API_URL}${request.url.replace('http://localhost:5173','')}`};
  let fullUrl;
  if (url.indexOf('/cors/') >= 0) {
    fullUrl = `${import.meta.env.VITE_API_URL}${url}`;
  } else {
    fullUrl = `http://localhost:5173/proxy/${url}`;
  }
  console.log('fullUrl', fullUrl);

  //console.log(request);
  const response = await axios.get(fullUrl);
  //console.log('RoleList loader response', response);
  return response;
}

const RoleList = () => {
  console.log('RoleList');
  const { data: roles } = useLoaderData();
  const { state } = useNavigation();
  console.log('RoleList, state', state);
  const isLoading = state === 'loading';
  if (isLoading) return <p>Loading ...</p>;
  //console.log('RoleList, roles=', roles);
  //console.log('loaderData', loaderData);
  return (
    <div>
      <h3>RoleList</h3>
      <ul>
        {roles.map((r) => (
          <li key={r.id}>
            {r.name} ({r.assignments.length} assignee
            {r.assignments.length !== 1 && 's'})
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RoleList;
