import { Container, CountryList, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { getCountries } from 'service/country-service';

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCoutry = async () => {
      try {
        const resp = await getCountries();
        setCountries(resp);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoutry();
  }, []);

  return (
    <Section>
     
      <Container>
        {loading && <Loader/>}
        {error && <Heading>Something wrong</Heading>}
        {countries && <CountryList countries={countries}/>}
       
    
      </Container>
    </Section>
  );
};
