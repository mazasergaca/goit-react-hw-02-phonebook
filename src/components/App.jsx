import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section';
import Filter from './Filter';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    let containName = false;
    this.state.contacts.forEach(item => {
      if (item.name === data.name) {
        containName = true;
      }
    });
    if (containName) {
      return alert(`${data.name} is already in contacts.`);
    }
    this.addContact(data);
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  visibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  addContact = ({ name, number }) => {
    const newContact = { name, number, id: nanoid() };
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    return (
      <div>
        <Section title={'Phonebook'}>
          <ContactForm onSubmit={this.formSubmitHandler} />
        </Section>
        <Section title={'Contacts'}>
          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <ContactList
            visibleContacts={this.visibleContacts}
            deleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}
