import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { api } from 'src/api/url';
import { useQuery } from '@tanstack/react-query';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import CircularProgress from '@mui/material/CircularProgress';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import type { UserProps } from '../user-table-row';



interface File {
  file: string;
  type: string;
  _id: string;
}

// ----------------------------------------------------------------------

export function ReportPostView() {
  const [userData, setUserData] = useState([]);
 
  const fetchUsers = async () => {
    const response = await api.get('/admin/getReportPost'); 
    setUserData(response?.data?.data)
    // return response.data;
    // console.log("123654798",response?.data?.data);
  }
    const { data: getReportPost, error, isLoading } = useQuery({
      queryKey: ['/admin/getReportPost'],
      queryFn: fetchUsers,  
      staleTime: 60000, // Cache for 60 seconds
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

    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Reported Post
        </Typography>
        
      </Box>
      <Card>

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
                  { id: 'reportedBY', label: 'ReportedBy' },
                  { id: 'itemName', label: 'Item Name' },
                  { id: '', label: ' ' },
                  { id: 'reportReason', label: 'Report Reason' },
                  { id: '', label: ' ' },
                  { id: 'report', label: 'Report Count',align: 'center' },
                  { id: '', label: ' ' },
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
          key={row?._id}
          row={row}
          selected={table.selected.includes(row?._id)}
          onSelectRow={() => table.onSelectRow(row?._id)}
        />
      ))
  ) : (
    <TableRow>
      <TableCell colSpan={8} align="center">
        <Typography variant="subtitle1" color="text.secondary">
          No reported posts available
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
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
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
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}