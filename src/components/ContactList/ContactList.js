import React from 'react';
import s from './ContactList.module.css';

const ContactList = ({ visibleContacts, deleteContact }) => {
  return (
    <ul className={s.list}>
      {visibleContacts().map(({ name, number, id }) => (
        <li className={s.item} key={id}>
          <span className={s.contact}>
            {name}: {number}
          </span>
          <button className={s.button} onClick={() => deleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
