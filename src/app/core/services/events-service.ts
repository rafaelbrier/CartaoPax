import { EventEmitter } from "@angular/core";

interface breadCrumbEventModel {show: boolean;name?: string;}

export class EventsService {

    static interface

    private static emitters: {
        [BREADCRUMB: string]: EventEmitter<breadCrumbEventModel>
    } = {}

    static get (nameOfEvent:string): EventEmitter<breadCrumbEventModel> {
        if (!this.emitters[nameOfEvent])
            this.emitters[nameOfEvent] = new EventEmitter<breadCrumbEventModel>();
        return this.emitters[nameOfEvent];
    }

    constructor(){}

    findAll() {
    }
}