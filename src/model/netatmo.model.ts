//Weather station model
export interface INAWeatherStation {
    mark?: number
    measures?: {
        [mac_addr: string]: INAWeatherMeasure | INARainMeasure
    }
    module_types?: object
    modules?: string[]
    place?: {
        altitude: number
        location: number[]
        timezone: string
    }
    _id: string
}

export interface INAWeatherMeasure {
    type?: string[] //Result types
    res?: number[]  //Result values
}

export interface INARainMeasure {
    rain_24h?: number   //Rain in last day
    rain_60min?: number //Rain in last hour
    rain_live?: number  //Current rain
    rain_timeutc?: string //Timestamp of when it last rained
}

//Home Model
export interface INAHome {
    id: string
    name?: string
    altitude?: number
    coordinates?: number[]
    country?: string
    timezone?: string
    rooms: INARoom[];
    modules: INAModule[]
    therm_schedules?: INASchedule[]
    therm_setpoint_default_duration?: number
    schedules?: INASchedule[]
    therm_mode?: string
}

export interface INARoom {
    id: string
    name?: string
    type?: string
    module_ids?: string[]

    reachable?: boolean
    therm_measured_temperature?: number
    therm_setpoint_temperature?: number
    therm_setpoint_mode?: string
    therm_setpoint_start_time?: string
    therm_setpoint_end_time?: string
}

export interface INAModule {
    id: string
    type: string
    name?: string
    modules_bridged?: string
    room_id?: string
    bridge?: string

    reachable?: boolean
    rf_strength?: number
    wifi_strength?: number
    battery_level?: number
    battery_state?: string
}

export interface INASchedule {
    timetable: {
        zone_id: number
        m_offset: number
    }[]
    zones: INAZone[]
    name: string
    default: boolean
    away_temp: number
    hg_temp: number
    id: string
    selected: boolean
    type: string
}

export interface INAZone {
    name: string
    id: number
    type: number
    rooms_temp: {
        room_id: string
        temp: number
    }[]
}
