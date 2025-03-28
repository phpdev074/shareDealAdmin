import { useState, useCallback } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { api } from 'src/api/url';
import { useQuery } from '@tanstack/react-query';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TableCell, TableRow } from '@mui/material';


import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import CircularProgress from '@mui/material/CircularProgress';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow,UserBlockRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';



// ----------------------------------------------------------------------

export function UserView() {
  const [userData,setUserData] = useState<UserProps[]>([])
  const [blockUserData,setBlockUserData] = useState<UserProps[]>([])
  const [value, setValue] = React.useState('1');

  const fetchUsers = async () => {
    const response = await api.get('/admin/getActiveUsers'); 
    
    setUserData(response?.data?.data)

  }

  const fetchBlockedUsers = async () => {
    const response = await api.get('/api/getBlockUsers'); 
    
    setBlockUserData(response?.data?.data?.totalBlockUsers)
 
  }

    const { data: getActiveUsers, error, isLoading } = useQuery({
      queryKey: ['/admin/getActiveUsers'],
      queryFn: fetchUsers,  
      staleTime: 60000, 
    });

    const { data: getBlockUsers, error:getBlockUsersError, isLoading:getBlockUsersisLoading } = useQuery({
      queryKey: ['/api/getBlockUsers'],
      queryFn: fetchBlockedUsers,  
      staleTime: 60000, 
    });


    const table = useTable();
    
    const [filterName, setFilterName] = useState('');
    if (isLoading) return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      > 
        <CircularProgress /> {/* This is the loader */}
      </Box>
    );
    const dataFiltered: UserProps[] = applyFilter({
      
      // inputData: _users,//-
      inputData: userData,//+
      inputBlockData: blockUserData,
      
      comparator: getComparator(table.order, table.orderBy),
      filterName,
    });

    
    const notFound = !dataFiltered.length && !!filterName;

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Users
        </Typography>
        
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'transparent' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ 
        '& .MuiTabs-indicator': { backgroundColor: 'black' } ,marginLeft: '40px',
      }}>
            <Tab style={{color:'black'}} label="Active User" value="1" />
            <Tab style={{color:'black'}} label="Blocked User" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _users.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'image', label: 'Image' },
                  { id: 'name', label: 'Name' },
              
                  { id: 'gender', label: 'Gender' },
                  // { id: 'role', label: 'Role' },
                  { id: 'email', label: 'Email', align: 'center' },
                  // { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
  {userData.length > 0 ? (
    userData
      .slice(
        table.page * table.rowsPerPage,
        table.page * table.rowsPerPage + table.rowsPerPage
      )
      .map((row: any) => (
        <UserTableRow
          key={row._id}
          row={row}
          selected={table.selected.includes(row._id)}
          onSelectRow={() => table.onSelectRow(row._id)}
          onUserblocked={(id) => {
            setUserData((prev) => prev.filter((u) => u._id !== id)); 
          }}
          onUserBlocked={(user: UserProps) => {
            setUserData((prev) => prev.filter((u) => u._id !== user._id));
            setBlockUserData((prev) => [...prev, user]); 
          }}
          onUserDeleted={(id) => {
            setUserData((prev) => prev.filter((u) => u._id !== id));
            setBlockUserData((prev) => prev.filter((u) => u._id !== id));
          }}
        />
      ))
  ) : (
    <TableRow>
      <TableCell colSpan={8} align="center">
        <Typography variant="subtitle1" color="text.secondary">
          No users available
        </Typography>
      </TableCell>
    </TableRow>
  )}

  <TableEmptyRows
    height={68}
    emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
  />

  {notFound && <TableNoData searchQuery={filterName} />}
</TableBody>
            </Table>
          </TableContainer>
        </Scrollbar></TabPanel>
        <TabPanel value="2">
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _users.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'image', label: 'Image' },
                  { id: 'name', label: 'Name' },
              
                  { id: 'gender', label: 'Gender' },
                  // { id: 'role', label: 'Role' },
                  { id: 'email', label: 'Email', align: 'center' },
                  // { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
  {blockUserData.length === 0 ? (
    <TableRow>
      <TableCell colSpan={5} align="center">
        <Typography variant="h6" color="textSecondary">
          No blocked user found
        </Typography>
      </TableCell>
    </TableRow>
  ) : (
    blockUserData
      .slice(
        table.page * table.rowsPerPage,
        table.page * table.rowsPerPage + table.rowsPerPage
      )
      .map((row: any) => (
        <UserBlockRow
          key={row._id}
          row={row}
          selected={table.selected.includes(row._id)}
          onSelectRow={() => table.onSelectRow(row._id)}
          onUserUnblocked={(id) => {
            setBlockUserData((prev) => prev.filter((u) => u._id !== id)); 
          }}
          onUserUnBlocked={(user: UserProps) => {
            setBlockUserData((prev) => prev.filter((u) => u._id !== user._id));
            setUserData((prev) => [...prev, user]); 
          }}
        />
      ))
  )}

  <TableEmptyRows
    height={68}
    emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
  />

  {notFound && <TableNoData searchQuery={filterName} />}
</TableBody>

            </Table>
          </TableContainer>
        </Scrollbar></TabPanel>
      </TabContext>
    </Box>

      <Card>
        

        <TablePagination
          component="div"
          page={table.page}
          count={_users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25,50,100]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    orderBy,
    rowsPerPage,
    selected,
    onSort,
    onSelectRow,
    onSelectAllRows,
    onResetPage,
    onChangePage,
    onChangeRowsPerPage,
  };
}

