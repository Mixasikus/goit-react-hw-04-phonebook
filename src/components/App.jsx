import { useState, useEffect } from 'react';
import Form from './PhoneBook/Form';
import Contacts from './PhoneBook/Contacts';
import Filter from './PhoneBook/Filter';
import { nanoid } from 'nanoid';
import { ContainerForm } from './PhoneBook/PhoneBook.module';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = data => {
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const namesArray = contacts.map(contact => {
      return contact.name;
    });

    if (namesArray.find(person => person === name)) {
      toast.error('Такое уже есть');
    } else {
      setContacts(state => [...state, contact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  // console.log(visibleContacts);
  return (
    <>
      <ContainerForm>
        <h1>Phonebook</h1>
        <Form onSubmit={addContacts} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <Contacts contacts={visibleContacts} onDeleteContact={deleteContact} />
      </ContainerForm>
      <ToastContainer autoClose={3000} />
    </>
  );
}
