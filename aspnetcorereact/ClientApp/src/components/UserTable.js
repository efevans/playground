import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { List, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './Custom.css';
import httpClient from '../shared/HttpClient';

export async function loader({ request }) {
  const url = new URL(request.url);
  const pageNum = Number(url.searchParams.get("pagenum")) || 1;
  const resp = await getUsers({ page: pageNum });
  return { pageNum: pageNum, ...resp };
}

let renderCount = 0;

const UserTable = () => {
  const { users, totalCount, pageNum, pageSize } = useLoaderData();
  renderCount++;
  console.log(`UserTable rendered ${renderCount} times`);

  // eslint-disable-next-line eqeqeq
  const disallowPreviousLink = pageNum == 1;

  const maxPageCount = Math.ceil(totalCount / pageSize);
  // eslint-disable-next-line eqeqeq
  const disallowNextLink = pageNum == maxPageCount;

  const numberedPaginationLinks = getNumberedPaginationLinks(pageNum, maxPageCount);

  return (
    <div id="user-table">
      <div id="data-table">
        <strong>Users</strong>
        <List type='inline'>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`${user.id}`} >
                <div>{user.name}</div>
                <div>{user.posts?.length ?? 0}</div>
              </Link>
            </li>
          ))}
        </List>
      </div>
      <div>
        <Pagination size=''>
          <PaginationItem disabled={disallowPreviousLink}>
            <PaginationLink first tag={Link} to={'?pagenum=1'}>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={disallowPreviousLink}>
            <PaginationLink previous tag={Link} to={`?pagenum=${pageNum - 1}`}>
            </PaginationLink>
          </PaginationItem>
          {numberedPaginationLinks}
          <PaginationItem disabled={disallowNextLink}>
            <PaginationLink next tag={Link} to={`?pagenum=${pageNum + 1}`}>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={disallowNextLink}>
            <PaginationLink last tag={Link} to={`?pagenum=${maxPageCount}`}>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  );
}

async function getUsers({ page }) {
  // const myUrl = new URL('api/user', appBaseName);
  // if (page > 0) {
  //   myUrl.searchParams.append("pagenum", page);
  // }
  // const token = localStorage.getItem('token');
  // const resp = await axios.get(myUrl, { headers: { "Authorization": `Bearer ${token}` } });

  const client = httpClient;
  const resp = await client.get('api/users', { params: { pageNum: page } });
  return { users: resp.data.values, ...resp.data };
}

function getNumberedPaginationLinks(currentPage, totalPages) {
  const items = Array.from(Array(Math.min(5, totalPages)), (() => ({
    pageNum: 0,
    active: false
  })));

  let startPage = 0;
  if (totalPages <= 5 || currentPage <= 3) {
    startPage = 1;
  } else if (currentPage >= totalPages - 2) {
    startPage = totalPages - 4;
  } else { //In this case, we are not within 2 pages of either the start or end
    startPage = totalPages - 2;
  }

  for (let i = 0, y = startPage; i < items.length; i++, y++) {
    items[i].pageNum = y;

    // eslint-disable-next-line eqeqeq
    if (items[i].pageNum == currentPage) {
      items[i].active = true;
    }
  }

  return (<>
    {items.map((item) => {
      return (<PaginationItem key={item.pageNum} active={item.active}>
        <PaginationLink tag={Link} to={`?pagenum=${item.pageNum}`}>
          {item.pageNum}
        </PaginationLink>
      </PaginationItem>)
    })}
  </>)
}

export default UserTable;