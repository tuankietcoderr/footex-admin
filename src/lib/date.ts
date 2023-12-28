import { format } from "date-fns"
import { vi } from "date-fns/locale"

export const formatVietnameseDate = (date: Date, formatter: string): string => {
    return format(new Date(date), formatter, { locale: vi })
}
