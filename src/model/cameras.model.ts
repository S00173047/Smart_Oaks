export interface IMonitor {
    Monitor: IMonitorInfo,
    Monitor_Status: IMonitorStatus
}

export interface IMonitorInfo {
    Id: string,
    Name?: string,
    ServerId?: string,
    StorageId?: string,
}

export interface IMonitorStatus {
    AnalysisFPS?: number
    CaptureBandwidth?: number
    CaptureFPS?: number
    MonitorId: string
    Status?: string
}

export interface IEvent {
    Event: IEventDetails
}

export interface IEventDetails {
    Id: string,
    MonitorId?: string,
    DefaultVideo: string,
    Name: string,
    StartTime?: Date,
    EndTime?: Date
}