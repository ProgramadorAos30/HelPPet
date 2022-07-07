import moment from "moment";
import "moment/locale/pt-br";

export function convertDate(date: string | number | Date) {
    return moment(date).utc(false).format("DD/MM/YYYY - HH:mm");
}