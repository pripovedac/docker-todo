import React from 'react';
import './styles.scss';
import CloseIcon from '../../assets/CloseIcon';

const TodoList = ({ items, onStatusChange, onRemoval }) => {
  if (items.length) {
    return (
      <ul className="todo-list">
        {items.map((item, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={item.isdone}
                onChange={() => onStatusChange(index)}
              />

              <span>{item.value}</span>
            </label>

            <button onClick={() => onRemoval(index, item.id)}>
              <span>
                <CloseIcon />
              </span>
            </button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>Your awesome list will be displayed here!</p>;
  }
};

export default TodoList;
