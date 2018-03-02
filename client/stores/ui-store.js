import { observable, computed, action } from 'mobx';
import { RouterStore } from 'mobx-react-router';

class UiStore {
    @observable menuOpened = false;

    @observable screenBreakpoint = null;

    @action
    setBreakpoint(breakpoint) {
        if (this.screenBreakpoint !== breakpoint) {
            this.screenBreakpoint = breakpoint;
        }
    }
    @computed
    get getBreakpoint() {
        return this.screenBreakpoint;
    }
}

export default UiStore;
