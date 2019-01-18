import { Type } from "@angular/compiler";

//  IDK WHAT IM USING YET SO I MODELED ALMOST EVERYTHING
export interface IPhilipsHueState {
    config?: IBridgeConfig,
    groups?: IHueGroup[],   //Groups of lights (rooms)
    lights?: IHueLight[],   //Individual lights
    resourcelinks?: IHueResourceLink[], //Behaviors
    rules?: any,
    scenes?: any,
    schedules?: any,
    sensors?: any
}

export interface IBridgeConfig {
    bridgeid: string,
    name: string,
    UTC?: Date,
    backup?:
    {
        status: string,
        errorcode: number
    },
    gateway: string,
    internetservices:
    {
        internet: string,   //"Connected"
        remoteaccess: string,
        swupdate: string,
        time: string,
    },
    ipaddress: string,
    linkbutton: boolean,
    localtime: Date,
    mac: string,
    modelid: string,
    portalconnection: string,
    portalservices: string,
    portalstate: 
    {
        communication: string,
        incoming: boolean,
        outgoing: boolean,
        signedon: boolean
    }
}

export interface IHueGroup {
    action:
    {
        alert: string,
        bri: number,
        colormode: string,
        ct: number,
        effect: string,
        hue: number,
        on: boolean,
        sat: number,
        xy:
        {
            [index: number]: number
        }
    },
    class: string,
    lights: string[],
    name: string,
    recycle: boolean,
    sensors: string[],
    state:
    {
        all_on: boolean,
        any_on: false,   
    },
    type: string
}

export interface IHueResourceLink {
    classid: number,
    description: string,
    links: string[],
    name: string,
    owner: string,
    recycle: boolean,
    type: string
}
export interface IHueLight{
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
    },
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
    }
}