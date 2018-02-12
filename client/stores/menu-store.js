import { observable} from 'mobx';

class MenuStore {
  @observable show;

  constructor() {
    this.show = false;
  }
}

export const menuItems = {
  main: {
    path: '/',
    title: 'Главная',
  },
  aboutCompany: {
    path: 'О-комании',
    title: 'О компании',
  },
  catalog: {
    path: 'Продукция',
    title: 'Продукция',
  },
  documentation: {
    path: 'Техническая-документация',
    title: 'Техническая документация',
  },
  newsletter: {
    path: 'Новости',
    title: 'Новости',
  },
  contacts: {
    path: 'Контакты',
    title: 'Контакты',
  },
  deliveries: {
    path: 'География-поставок',
    title: 'География поставок',
  }
}
export default new MenuStore();