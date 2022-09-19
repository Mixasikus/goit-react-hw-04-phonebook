import useLocalStorage from 'components/Hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import { Forma } from './PhoneBook.module';

export default function Form({ onSubmit }) {
  const [name, setName] = useLocalStorage('name', '');
  const [number, setNumber] = useLocalStorage('number', '');

  const nameInputId = nanoid();
  const telInputId = nanoid();

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const pop = { name, number };
  const handleSubmit = e => {
    e.preventDefault();
    // console.log(onSubmit);
    // onSubmit(setName);
    // console.log(pop);
    onSubmit(pop);
    // this.props.onSubmit(this.state);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <Forma onSubmit={handleSubmit}>
        <label htmlFor={nameInputId}>
          Name
          <input
            type="text"
            name="name"
            id={nameInputId}
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label htmlFor={telInputId}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            id={telInputId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </Forma>
    </>
  );
}
