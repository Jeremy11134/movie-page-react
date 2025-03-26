import React, { Component } from 'react';
import CardComponent from '../components/kaart.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

class Vestigingen extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };

    this.theaters = [
      { name: 'Pathé Amsterdam', address: '123 Damrak, Amsterdam', phone: '+31 20 123 4567', email: 'info@patheamsterdam.nl' },
      { name: 'Kino Rotterdam', address: '456 Witte de Withstraat, Rotterdam', phone: '+31 10 987 6543', email: 'contact@kinorotterdam.nl' },
      { name: 'Louis Hartlooper Complex', address: '789 Tolsteegbrug, Utrecht', phone: '+31 30 555 6789', email: 'info@louis-hartlooper.nl' },
      { name: 'Filmhuis Den Haag', address: '101 Spui, Den Haag', phone: '+31 70 123 4567', email: 'contact@filmhuisdenhaag.nl' },
      { name: 'Natlab Eindhoven', address: '202 Kastanjelaan, Eindhoven', phone: '+31 40 678 1234', email: 'info@natlabeindhoven.nl' },
      { name: 'Lumiere Cinema Maastricht', address: '303 Bassin, Maastricht', phone: '+31 43 876 5432', email: 'info@lumierecinema.nl' },
      { name: 'Forum Groningen', address: '404 Nieuwe Markt, Groningen', phone: '+31 50 234 5678', email: 'contact@forumgroningen.nl' },
      { name: 'Trianon Leiden', address: '505 Breestraat, Leiden', phone: '+31 71 345 6789', email: 'info@trianonleiden.nl' },
      { name: 'LUX Nijmegen', address: '606 Mariënburg, Nijmegen', phone: '+31 24 456 7890', email: 'contact@lux-nijmegen.nl' },
    ];
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  getFilteredTheaters = () => {
    const { searchTerm } = this.state;
    return this.theaters.filter(
      (theater) =>
        theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        theater.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        theater.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  render() {
    const filteredTheaters = this.getFilteredTheaters();

    return (
      <Box className="vestigingen-container">
        <Typography variant="h3" className="vestigingen-title">
          Vestigingen
        </Typography>
        <Typography variant="body1" className="vestigingen-description">
          Ontdek onze bioscopen en hun locaties.
        </Typography>

        <Box className="vestigingen-search-bar">
          <TextField
            label="Zoek bioscoop"
            placeholder="Typ een plaatsnaam, bioscoopnaam of email"
            variant="outlined"
            fullWidth
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
            className="vestigingen-search-input"
          />
        </Box>

        <Box className="vestigingen-grid">
          {filteredTheaters.length > 0 ? (
            filteredTheaters.map((theater, index) => (
              <CardComponent
                key={index}
                name={theater.name}
                address={theater.address}
                phone={theater.phone}
                email={theater.email}
              />
            ))
          ) : (
            <Typography variant="body1" className="vestigingen-no-results">
              Geen bioscopen gevonden.
            </Typography>
          )}
        </Box>
      </Box>
    );
  }
}

export default Vestigingen;