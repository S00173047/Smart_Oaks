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

export interface INAThermostat {
    firmware?: number
    last_bilan?: {
        y: number
        m: number
    }
    last_plug_seen: number
    last_setup: number
    last_status_store: number
    modules: INAModule[]
    place: {
        altitude: number
        city: string
        country: string
        improveLocProposed: true
        location: number[]
        timezone: string
        trust_location: boolean
    }
    plug_connected_boiler: number
    station_name: string
    type: string
    udp_conn: boolean
    wifi_status: number
    _id: string //MAC Address of device
}

export interface INAModule {
    anticipating: boolean
    battery_percent: number
    battery_vp: number
    event_history: {
        boiler_not_responding_events: { k: number }[]
        boiler_responding_events: { k: number }[]
    }
    firmware: number
    last_message: number
    last_therm_seen: number
    measured: {
        setpoint_temp: number
        temperature: number
        time: number
    }
    module_name: string
    rf_status: number
    setpoint: {
        setpoint_mode: string
    }
    therm_orientation: number
    therm_program_list: {
        default: boolean
        name: string
        program_id: string
        selected: boolean
        timetable: {
            m_offset: number
            id: number
        }[]
        zones: {
            id: number
            name: string
            temp: number
            type: number
        }[]
    }[]
    therm_relay_cmd: number
    type: string
    _id: string
}