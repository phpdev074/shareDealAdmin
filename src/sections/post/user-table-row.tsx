/* eslint-disable */

import { useEffect,useState, useCallback } from 'react';
import axios from "axios";

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';
import Grid  from '@mui/material/Grid';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { format } from 'date-fns';
import { api,API_BASE_URL } from 'src/api/url';

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
  itemName: string;
  salePrice: string;
  name: string;
  image: string;
  images: string;
  discount: string;
  dealInfo:string;
  totalprice: string;
  storeName: string;
  endDate: string;
  description: string;
  country: string;
}

export type UserProps = {
  _id: string;
  name: string;
  files: string;
  
  content: string;
  createdAt: string;
};

type UserTableRowProps = {
  row: Post;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const closeImage = () => {
    setSelectedImage(null)
  }

  const handleDelete = useCallback(async (id: string) => {
      handleClosePopover();
      const confirmed = window.confirm("Are you sure you want to delete?");
  
      if (confirmed) {
          try {
              const response = await api.delete(`/api/post?id=${id}`);
              
              if (response.status === 200) {
                  alert("User deleted successfully!");
  
              } else {
                  alert("Failed to delete the user.");
              }
          } catch (error) {
              console.error("Error deleting user:", error);
              alert("An error occurred while deleting the user.");
          }
      }
  
  }, [handleClosePopover]);


  return (
    <>
         <Modal open={openModal} onClick={handleClosePopover}>
      <>
      <Icon
              icon="mdi:close"
              width="24"
              height="24"
              
              style={{
                position: "fixed", 
                top: "20px",      
                right: "20px",
                cursor: "pointer",
                zIndex: 1600   ,
                marginRight: '460px'       
              }}
              onClick={handleCloseModal}
            />
         <Box
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 700,
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "8px", 
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888", 
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555", 
    },
    scrollbarWidth: "none", 
  }}
>

    
    <Grid container spacing={3}>
      
      <Grid item xs={6}>
        <Typography fontWeight={600} mb={0.5}>Name:</Typography>
        <Box sx={{ border: "2px solid #ccc", p: 1,  }}>
          <Typography>{row.itemName || "N/A"}</Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Typography fontWeight={600} mb={0.5}>Category:</Typography>
        <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
          <Typography>{row.categoryId || "N/A"}</Typography>
        </Box>
      </Grid>
   
      <Grid item xs={6}>
        <Typography fontWeight={600} mb={0.5}>Price:</Typography>
        <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
          <Typography>{row.salePrice || "N/A"}</Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Typography fontWeight={600} mb={0.5}>Discount:</Typography>
        <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
          <Typography>{row.discount || "N/A"}</Typography>
        </Box>
      </Grid>
    
      <Grid item xs={6}>
        <Typography fontWeight={600} mb={0.5}>Deal Info:</Typography>
        <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
          <Typography>{row.dealInfo?.split("T")[0] || "N/A"}</Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Typography fontWeight={600} mb={0.5}>Total Price:</Typography>
        <Box sx={{ border: "2px solid #ccc", p: 1,  }}>
          <Typography>{row.totalprice || "N/A"}</Typography>
        </Box>
      </Grid>
    
      <Grid item xs={6}>
        <Typography fontWeight={600} mb={0.5}>Store Name:</Typography>
        <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
          <Typography>{row.storeName || "N/A"}</Typography>
        </Box>
      </Grid>
    
      <Grid item xs={6}>
      <Typography fontWeight={600} mb={0.5}>Location:</Typography>
      <Box sx={{ border: "2px solid #ccc", p: 1 }}>
        <Typography>{row.country || "N/A"}</Typography>
      </Box>
    </Grid>

      <Grid item xs={6}>
        <Typography fontWeight={600} mb={0.5}>End Date:</Typography>
        <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
          <Typography>{row.endDate?.split("T")[0] || "N/A"}</Typography>
        </Box>
      </Grid>

      <Grid item xs={6}>
        <Typography fontWeight={600} mb={0.5}>Description:</Typography>
        <Box sx={{ border: "2px solid #ccc",  p: 1,  }}>
          <Typography>{row.description || "N/A"}</Typography>
        </Box>
      </Grid>
    </Grid>
    
    <Typography fontWeight={600} mb={0.5}>Post Image:</Typography>
    <Box
  sx={{
    border: "2px solid #ccc",
    p: 1,
    display: "flex",
    justifyContent: "center",
    gap: 1,
    flexWrap: "wrap",
    minHeight: "110px", 
  }}
>
  {row.files && row.files.length > 0 ? (
    row.files.map((file: any, index: number) => {
      // Ensure the correct API URL
      const imageUrl = file.file.startsWith("http")
        ? file.file
        : `${API_BASE_URL}${file.file}`;

      return (
        <Box
          key={index}
          sx={{
            width: "100px",
            height: "100px",
            overflow: "hidden",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.5s ease-in-out", 
            "&:hover": {
            transform: "scale(1.1)", 
            // border: "3px solid #999",
          },
        }}
        onClick={() => setSelectedImage(imageUrl)} 
      >



          <img
            src={imageUrl}
            alt={`Post Image ${index + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "opacity 0.3s ease-in-out",
            }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.jpg"; 
              e.currentTarget.style.opacity = "1"; 
            }}
          />
        </Box>
      );
    })
  ) : (
    <Typography>No Images Available</Typography>
  )}
    </Box>

            
          </Box>
          </>
         </Modal>




      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            {/* <Avatar  src={`http://85.31.234.205:4004${row.files[0]?.file}`} /> */}
            {row.itemName}
          </Box>
        </TableCell>

        <TableCell>{row.categoryId}</TableCell>

        <TableCell>{row.salePrice}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>






      <Modal
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            backgroundColor: "white",
            p: 2,
            borderRadius: "10px",
            boxShadow: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
  sx={{
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
  }}
  onClick={() => setSelectedImage(null)}
>
  <Icon icon="mdi:close" width="24" height="24" />
</IconButton>
          <img
            src={selectedImage || ""}
            alt="Selected Post"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "8px",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>





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
          <MenuItem onClick={()=>{setOpenModal(true)}}>
            {/* <Iconify icon="solar:pen-bold" /> */}
            View Details
          </MenuItem>

          <MenuItem onClick={() => handleDelete(row?._id)} sx={{ color: 'error.main' }}>
            {/* <Iconify icon="solar:trash-bin-trash-bold" /> */}
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}