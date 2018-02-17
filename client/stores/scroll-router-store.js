import { observable, computed, action } from 'mobx';
import { routesConfig } from '../routes';
import Index from '../views/home/index';

class ScrollRouterStore {
    @observable route;

    constructor(component) {
        this.routes = undefined;
        const routeNames = Object.keys(routesConfig);
        if (routeNames.length == 1) {
            this.routes = [{
                current: { name: routeNames[0], ...routesConfig[0] }
            }];
        } else {
            this.routes = []
            for (let i = 0; i < routeNames.length; i++) {
                this.routes.push({
                    current: { name: routeNames[i], ...routesConfig[routeNames[i]] },
                    prev:
                        i > 0
                            ? {
                                  name: routeNames[i - 1],
                                  ...routesConfig[routeNames[i-1]]
                              }
                            : undefined,
                    next: i < routeNames.length-1 ? { name: routeNames[i + 1], ...routesConfig[routeNames[i+1]] } : undefined
                });
            }
        }
        this.setCurrentRoute(component);
    }

    @action
    setCurrentRoute(component) {
        this.route = this.routes.find((route) => component === route.current.component)
    }

    @computed
    get getRoute() {
        return this.route;
    }
    @action
    goNext() {
        if (this.getRoute && this.getRoute.next) {
            this.setCurrentRoute(this.route.next.component);
        }
    }
    @action
    goPrev() {
        if (this.getRoute && this.getRoute.prev) {
            this.setCurrentRoute(this.getRoute.prev.component);
        }
    }
}

const scrollRouterStore = new ScrollRouterStore(Index);
export default scrollRouterStore;
export { ScrollRouterStore };
