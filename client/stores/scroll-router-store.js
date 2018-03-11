import { observable, computed, action } from 'mobx';
import routes from '../routes';
import { matchRoutes } from 'react-router-config'
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
    @observable branch;
    constructor(){
        super();
        this.route = this.updateRoute(super.location && (super.location.pathname || '/') )
        //console.log({routesConfig: this.getRoute})
    }
    

    @action
    updateRoute(pathname) {
        this.updateBranch(pathname);
        this.route = this.getBranch.routes.find(r => r.path === pathname);
        //console.log({branch})
        console.log({currentRoute: this.getRoute})
        console.log({branch: this.getBranch})
    }
    @action
    updateBranch(pathname) {
        this.branch = matchRoutes(routes, pathname)[0].route;
    } 

    @computed
    get getRoute() {
        return this.route;
    }
    @computed 
    get getBranch(){
        return this.branch;
    }
    @action
    goNext() {
        const route = this.getRoute;
        const current = this.getBranch.routes.findIndex(r => r.name === route.name);
        const next = this.getBranch.routes[this.getNextIndex(current)];

        console.log({current: route})
        
        if (!next.path.match(/:\w/) && next.path !== route.path){
            super.push(next.path)
            this.updateRoute(next.path);
        }
    }
    @action
    goPrev() {
        const route = this.getRoute;
        const current = this.getBranch.routes.findIndex(r => r.name === route.name);
        const prev = this.getBranch.routes[this.getPreviousIndex(current)];
        
        if (!prev.path.match(/:\w/) && prev.path !== route.path){
            console.log({current, prev})
            super.push(prev.path)
            this.updateRoute(prev.path);
        }
    }

    getNextIndex(current){
        //current = current + 1;
        //return ++current % this.getBranch.routes.length;
        if (current >= this.getBranch.routes.length -1) {
            return current
        }
        return ++current;
    }
    getPreviousIndex(current) {
        if (current === 0){
            //current = this.getBranch.routes.length;
            return 0;
        }
        return --current;
    }

}
