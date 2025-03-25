import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Grid  from '@mui/material/Grid';
import { Icon } from '@iconify/react';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
// import { ShowToast } from '../../helpers/ToastService';
import { Iconify } from 'src/components/iconify';
import { api } from 'src/api/url';
// ----------------------------------------------------------------------


interface Post {
  _id: string;
  userId: string;
  categoryId: string;
  postReport: string;
  userReport: string;
  content: string;
  files: File[];
  fileType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  options: any[];
  votes: any[];
  location: {
    type: string;
    coordinates: [number, number];
  };
}


export type UserProps = {
  _id: string;
  name: string;
  role: string;
  username: string;
  image: string;
  phone: string;
  dob: string;
  address: string;
  bio: string;
  // company: string;
  // avatarUrl: string;
  // isVerified: boolean; 
  email: string;
  gender: string;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};





export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleblock = useCallback(() => {
     
  },[])

  const handleDelete = useCallback(async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete ?")
    // console.log("=======>>>>>>")
    if (confirmed) {
      // console.log(">>>>>>")
        const response = await api.delete(`/api/deleteAccount?id=${id}`);
        // console.log("@@@@@", response?.data?.data)
        
    }
    setOpenPopover(null);
}, []);


  return (
    <>
     <Modal open={openModal} onClick={handleClosePopover}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height:700,
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Close Icon */}
        <Icon
          icon="mdi:close"
          width="24"
          height="24"
          style={{ position: "absolute", top: 10, right: 10, cursor: "pointer" }}
          onClick={handleCloseModal}
        />

        {/* Profile Picture */}
        <Box display="flex" justifyContent="center" mb={4}>
          <Avatar
            alt={row.name}
            src={row.image }
            sx={{ width: 100, height: 100, border: "2px solid #ccc" }} 
          />
        </Box>

        {/* Profile Details */}
        {/* <Typography variant="h5" textAlign="center" fontWeight={600} mb={2}>
          Profile
        </Typography> */}

<Grid container spacing={3}>
  {/* First Row - Name & Username */}
  <Grid item xs={6}>
    <Typography fontWeight={600} mb={0.5}>Name:</Typography>
    <Box sx={{ border: "2px solid #ccc", p: 1,  }}>
      <Typography>{row.name || "N/A"}</Typography>
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Typography fontWeight={600} mb={0.5}>Username:</Typography>
    <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
      <Typography>{row.username || "N/A"}</Typography>
    </Box>
  </Grid>

  {/* Second Row - Email & Phone Number */}
  <Grid item xs={6}>
    <Typography fontWeight={600} mb={0.5}>Email:</Typography>
    <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
      <Typography>{row.email || "N/A"}</Typography>
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Typography fontWeight={600} mb={0.5}>Phone Number:</Typography>
    <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
      <Typography>{row.phone || "N/A"}</Typography>
    </Box>
  </Grid>

  {/* Third Row - Date of Birth & Gender */}
  <Grid item xs={6}>
    <Typography fontWeight={600} mb={0.5}>Date of Birth:</Typography>
    <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
      <Typography>{row.dob?.split("T")[0] || "N/A"}</Typography>
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Typography fontWeight={600} mb={0.5}>Gender:</Typography>
    <Box sx={{ border: "2px solid #ccc", p: 1,  }}>
      <Typography>{row.gender || "N/A"}</Typography>
    </Box>
  </Grid>

  {/* Fourth Row - Address (Full Width) */}
  <Grid item xs={12}>
    <Typography fontWeight={600} mb={0.5}>Address:</Typography>
    <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
      <Typography>{row.address || "N/A"}</Typography>
    </Box>
  </Grid>

  {/* Fifth Row - Bio (Full Width) */}
  <Grid item xs={12}>
    <Typography fontWeight={600} mb={0.5}>Bio:</Typography>
    <Box sx={{ border: "2px solid #ccc", p: 1,  }}>
      <Typography>{row.bio || "N/A"}</Typography>
    </Box>
  </Grid>
</Grid>


        
      </Box>
     </Modal>





      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          {/* <Checkbox disableRipple checked={selected} onChange={onSelectRow} /> */}
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={row.image} />
            {/* {row.name} */}
          </Box>
        </TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell>{row.gender}</TableCell>

        {/* <TableCell>{row.role}</TableCell> */}

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
          <MenuItem onClick={() => {setOpenModal(true)}} >
          {/* <img src="https://visualpharm.com/assets/806/Details%20Popup-595b40b75ba036ed117d9405.svg" alt="" style={{height:'22px',marginRight:'-5px'}}/> */}
            View Details
          </MenuItem>

          <MenuItem
            onClick={() => handleDelete(row?._id)} sx={{ color: 'error.main' }}
          >
            {/* <Iconify icon="solar:trash-bin-trash-bold" /> */}
            Delete
          </MenuItem>
          <MenuItem onClick={handleblock} sx={{ color: 'error.main' }}>
          {/* <Iconify icon="mdi:block" /> */}
            Block 
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};
export function UserBlockRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>

<Modal open={openModal} onClick={handleClosePopover}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height:700,
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Close Icon */}
        <Icon
          icon="mdi:close"
          width="24"
          height="24"
          style={{ position: "absolute", top: 10, right: 10, cursor: "pointer" }}
          onClick={handleCloseModal}
        />

        {/* Profile Picture */}
        <Box display="flex" justifyContent="center" mb={4}>
          <Avatar
            alt={row.name}
            src={row.image }
            sx={{ width: 100, height: 100, border: "2px solid #ccc" }} 
          />
        </Box>

        {/* Profile Details */}
        {/* <Typography variant="h5" textAlign="center" fontWeight={600} mb={2}>
          Profile
        </Typography> */}

<Grid container spacing={3}>
  {/* First Row - Name & Username */}
  <Grid item xs={6}>
    <Typography fontWeight={600} mb={0.5}>Name:</Typography>
    <Box sx={{ border: "2px solid #ccc", p: 1,  }}>
      <Typography>{row.name || "N/A"}</Typography>
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Typography fontWeight={600} mb={0.5}>Username:</Typography>
    <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
      <Typography>{row.username || "N/A"}</Typography>
    </Box>
  </Grid>

  {/* Second Row - Email & Phone Number */}
  <Grid item xs={6}>
    <Typography fontWeight={600} mb={0.5}>Email:</Typography>
    <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
      <Typography>{row.email || "N/A"}</Typography>
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Typography fontWeight={600} mb={0.5}>Phone Number:</Typography>
    <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
      <Typography>{row.phone || "N/A"}</Typography>
    </Box>
  </Grid>

  {/* Third Row - Date of Birth & Gender */}
  <Grid item xs={6}>
    <Typography fontWeight={600} mb={0.5}>Date of Birth:</Typography>
    <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
      <Typography>{row.dob?.split("T")[0] || "N/A"}</Typography>
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Typography fontWeight={600} mb={0.5}>Gender:</Typography>
    <Box sx={{ border: "2px solid #ccc", p: 1,  }}>
      <Typography>{row.gender || "N/A"}</Typography>
    </Box>
  </Grid>

  {/* Fourth Row - Address (Full Width) */}
  <Grid item xs={12}>
    <Typography fontWeight={600} mb={0.5}>Address:</Typography>
    <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
      <Typography>{row.address || "N/A"}</Typography>
    </Box>
  </Grid>

  {/* Fifth Row - Bio (Full Width) */}
  <Grid item xs={12}>
    <Typography fontWeight={600} mb={0.5}>Bio:</Typography>
    <Box sx={{ border: "2px solid #ccc", p: 1,  }}>
      <Typography>{row.bio || "N/A"}</Typography>
    </Box>
  </Grid>
</Grid>


        
      </Box>
     </Modal>



      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          {/* <Checkbox disableRipple checked={selected} onChange={onSelectRow} /> */}
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
          <Avatar alt={row.name} src={row.image} />
            {/* {row.name} */}
          </Box>
        </TableCell>

        <TableCell>{row.username}</TableCell>

        <TableCell>{row.gender}</TableCell>

        {/* <TableCell>{format(new Date(row.createdAt), 'PPpp')}</TableCell> */}
        {/* <TableCell>{row.role}</TableCell> */}
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
          <MenuItem onClick={() => {setOpenModal(true)}} >
          {/* <img src="https://visualpharm.com/assets/806/Details%20Popup-595b40b75ba036ed117d9405.svg" alt="" style={{height:'22px',marginRight:'-5px'}}/> */}
            View Details
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
          {/* <Iconify icon="mdi:check-circle" style={{ fontSize: '50px', color: 'green' }} /> */}
            UnBlock
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};
