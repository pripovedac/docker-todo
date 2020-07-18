import React, { useState, useEffect } from 'react';
import './styles.scss';
import EntryForm from '../EntryForm';
import TodoList from '../TodoList';
import * as api from '../../api';
import checkStatus from '../../utils/erros';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const res = await api.getAll();
      if (checkStatus(res.status, 'Could not fetch your todos.')) {
        setTodos(res.data);
      }
    };

    getTodos();
  }, [setTodos]);

  const updateStatus = async (todo) => {
    const res = await api.updateTodoStatus(todo.id, !todo.isdone);

    return checkStatus(res.status, 'Could not update the status.');
  };

  const handleStatusChange = async (index) => {
    const selected = todos[index];

    if (updateStatus(selected)) {
      selected.isdone = !selected.isdone;

      setTodos((prev) => [...prev]);
    }
  };

  const deleteTodo = async (id) => {
    const res = await api.deleteTodo(id);
    return checkStatus(res.status, 'Could not delete your todo.');
  };

  const removeTodo = async (index, id) => {
    if (deleteTodo(id)) {
      todos.splice(index, 1);
      setTodos([...todos]);
    }
  };

  return (
    <div className="todo-app">
      <h1> Todo Note </h1>

      <EntryForm todos={todos} setTodos={setTodos} />

      <TodoList
        items={todos}
        onStatusChange={handleStatusChange}
        onRemoval={removeTodo}
      />
    </div>
  );
};

export default TodoApp;
