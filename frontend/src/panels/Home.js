import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Panel,
  PanelHeader,
  RichCell,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  Text,
  Title,
  HorizontalCell,
} from "@vkontakte/vkui";
import { Icon28CheckCircleOutline } from "@vkontakte/icons";

import endpoints from "../endpoints";

const Home = ({ id, fetchedUser }) => {
  const [mails, setMails] = useState([]);
  const [page, setPage] = useState(4);

  const addInboxOnScroll = async () => {
    if (mails.length >= 20) {
      setMails(mails.slice(5, mails.length));
    }
    const { data } = await endpoints.getInbox(page * 5);
    setMails(mails.concat(data));
  };

  useEffect(() => {
    async function fetchData() {
      const data1 = await (await endpoints.getInbox(0, 10)).data;
      const data2 = await (await endpoints.getInbox(10, 10)).data;
      const data = data1.concat(data2);
      setMails(data);
    }

    fetchData();
    console.log(mails);
  }, []);

  return (
    <Panel
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      id={id}
    >
      <PanelHeader>
        <Div style={{ display: "flex", flexDirection: "row", columnGap: 40 }}>
          <Title>Тостер Почта</Title>
          <Button
            before={<Icon28CheckCircleOutline />}
            appearance="overlay"
            mode="outline"
          >
            Выделить все
          </Button>
        </Div>
      </PanelHeader>
      <Div style={{ display: "flex", flexDirection: "row" }}>
        <Group style={{ width: "15%" }}></Group>
        <Group
          onScroll={addInboxOnScroll}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "85%",
          }}
        >
          {mails?.map((mail) => (
            <RichCell key={mail.id} after={mail.dateTime}>
              <div style={{ display: "flex" }}>
                <Cell
                  style={{ width: "20%" }}
                  disabled
                  before={<Avatar src={mail.author.avatar} />}
                >
                  {mail.author.name}
                </Cell>
                <Div style={{ display: "flex" }}>
                  <Text weight="semibold" style={{ marginRight: 16 }}>
                    {mail.title.substr(0, 30)}...
                  </Text>
                  <Text>{mail.text.substr(0, 60)}...</Text>
                </Div>
              </div>
            </RichCell>
          ))}
        </Group>
      </Div>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Home;
