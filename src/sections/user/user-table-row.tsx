/* eslint-disable */

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
import { api,API_BASE_URL } from 'src/api/url';
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
  onUserblocked: (id: string) => void;
  onUserBlocked?: (user: UserProps) => void;
  onUserDeleted: (id: string) => void;
};
type UserBlockRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
  onUserUnblocked: (id: string) => void;
  onUserUnBlocked?: (user: UserProps) => void;
};




export function UserTableRow({ row, selected, onSelectRow,onUserblocked,onUserBlocked,onUserDeleted }: UserTableRowProps) {
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

 

  const handleDelete = useCallback(async (id: string) => {
    handleClosePopover();
    const confirmed = window.confirm("Are you sure you want to delete?");

    if (confirmed) {
      
        try {
            const response = await api.delete(`/admin/deleteAccountByAdmin?id=${id}`);
            
            if (response.status === 200) {
                alert("User deleted successfully!");
                onUserDeleted(row._id);
                
            } else {
                alert("Failed to delete the user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
        }
    }

}, [handleClosePopover]);


const handleblock = useCallback(async (id: string) => { 
  handleClosePopover();
  const confirmed = window.confirm("Are you sure you want to block this user?");
  if (!confirmed) return;

  try {
    const response = await api.put(`/admin/blockUserByAdmin?id=${id}`);
    console.log("response",response)
    
    if (response?.status === 200) {
      alert("User has been blocked successfully!");
      onUserblocked(row._id); 
      onUserBlocked?.(row);
    } else {
      alert("Failed to block the user. Please try again.");
    }
  } catch (error) {
    console.error(" Error blocking user:", error);
    alert("An error occurred while blocking the user.");
  }
}, [handleClosePopover,onUserblocked]);



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
            src={row.image ? `${API_BASE_URL}${row.image}` : undefined} 
            sx={{ width: 100, height: 100, border: "2px solid #ccc" }} 
          />
        </Box>

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
          <Avatar 
             alt={row.name} 
             src={row.image ? `${API_BASE_URL}${row.image}` : undefined} 
            />
            {/* {row.name} */}
          </Box>
        </TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell>{row.gender}</TableCell>

        {/* <TableCell>{row.role}</TableCell> */}

        <TableCell align="center">
          {row.email}
        </TableCell>

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
          <MenuItem onClick={() => handleblock(row?._id)} sx={{ color: 'error.main' }}>
          {/* <Iconify icon="mdi:block" /> */}
            Block 
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};
export function UserBlockRow({ row, selected, onSelectRow,onUserUnblocked,onUserUnBlocked }: UserBlockRowProps  ) {
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

  const handleblock = useCallback(async (id: string) => {
    handleClosePopover();
    const confirmed = window.confirm("Are you sure you want to unblock this user?");
    
    if (!confirmed) return;
  
    try {
      const response = await api.put(`/admin/unBlockUserByAdmin?id=${id}`);
      console.log("response",response)
      
        if (response?.status === 200) {
          alert("User has been unblocked successfully!");
          onUserUnblocked(row._id); 
          onUserUnBlocked?.(row);
        } else {
          alert("Failed to unblock the user. Please try again.");
        } 
      
    } catch (error) {
      console.error(" Error unblocking user:", error);
      alert("An error occurred while ubblocking the user.");
    }
  }, [handleClosePopover,onUserUnblocked]);

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
            src={row.image ? `${API_BASE_URL}${row.image}` : undefined}
            sx={{ width: 100, height: 100, border: "2px solid #ccc" }} 
            // imgProps={{ loading: "lazy" }}
          />
        </Box>

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
          <Avatar 
             alt={row.name} 
             src={row.image ? `${API_BASE_URL}${row.image}` : undefined} 
            />
            {/* {row.name} */}
          </Box>
        </TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell>{row.gender}</TableCell>

        <TableCell align="center">
          {row.email}
        </TableCell>


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

          <MenuItem onClick={() => handleblock(row?._id)} sx={{ color: 'error.main' }}>
          {/* <Iconify icon="mdi:check-circle" style={{ fontSize: '50px', color: 'green' }} /> */}
            UnBlock
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};
