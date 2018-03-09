import { observable, computed, action } from 'mobx';
import { routesConfig, routes } from '../routes';
import { RouterStore } from 'mobx-react-router';

class _ScrollRouterStore extends RouterStore {
    @observable route;
    constructor(route) {
        super();
        this.routes = undefined;
        const routeNames = Object.keys(routesConfig);
        if (routeNames.length == 1) {
            this.routes = [{
                current: { name: routeNames[0], ...routesConfig[0] }
            }];
        } else {
            this.routes = []
            for (let i = 0; i < routeNames.length; i++) {
                //routesConfig[routeNames[i]].scrollOrder >= 0 &&
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
    }

    @action
    setCurrentRoute(route) {
        this.route = this.routes.find(r => route.component === r.current.component)
        console.log({currentRoute: this.routes})
    }

    @computed
    get getRoute() {
        return this.route;
    }
    @action
    goNext() {
        if (this.getRoute && this.getRoute.next) {
            super.push(this.route.next.path)
            this.setCurrentRoute(this.route.next);
        }
    }
    @action
    goPrev() {
        if (this.getRoute && this.getRoute.prev) {
            super.push(this.route.prev.path)
            this.setCurrentRoute(this.getRoute.prev);
        }
    }
}

//const scrollRouterStore = new ScrollRouterStore(Index);
//export default scrollRouterStore;
//export default ScrollRouterStore ;

export default class ScrollRouterStore extends RouterStore {
    @observable route;
    constructor(){
        super();
        this.routes = routes().filter(r => !r.path.match(/:[\w]+/gi) )
        this.route = null;
        console.log({routesConfig: this.routes})
    }
    

    @action
    setCurrentRoute(route) {
        this.route = this.routes.find(r => route.name === r.name)
        console.log({currentRoute: this.route})
    }

    @computed
    get getRoute() {
        return this.route;
    }
    @action
    goNext() {
        const route = this.getRoute;
        //if ( typeof route === "undefined" && route === null ) {
        //    console.warn(`Error. route is undefined`);
        //    return;
        //}
        console.log({currentRoute: this.route})
        const current = this.routes.findIndex(r => r.name === route.name);
        const next = this.routes[this.getNextIndex(current)];
        
        super.push(next.path)
        this.setCurrentRoute(next);
    }
    @action
    goPrev() {
        const route = this.getRoute;
        //if ( typeof route === "undefined" && route === null ) {
        //    console.warn(`Error. route is undefined`);
        //    return;
        //}
        
        const current = this.routes.findIndex(r => r.name === route.name);
        const prev = this.routes[this.getPreviousIndex(current)];
        
        super.push(prev.path)
        this.setCurrentRoute(prev);
    }

    getNextIndex(current){
        //current = current + 1;
        return ++current % this.routes.length;
    }
    getPreviousIndex(current) {
        if (current === 0){
            current = this.routes.length;
        }
        return --current;
    }

}
