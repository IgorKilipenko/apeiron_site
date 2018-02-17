import { observable, computed, action} from 'mobx';
import {routesConfig} from '../routes'

class ScrollRouterStore {
    @observable scrollRoutes;
    
    constructor(component){
        this.scrollRoutes = {
            currentRoute: currentRoute,
            routes = scrollRoutes
        }
    }

    get getRoutes() {
        return routes;
    }
    @action set CurrentScrollRoute (component) {
        this.scrollRoutes.currentRoute 
    }
    
    @computed get CurrentScrollRoute() {
        return this.scrollRoutes.currentRoute;
    }

    @computed get getNextScrollRoute() {
        routes.findIndex((route) => route)
    }
    
    findComponentInsex(component) {
        return index = routesConfig.findIndex((route)=> component instanceof route.component)
    }

    findComponent(component) {
        return routesConfig.find((route) => component instanceof route.component)
    }
    
}