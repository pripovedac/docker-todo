import axios from 'axios';

const url = '/api/todos';

export const getAll = () => axios.get(url);

export const createTodo = (todo) => {
  return axios.post(url, todo);
};

export const deleteTodo = (id) => axios.delete(`${url}?id=${id}`);

export const updateTodoStatus = (id, status) =>
  axios.patch(`${url}?id=${id}`, {
    status,
  });
