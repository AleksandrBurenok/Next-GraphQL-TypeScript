import {
  useCallback,
  useState,
  useRef,
  FormEventHandler,
  ChangeEventHandler,
} from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import { useOnClickOutside } from 'hooks';

import Search from 'icons/Search';
import Close from 'icons/Close';

import styles from './styles.module.scss';

const SearchForm = () => {
  const { messages } = useIntl();

  const { push } = useRouter();

  const searchRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleSearch = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const closeSearchField = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    push(`/search?q=${searchQuery}`);
  };

  useOnClickOutside(searchRef, closeSearchField);

  return (
    <div className={styles.wrapper}>
      {isOpen ? (
        <form onSubmit={handleSearchFormSubmit}>
          <div ref={searchRef} className={styles.fieldWrap}>
            <input
              type="text"
              className={styles.searchInput}
              onChange={onChange}
              placeholder={messages.typeSomething}
              value={searchQuery}
            />
            <button
              type="button"
              className={styles.btnClose}
              onClick={closeSearchField}
              aria-label={messages.close}
            >
              <Close />
            </button>
          </div>
        </form>
      ) : (
        <Search className={styles.iconSearch} onClick={handleToggleSearch} />
      )}
    </div>
  );
};

export default SearchForm;
