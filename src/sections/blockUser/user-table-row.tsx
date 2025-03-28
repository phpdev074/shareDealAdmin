import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { format } from 'date-fns';

// ----------------------------------------------------------------------

interface File {
  file: string;
  type: string;
  _id: string;
}

interface Post {
  _id: string;
  userId: string;
  categoryId: string;
  name: string;
  gender: string;
  email: string;
  role: string;
  username: string;
}

export type UserProps = {
  _id: string;
  name: string;
  gender: string;
  email: string;
  // company: string;
  // avatarUrl: string;
  // isVerified: boolean; 
  // content: string;
  // createdAt: string;
};

type UserTableRowProps = {
  row: Post;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserBlockRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          {/* <Checkbox disableRipple checked={selected} onChange={onSelectRow} /> */}
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            {/* <Avatar  src={`/http://localhost:3039/${row.files[0]?.file}`} /> */}
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.username}</TableCell>

        <TableCell>{row.gender}</TableCell>

        {/* <TableCell>{format(new Date(row.createdAt), 'PPpp')}</TableCell> */}
        <TableCell>{row.role}</TableCell>
        <TableCell align="center">
          {row.email}
        </TableCell>

        {/* <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          {/* <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem> */}

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
          <Iconify icon="mdi:check-circle" style={{ fontSize: '50px', color: 'green' }} />
            UnBlock
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}