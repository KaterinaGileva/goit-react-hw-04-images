import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css'

const styles = { form: { marginBottom: 20 } };

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onChangeInput = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  onSubmitForm = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
    toast.error('Enter a search term.');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.header}>
      <form className={css.form} onSubmit={this.onSubmitForm} style={styles.form}>
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
            value={this.state.searchQuery}
            onChange={this.onChangeInput}
          />
      </form>
      </header>
    );
  }
}



