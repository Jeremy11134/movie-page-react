import React, { Component } from 'react';
import {
  Box,
  Grid,
  Rating,
  Snackbar,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardComponent from '../components/kaartrecensie.js';

const cards = [
  { title: 'Marvel Movie', description: 'An action-packed adventure...', image: '/images/550x825.jpg' },
  { title: 'Black Widow', description: 'A great place for movies...', image: '/images/black.jpg' },
  { title: 'Captain Marvel', description: 'A heartwarming love story...', image: '/images/captain.jpg' },
  { title: 'Civil War', description: 'Explore the far reaches of space...', image: '/images/civilwar.jpeg' },
  { title: 'Doomsday', description: 'Laugh out loud with this collection...', image: '/images/doomsday.jpg' },
  { title: 'Guardians of the Galaxy', description: 'Get ready to be scared...', image: '/images/guardians.jpg' },
  { title: 'Guardians of the Galaxy Vol. 3', description: 'Learn about the world...', image: '/images/guardians3.jpg' },
  { title: 'Ant Man', description: 'Join your favorite animated characters...', image: '/images/antman.jpg' },
  { title: 'Spiderman', description: 'Revisit the golden age of cinema...', image: '/images/spiderman.jpg' },
  { title: 'Black Panther', description: 'Discover hidden gems...', image: '/images/blackpanther.jpg' },
  { title: 'Guardians of the Galaxy Vol. 2', description: 'Experience non-stop action...', image: '/images/guadians2.jpg' },
];

class Recensie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: {},
      ratingCount: 0,
      couponCode: '',
      showNotification: false,
      showRatingsOverview: true,
      showMovies: true,
    };
  }

  componentDidMount() {
    const storedRatings = {};
    let count = 0;

    cards.forEach(({ title }) => {
      const rating = localStorage.getItem(`rating-${title}`);
      if (rating) {
        storedRatings[title] = parseFloat(rating);
        count++;
      }
    });

    this.setState({ ratings: storedRatings, ratingCount: count });
  }

  generateCouponCode = () => `SAVE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  handleRatingUpdate = (title, rating) => {
    this.setState((prevState) => {
      const newRatings = { ...prevState.ratings, [title]: rating };
      localStorage.setItem(`rating-${title}`, rating);
      const newCount = prevState.ratingCount + (prevState.ratings[title] ? 0 : 1);

      if (newCount % 3 === 0) {
        const couponCode = this.generateCouponCode();
        Object.keys(newRatings).forEach((key) => localStorage.removeItem(`rating-${key}`));
        return { ratings: {}, ratingCount: 0, couponCode, showNotification: true };
      }

      return { ratings: newRatings, ratingCount: newCount };
    });
  };

  handleCloseNotification = () => this.setState({ showNotification: false });

  toggleRatingsOverview = () => this.setState((prevState) => ({ showRatingsOverview: !prevState.showRatingsOverview }));
  toggleMovies = () => this.setState((prevState) => ({ showMovies: !prevState.showMovies }));

  render() {
    const { isMobile } = this.props;
    return (
      <Box className="recensie-container">
        <Grid container spacing={2}>
          {/* Movie List Section */}
          <Grid item xs={12} sm={8}>
            <Box className="movie-header">
              <Typography variant="h3">Recensie's</Typography>
              <Typography variant="body1">Plaats je recensie over de films die je hebt gezien.</Typography>
              {isMobile && (
                <IconButton onClick={this.toggleMovies}>
                  {this.state.showMovies ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              )}
            </Box>
            {(!isMobile || this.state.showMovies) && (
              <div className="movie-grid">
                {cards.map((card, index) => (
                  <CardComponent
                    key={index}
                    {...card}
                    onRatingUpdate={this.handleRatingUpdate}
                  />
                ))}
              </div>
            )}
          </Grid>

          {/* Rating Overview Section */}
          <Grid item xs={12} sm={4}>
            <Box className="rating-overview">
              <Box className="rating-overview-header">
                <Typography variant="h5">Rating Overview</Typography>
                {isMobile && (
                  <IconButton onClick={this.toggleRatingsOverview}>
                    {this.state.showRatingsOverview ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
              </Box>
              {(!isMobile || this.state.showRatingsOverview) && (
                Object.keys(this.state.ratings).length === 0 ? (
                  <Typography>No ratings yet.</Typography>
                ) : (
                  Object.entries(this.state.ratings).map(([title, rating], index) => (
                    <Box className="rating-item" key={index}>
                      <Typography variant="h6">{title}</Typography>
                      <Rating name="read-only" value={rating} precision={0.5} readOnly />
                    </Box>
                  ))
                )
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Notification Snackbar */}
        <Snackbar
          open={this.state.showNotification}
          autoHideDuration={6000}
          onClose={this.handleCloseNotification}
        >
          <MuiAlert onClose={this.handleCloseNotification} severity="success" className="snackbar">
            🎉 Congratulations! You've rated 3 movies! Use code: <strong>{this.state.couponCode}</strong>
          </MuiAlert>
        </Snackbar>
      </Box>
    );
  }
}

function ResponsiveRecensie(props) {
  const isMobile = useMediaQuery('(max-width:600px)');
  return <Recensie {...props} isMobile={isMobile} />;
}

export default ResponsiveRecensie;
