import { EventEmitter } from "@angular/core";

export interface breadCrumbEventModel {show: boolean;name?: string;}; //"BREADCRUMB"
export interface commentCountEventModel {id: string, commentCount: number}; //"COMMENTCOUNT"

export class EventsService {

    private static emitters: {
        [nameOfEvent: string]: EventEmitter<any>,
    } = {};

    static get<T>(nameOfEvent:string): EventEmitter<T> {
        if (!this.emitters[nameOfEvent])
            this.emitters[nameOfEvent] = new EventEmitter<T>();
        return this.emitters[nameOfEvent];
    }

    constructor(){}

    findAll() {
    }
}