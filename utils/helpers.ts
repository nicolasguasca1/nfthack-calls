import moment from "moment";

export const formatDate = (timestamp: number) => {
  return moment(timestamp).format("h:mm A");
};
