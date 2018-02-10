import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

import ProductGroup from "../../components/products/product-group";
import {menuUrls} from "../../components/menu/menu";

import doorImg from "../../public/imgs/doors.jpg";
import prodItemImg from "../../public/imgs/products/ruch.png";

const styles = theme => ({
    flexContainer: {
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        /*flexWrap: 'wrap',*/
        //[theme.breakpoints.down("sm")]: {
        //  flexDirection:'column',
        //  },
        height:'100%',
      }
})

const Index = props => (
    <section className={props.classes.flexContainer}>
    <ProductGroup to={menuUrls.products.for_doors} imgSrc={doorImg}>
      <Typography variant="headline" component="h2">
        Фурнитура для входных групп
      </Typography>
      <Typography component="p">
        - Закладные для систем КП-45 - Петли дверные - Ручки
        бугельные - Нажимные гарнитуры - Переходники - Кондукторы
      </Typography>
    </ProductGroup>
    <ProductGroup to={menuUrls.products.for_windows} imgSrc={doorImg}>
      <Typography variant="headline" component="h2">
        Фурнитура для окон
      </Typography>
      <Typography component="p">
        - Закладные для систем КП-45 - Петли дверные - Ручки
        бугельные - Нажимные гарнитуры - Переходники - Кондукторы
      </Typography>
      </ProductGroup>
  </section>
)

export default withStyles(styles, { withTheme: true })(Index);