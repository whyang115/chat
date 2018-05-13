import moment from "moment";
moment.locale("zh-cn");
export const time = {
  formatTime(time) {
    return moment(time).format("YYYY MMMM Do a h:mm:ss ");
  }
};
