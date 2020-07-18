import React, { useState } from 'react';
import './styles.scss';
import * as api from '../../api';
import checkStatus from '../../utils/erros';

const EntryForm = ({ todos, setTodos }) => {
  const [value, setValue] = useState('');
  const resetValue = () => setValue('');

  const createTodo = async (todo) => {
    const res = await api.createTodo(todo);

    return checkStatus(
      res.status,
      'There was a problem with creating your todo.'
    );
  };

  const handleSubmit = async (event) => {
    const trimmedValue = value.trim();

    event.preventDefault();

    if (trimmedValue.length === 0) {
      alert('Empty todo is not fine by me.');
      return;
    }
    const { length, [length - 1]: last } = todos;

    const newTodo = {
      value: trimmedValue,
      id: length ? last.id + 1 : 0,
      isdone: false,
    };

    if (createTodo(newTodo)) {
      setTodos((prev) => {
        return [...prev, newTodo];
      });

      resetValue();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="entry-form">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buy groceries"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EntryForm;
