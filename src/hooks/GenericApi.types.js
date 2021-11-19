
export type ResponseTypeOptions =
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'

export type URLNameOptions =
    | "genericApiPageArea"
    | "genericApiPageAreaWithType"
    | "genericApiSoa"
    | "genericApiCode"
    | "genericApiAreaByType"
    | "genericApiMetricAvailabilityByAreaType"
    | "genericApiMetricAvailabilityByArea"
    | "genericApiMetricSearch"
    | "genericApiMetricProps"
    | "genericApiMetricDocs"
    | "genericApiMetricAreas"
    | "genericApiChangeLogs"
    | "genericApiChangeLogsRecord"
    | "genericApiAnnouncementsRecord"
    | "genericApiAnnouncements"
    | "genericApiChangeLogsComponent"
    | "genericApiDatedChangeLogs"
    | "genericApiLogBanners"
    | "genericApiOpenApi"
    | "genericApiMetrics"

export type JsonPayload = {
    [string]: string | number | null
}
