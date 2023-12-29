import IBranch from "./IBranch"
import IGuest from "./IGuest"
import ITeam from "./ITeam"

export enum EReportStatus {
    PENDING = "pending",
    RESOLVED = "resolved",
    REJECTED = "rejected"
}

export default interface IReport<T = ITeam | IBranch | IGuest> {
    _id?: string
    reporter?: string | IGuest
    reported?: string | T
    reason: string
    title: string
    status?: EReportStatus
    refPath?: string
    createdAt?: Date
}
