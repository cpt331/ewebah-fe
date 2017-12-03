//======================================
//
//Name: update-car-request.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//Contributor: Steven Innes
//
//======================================

export class UpdateCarRequest {
    Id: number;
    Make: string;
    Model: string;
    CarCategory: string;
    Transmission: string;
    Status: string;
    LatPos: number;
    LongPos: number;
}