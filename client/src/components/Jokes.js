import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  cardContainer: {
    marginTop: '2rem',
    display: 'grid',
    justifyContent: 'center',
    'grid-template-columns': '40% 40%',
    'grid-gap': '20px 20px'
  }
};

class Jokes extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    this.props.fetchJokes(token);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="jokes">
        <div className={classes.cardContainer}>
          {this.props.jokes.map(joke => {
            return (
              <Card className={classes.card} key={joke.id}>
                <CardContent>
                  <Typography variant="headline">{joke.setup}</Typography>
                  <Typography variant="subheading">{joke.punchline}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Jokes);
