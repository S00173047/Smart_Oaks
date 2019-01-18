import { Type } from "@angular/compiler";

export interface IPhilipsHueState {
    config?: any,
    groups?: any,
    lights?: ILight[],
    resourcelinks?: any,
    rules?: any,
    scenes?: any,
    schedules?: any,
    sensors?: any
}

export interface ILight{
    name: string,
    capabiltiies: ILightCapabilities,
    state: ILightState,
    config: ILightConfig,
    type: string,
    modelid: string,
    manufacturername: string,
    productname: string
}

export interface ILightCapabilities {
    certified: boolean,    //Certified by Philips
    control: ILightControl,
    streaming:
    { 
        renderer: boolean,
        proxy: boolean
    }
}

export interface ILightControl {
    colorgamut:
    {
        [index:number]: 
        {
            [index:number]: number[]
        }
    }[],
    colorgamuttype?: string,
    ct:
    {
        min: number, //Colour temperature?
        max: number
    },
    maxlumen: number, //Brightness
    mindimlevel: number
}

export interface ILightConfig {
    archetype: string,
    direction: string,
    function: string,
    startup:
    {
        configured: boolean,
        mode: string
    }
}

export interface ILightState {
    alert: string,
    bri: number,
    colormode?: string,
    ct: number,
    effect?: string,
    hue: number,
    mode: string,
    on: boolean,
    reachable: boolean,
    sat: number,
    xy:
    {
        [index: number]: number
    }[]
}