import {
  Container,
  SearchForm,
  Section,
  Heading,
  Loader,
  CountryList,
} from 'components';
import { useEffect, useState } from 'react';
import { fetchByRegion } from 'service/country-service';

export const CountrySearch = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    const fetchCoutry = async () => {
      try {
        const resp = await fetchByRegion(query);
        setCountries(resp);
        console.log(resp);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoutry();
  }, [query]);

  const handleSubmit = e => {
    setQuery(e);
  };
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSubmit} />
        {loading && <Loader />}
        {error && <Heading>Something wrong</Heading>}
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};
