import axios from "axios";

const endpoints = {
  getInbox: (skip = 0, take = 5) =>
    axios.get("https://vk-final-web.herokuapp.com/inbox", {
      params: {
        skip: skip,
        take: take,
      },
    }),
};

export default endpoints;
