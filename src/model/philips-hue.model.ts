//  IDK WHAT IM USING YET SO I MODELED ALMOST EVERYTHING
export interface IPhilipsHueState {
    config?: IBridgeConfig
    groups?: IHueGroup[]    //Groups of lights (rooms)
    lights?: IHueLight[]    //Individual lights
    resourcelinks?: IHueResourceLink[]  //Behaviors
    rules?: IHueRule[]
    scenes?: IHueScene[]
    schedules?: IHueSchedule[]
    sensors?: IHueSensor[]
}

export interface IBridgeConfig {
    bridgeid: string
    name: string
    UTC?: Date
    backup?:
    {
        status: string
        errorcode: number
    }
    gateway: string
    internetservices:
    {
        internet: string    //"Connected"
        remoteaccess: string
        swupdate: string
        time: string
    }
    ipaddress: string
    linkbutton: boolean
    localtime: Date
    mac: string
    modelid: string
    portalconnection: string
    portalservices: string
    portalstate: 
    {
        communication: string
        incoming: boolean
        outgoing: boolean
        signedon: boolean
    }
}

export interface IHueGroup {
    action:
    {
        alert: string
        bri: number
        colormode: string
        ct: number
        effect: string
        hue: number
        on: boolean
        sat: number
        xy:
        {
            [index: number]: number
        }
    },
    class: string
    lights: string[]
    name: string
    recycle: boolean
    sensors: string[]
    state:
    {
        all_on: boolean
        any_on: false
    }
    type: string
}

export interface IHueResourceLink {
    classid: number
    description: string
    links: string[]
    name: string
    owner: string
    recycle: boolean
    type: string
}

export interface IHueRule {
    actions:
    {
        address: string
        body: any
        method: string
    }[]
    conditions:
    {
        address: string
        operator: string
        value: string
    }[]
    created: Date
    lasttriggered: string
    name: string
    owner: string
    recycle: boolean
    status: string
    timestriggered: number
}

export interface IHueSensor {
    config:
    {
        on: boolean
        configured: boolean
        sunriseoffset: number
        sunsetoffset: number
    }
    manufacturername: string
    modelid: string
    name: string
    state:
    {
        daylight: boolean
        lastupdated: Date
    }
    swversion: string
    type: string
}
export interface IHueScene {
    appdata:
    {
        version: number,
        data: string
    }
    lastupdated: Date
    lights: string[]
    locked: boolean
    name: string
    owner: string
    picture: string
    recycle: boolean
    type: string
    version: number
}

export interface IHueSchedule {autodelete: false
    command: 
    {
        address: string
        body: any
        method: string
    }
    created: string
    description: string
    localtime: Date
    name: string
    recycle: true
    starttime: Date
    status: string
    time: Date
}

export interface IHueLight{
    id: string
    name: string
    capabiltiies: ILightCapabilities
    state: ILightState
    config: ILightConfig
    type: string
    modelid: string
    manufacturername: string
    productname: string
}

export interface ILightCapabilities {
    certified: boolean
    control: ILightControl
    streaming:
    { 
        renderer: boolean
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
    }
    colorgamuttype?: string
    ct:
    {
        min: number //Colour temperature?
        max: number
    },
    maxlumen: number    //Brightness
    mindimlevel: number
}

export interface ILightConfig {
    archetype: string
    direction: string
    function: string
    startup:
    {
        configured: boolean
        mode: string
    }
}

export interface ILightState {
    alert: string
    bri: number
    colormode?: string
    ct: number
    effect?: string
    hue: number
    mode: string
    on: boolean
    reachable: boolean
    sat: number
    xy:
    {
        [index: number]: number
    }
}