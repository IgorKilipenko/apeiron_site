import { observable, computed, action } from 'mobx';
import { RouterStore } from 'mobx-react-router';

class UiStore {
    @observable _state = { menuOpened: false };

    @observable screenBreakpoint = null;

    @action
    setBreakpoint(breakpoint) {
        if (this.screenBreakpoint != breakpoint) {
            this.screenBreakpoint = breakpoint;
        }
    }
    @computed
    get getBreakpoint() {
        return this.screenBreakpoint;
    }

    @action
    setState(state) {
        if (typeof state == 'function') {
            state = state(this.state);
        }
        this._state = state;
    }

    @computed
    get state() {
        return this._state;
    }
}

export default UiStore;
