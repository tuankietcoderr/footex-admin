import { EBranchStatus } from "@/interface/IBranch"
import { EFieldStatus } from "@/interface/IField"
import { EGuestStatus } from "@/interface/IGuest"
import { EOwnerStatus } from "@/interface/IOwner"
import { EReportStatus } from "@/interface/IReport"
import { ETeamStatus } from "@/interface/ITeam"

const vilizeFieldStatus = (st: EFieldStatus) => {
    switch (st) {
        case EFieldStatus.ACTIVE:
            return "Đang trống"
        case EFieldStatus.BUSY:
            return "Đang được sử dụng"
        case EFieldStatus.MAINTAINING:
            return "Đang bảo trì"
        case EFieldStatus.DELETED:
            return "Đã xóa"
        default:
            return "Không xác định"
    }
}

const vilizeBranchStatus = (st: EBranchStatus) => {
    switch (st) {
        case EBranchStatus.ACTIVE:
            return "Đang hoạt động"
        case EBranchStatus.DELETED:
            return "Đã xóa"
        case EBranchStatus.BLOCKED:
            return "Đã khóa"
        default:
            return "Không xác định"
    }
}

const vilizeTeamStatus = (st: ETeamStatus) => {
    switch (st) {
        case ETeamStatus.ACTIVE:
            return "Đang hoạt động"
        case ETeamStatus.DELETED:
            return "Đã xóa"
        case ETeamStatus.BLOCKED:
            return "Đã khóa"
        default:
            return "Không xác định"
    }
}

const vilizeGuestStatus = (st: EGuestStatus) => {
    switch (st) {
        case EGuestStatus.ACTIVE:
            return "Đang hoạt động"
        case EGuestStatus.DELETED:
            return "Đã xóa"
        case EGuestStatus.BLOCKED:
            return "Đã khóa"
        default:
            return "Không xác định"
    }
}

const vilizeReportStatus = (st: EReportStatus) => {
    switch (st) {
        case EReportStatus.PENDING:
            return "Đang chờ duyệt"
        case EReportStatus.REJECTED:
            return "Đã từ chối"
        case EReportStatus.RESOLVED:
            return "Đã giải quyết"
        default:
            return "Không xác định"
    }
}

// const colorizeFieldStatus = (st: EFieldStatus) => {
//     switch (st) {
//         case EFieldStatus.ACTIVE:
//             return "text-green-500"
//         case EFieldStatus.BUSY:
//             return "text-red-400"
//         case EFieldStatus.MAINTAINING:
//             return "text-yellow-400"
//         case EFieldStatus.DELETED:
//             return "text-gray-400"
//         default:
//             return "text-gray-400"
//     }
// }

const vilizeOwnerStatus = (st: EOwnerStatus) => {
    switch (st) {
        case EOwnerStatus.ACTIVE:
            return "Đang hoạt động"
        case EOwnerStatus.DELETED:
            return "Đã xóa"
        case EOwnerStatus.PENDING:
            return "Đang chờ duyệt"
        case EOwnerStatus.REJECTED:
            return "Đã từ chối"
        case EOwnerStatus.BLOCKED:
            return "Đã khóa"
        default:
            return "Không xác định"
    }
}

export {
    vilizeFieldStatus,
    // colorizeFieldStatus,
    vilizeOwnerStatus,
    vilizeBranchStatus,
    vilizeTeamStatus,
    vilizeGuestStatus,
    vilizeReportStatus
}
