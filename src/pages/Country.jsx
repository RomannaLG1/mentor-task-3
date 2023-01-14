import { Section, Container, CountryInfo, Loader, Heading } from 'components';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from 'service/country-service';

export const Country = () => {
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { countryId } = useParams();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const fetchCoutry = async () => {
      try {
        const resp = await fetchCountry(countryId);
        setCountry(resp);
        console.log(resp);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoutry();
  }, [countryId]);
  const goBackLink = location?.state?.from ?? '/';
  return (
    <Section>
      <Container>
        <Link to={goBackLink}>go back</Link>
        {loading && <Loader />}
        {error && <Heading>Something wrong</Heading>}
        <CountryInfo country={country} />
      </Container>
    </Section>
  );
};
