import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import doorImg from '../../public/imgs/doors.jpg';

const styles = theme => ({
  card: {
    //maxWidth: '100%',
    width: `calc(50% - ${theme.spacing.unit*3}px)`,
  },
  media: {
    height: 400,
  },
});

function ProductGroup(props) {
  const { classes } = props;
  return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={doorImg}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="headline" component="h2">
            Фурнитура для входных групп 
          </Typography>
          <Typography component="p">
          - Закладные для систем КП-45
          - Петли дверные
          - Ручки бугельные
          - Нажимные гарнитуры
          - Переходники
          - Кондукторы
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Детали
          </Button>
        </CardActions>
      </Card>
  );
}

ProductGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductGroup);