import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CardComponent from '../components/poster.js';
import '../styles/fotogallery.css'; // Import CSS for styling
import '../styles/poster.css';

const theaters = [
  { title: 'Oppenheimer', description: 'A gripping biographical drama about the father of the atomic bomb.', image: '/images/Oppenheimer.jpg' },
  { title: 'Monkey man', description: 'An intense action film about survival and redemption.', image: '/images/monkey.jpg' },
  { title: 'Kraven', description: 'A dark and thrilling tale of a legendary hunter.', image: '/images/kraven.webp' },
  { title: 'Venom Last Dance', description: 'A dramatic showdown between two powerful forces.', image: '/images/venom.jpg' },
  { title: 'Mufasa', description: 'The untold story of a beloved king’s rise to power.', image: '/images/mufasa.jpeg' },
  { title: 'Pixels', description: 'A nostalgic adventure where video games come to life.', image: '/images/pixels.jpg' },
  { title: 'Justice Leuage', description: 'A team of heroes unites to save the world from destruction.', image: '/images/justice.jpg' },
  { title: 'Jumanji', description: 'A high-stakes game that blurs the line between reality and fantasy.', image: '/images/jumanji.jpg' },
  { title: 'Black Adam', description: 'The origin story of a powerful anti-hero.', image: '/images/black.jpg' },
  { title: 'Rampage', description: 'A thrilling adventure featuring giant creatures wreaking havoc.', image: '/images/rampage.jpg' },
  { title: 'Godzilla x Kong: The New Empire', description: 'An epic clash between two legendary titans.', image: '/images/godzilla.jpg' },
];

export default function FotoGallery() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = theaters.filter(theater =>
    theater.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="fotogallery-container">
      <Typography variant="h3" className="fotogallery-title">
        FotoGallerij
      </Typography>
      <Typography variant="body1" className="fotogallery-description">
        Hier vind je een overzicht van films.
      </Typography>

      <Box className="fotogallery-search-bar">
        <TextField
          label="Zoek film"
          placeholder="Typ een filmtitel"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="fotogallery-search-input"
        />
      </Box>

      {/* Movie Grid */}
      <Box className="fotogallery-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((theater, index) => (
            <Box key={index} className="card-wrapper">
              <CardComponent
                title={theater.title}
                description={theater.description}
                image={theater.image}
              />
            </Box>
          ))
        ) : (
          <Typography variant="body1" className="fotogallery-no-results">
            Geen films gevonden.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
