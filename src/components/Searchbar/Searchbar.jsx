import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css'

const styles = { form: { marginBottom: 20 } };

export function Searchbar ({ onSubmit })  {
  
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeInput = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const onSubmitForm = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
    toast.error('Enter a search term.');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

    return (
      <header className={css.header}>
      <form className={css.form} onSubmit={onSubmitForm} style={styles.form}>
        <button type="submit"
                className={css.button}>

          <ImSearch style={{ marginRight: 8 }} />

        </button>
        
         <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={onChangeInput}
          />
      </form>
      </header>
    );
  }


  Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

