import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

import { useEffect, useState } from "react";
import useApi from "../hook/useApi";

const Home = () => {
  const [list, setList] = useState<any>({});
  const [disabled, setDisabled] = useState<any>(true);
  const [roleOptions, setRoleOptions] = useState<any>({});
  const { useGetUser, useGetRole, useLogout } = useApi();

  const handleLoad = async () => {
    const userList = await useGetUser();
    setList(userList);
    const role = await useGetRole();
    setRoleOptions(role);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const columns = [
    {
      id: "no",
      name: "No",
      align: "center",
      alignItem: "center",
      render: (_r: any, i: number) => i + 1,
    },
    {
      id: "email",
      name: "E-mail",
      align: "center",
      alignItem: "center",
      render: (r: any, _i: number) => r?.email,
    },
    {
      id: "email",
      name: "Phone Number",
      align: "center",
      alignItem: "start",
      render: (r: any, _i: number) => r?.phone_number,
    },
    {
      id: "role_id",
      name: "Role",
      align: "center",
      alignItem: "center",
      render: (r: any, _i: number) => (
        <Select defaultValue={r?.role_id} id="role_id" disabled={disabled}>
          {roleOptions?.data?.map((option: any) => (
            <MenuItem value={option?.role_id}>{option?.role_name}</MenuItem>
          ))}
        </Select>
      ),
    },
    {
      id: "",
      name: "",
      align: "center",
      alignItem: "start",
      render: (_r: any, _i: number) => (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <EditIcon onClick={() => setDisabled(!!!disabled)} />
          <DeleteSweepIcon />
        </Stack>
      ),
    },
  ];
  return (
    <Container>
      <Box
        sx={{
          marginY: 5,
          padding: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h2">User</Typography>
        <Button
          onClick={() => useLogout()}
          variant="contained"
          color="error"
        >
          Logout
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table
          //  sx={{ minWidth: 650 }}
          size="small"
        >
          <TableHead>
            <TableRow>
              {columns?.map((col: any) => (
                <TableCell id={col?.id} align={col?.align}>
                  {col?.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {list?.data?.map((r: any, i: number) => (
              <TableRow>
                {columns?.map((col: any) => (
                  <TableCell id={col?.id} align={col?.alignItem}>
                    {col?.render(r, i)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Home;
