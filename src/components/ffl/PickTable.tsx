import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Form, AutoComplete, Popconfirm, Typography, Table } from "antd";
import { getLeagueDetail, updatePick } from "../../actions/ffl";
import type { EditableCellProps, Player } from "../../types/ffl";

interface TableProps {
  admin?: boolean;
  user?: any;
  league?: any;
}

const PickTable = ({ admin = false, user }: TableProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [editingKey, setEditingKey] = useState("");
  const [players, setPlayers] = useState([]);
  const [form] = Form.useForm();

  const league = useSelector((state: any) => state.ffl.selectedLeague);

  const currentWeek = useSelector((state: any) => state.ffl.week);
  const myTeam = league?.teams.find((team: any) => team?.owner?.username == user?.username);

  const { id } = router.query;

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    pick,
    index,
    children,
    position,
    ...restProps
  }) => {
    const myPlayers = players.filter((player: Player) => player.position.toUpperCase() == dataIndex?.toUpperCase());
    const inputNode = <AutoComplete options={myPlayers} filterOption={true} />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: false,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  useEffect(() => {
    // get league detail here
    dispatch(getLeagueDetail(id));
  }, []);

  useEffect(() => {
    const getPlayers = async () => {
      // fix this
      const response = await fetch("/api/ffl/player");
      const data = await response.json();
      const players = data.players;

      const autoCompleteVals = players.map((datum: Player) => {
        return {
          value: datum?.name,
          label: `${datum.name} - ${datum.team.toUpperCase()}`,
          position: datum.position == "Def" ? "defense" : datum.position,
        };
      });
      setPlayers(autoCompleteVals);
    };

    getPlayers();
  }, []);

  const save = async (key: React.Key) => {
    //alert("you clicked save!");
    //const id = key;
    const { qb, rb, wr, te, defense } = form.getFieldsValue();
    const pick: any = { qb, rb, wr, te, defense };
    pick.id = key;
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      await dispatch(updatePick(pick));
      // updates the league with new picks
      await dispatch(getLeagueDetail(id));
    }
    setEditingKey("");
  };

  const cancel = () => {
    setEditingKey("");
  };

  const isEditing = (pick: any) => pick.id === editingKey;
  const edit = (pick: any) => {
    form.setFieldsValue({ qb: "", ...pick });
    setEditingKey(pick.id);
  };

  const columns = [
    { title: "week", dataIndex: "week", editable: false },
    { title: "Quarterback", dataIndex: "qb", editable: true },
    { title: "Points", dataIndex: "qb_points", editable: false },
    { title: "Running Back", dataIndex: "rb", editable: true },
    { title: "Points", dataIndex: "rb_points", editable: false },
    { title: "Wide Receiver", dataIndex: "wr", editable: true },
    { title: "Points", dataIndex: "wr_points", editable: false },
    { title: "Tight End", dataIndex: "te", editable: true },
    { title: "Points", dataIndex: "te_points", editable: false },
    { title: "Defense", dataIndex: "defense", editable: true },
    { title: "Points", dataIndex: "defense_points", editable: false },

    {
      title: "Operations",
      dataIndex: "operations",
      render: (_: any, pick: any) => {
        const editable = isEditing(pick);
        return editable ? (
          <span>
            <a href="#" onClick={() => save(pick.id)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : pick.week == currentWeek || admin ? (
          <Typography.Link disabled={editingKey !== ""} onClick={() => edit(pick)}>
            Edit
          </Typography.Link>
        ) : (
          <Typography></Typography>
        );
      },
    },
  ];

  const mergedColumns = columns.map(column => {
    if (!column.editable) {
      return column;
    }

    return {
      ...column,
      onCell: (pick: any) => ({
        pick,
        dataIndex: column.dataIndex,
        title: column.title,
        editing: isEditing(pick),
      }),
    };
  });

  return (
    <div>
      {league ? (
        <>
          <h3>{league.name}</h3>
          <h4>My team: {myTeam.name}</h4>
          <Form form={form} component={false}>
            <Table
              dataSource={myTeam.picks}
              columns={mergedColumns}
              rowClassName="editable-row"
              size="small"
              bordered
              pagination={false}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
            ></Table>
          </Form>
        </>
      ) : (
        <h3>No league</h3>
      )}
    </div>
  );
};

export default PickTable;
