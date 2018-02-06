import { observable} from 'mobx';

class MenuStore {
  @observable show;

  constructor() {
    this.show = false;
  }
}

export default new MenuStore();