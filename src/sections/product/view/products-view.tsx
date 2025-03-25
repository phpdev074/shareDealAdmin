// import { useState, useCallback } from 'react';

// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Unstable_Grid2';
// import Pagination from '@mui/material/Pagination';
// import Typography from '@mui/material/Typography';
// import { api } from 'src/api/url';
// import { _products } from 'src/_mock';
// import { DashboardContent } from 'src/layouts/dashboard';
// import { useQuery } from '@tanstack/react-query';
// import { ProductItem } from '../product-item';
// import { ProductSort } from '../product-sort';
// import { CartIcon } from '../product-cart-widget';
// import { ProductFilters } from '../product-filters';

// import type { FiltersProps } from '../product-filters';

// // ----------------------------------------------------------------------

// const COLOR_OPTIONS = [
//   '#00AB55',
//   '#000000',
//   '#FFFFFF',
//   '#FFC0CB',
//   '#FF4842',
//   '#1890FF',
//   '#94D82D',
//   '#FFC107',
// ];

// const defaultFilters = {
//   price: '',
//   gender: [GENDER_OPTIONS[0].value],
//   colors: [COLOR_OPTIONS[4]],
//   rating: RATING_OPTIONS[0],
//   category: CATEGORY_OPTIONS[0].value,
// };

// export function ProductsView() {
//   const [sortBy, setSortBy] = useState('featured');

//   const [openFilter, setOpenFilter] = useState(false);


//   const [userData, setUserData] = useState([]);




//   const fetchUsers = async () => {
//     const response = await api.get('/api/product'); // Adjust API endpoint as needed
//     setUserData(response?.data?.data?.data)
//     // return response.data;
//     console.log("@@@@@",response?.data?.data?.data)
//   }
//     const { data: getAllPost, error, isLoading } = useQuery({
//       queryKey: ['api/product'],
//       queryFn: fetchUsers,  
//       staleTime: 60000, // Cache for 60 seconds
//     });


//   const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

//   const handleOpenFilter = useCallback(() => {
//     setOpenFilter(true);
//   }, []);

//   const handleCloseFilter = useCallback(() => {
//     setOpenFilter(false);
//   }, []);

//   const handleSort = useCallback((newSort: string) => {
//     setSortBy(newSort);
//   }, []);

//   const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
//     setFilters((prevValue) => ({ ...prevValue, ...updateState }));
//   }, []);

//   const canReset = Object.keys(filters).some(
//     (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
//   );



//   return (
//     <DashboardContent>
//       <Typography variant="h4" sx={{ mb: 5 }}>
//         Products
//       </Typography>

//       {/* <CartIcon totalItems={8} /> */}

//       <Box
//         display="flex"
//         alignItems="center"
//         flexWrap="wrap-reverse"
//         justifyContent="flex-end"
//         sx={{ mb: 5 }}
//       >
//         <Box gap={1} display="flex" flexShrink={0} sx={{ my: 1 }}>
//           {/* <ProductFilters
//             canReset={canReset}
//             filters={filters}
//             onSetFilters={handleSetFilters}
//             openFilter={openFilter}
//             onOpenFilter={handleOpenFilter}
//             onCloseFilter={handleCloseFilter}
//             onResetFilter={() => setFilters(defaultFilters)}
//             options={{
//               genders: GENDER_OPTIONS,
//               categories: CATEGORY_OPTIONS,
//               ratings: RATING_OPTIONS,
//               price: PRICE_OPTIONS,
//               colors: COLOR_OPTIONS,
//             }}
//           /> */}

//           {/* <ProductSort
//             sortBy={sortBy}
//             onSort={handleSort}
//             options={[
//               { value: 'featured', label: 'Featured' },
//               { value: 'newest', label: 'Newest' },
//               { value: 'priceDesc', label: 'Price: High-Low' },
//               { value: 'priceAsc', label: 'Price: Low-High' },
//             ]}
//           /> */}
//         </Box>
//       </Box>

//       <Grid container spacing={3}>
//         {_products.map((product) => (
//           <Grid key={product.id} xs={12} sm={6} md={3}>
//             <ProductItem product={product} />
//           </Grid>
//         ))}
//       </Grid>

//       <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
//     </DashboardContent>
//   );
// }
