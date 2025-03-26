import { useState,useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { _tasks, _posts, _timeline } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { api } from 'src/api/url';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';



// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {

  const [blockUser, setBlockUsers] = useState([])
  const [monthlyUserData, setMonthlyUserData] =useState<number[]>([]);





  const fetchUsers = async () => {
    const response = await api.get('/admin/getAllUsers'); // Adjust API endpoint as needed
    return response.data;
  }
 

  const fetchBlockUsers = async () => {
    const response = await api.get('/admin/getblockUserByAdmin'); // Adjust API endpoint as needed
    // return response.data;
    setBlockUsers(response?.data?.data.totalUsers)
    // console.log("response===",response)

  }
  const fetchPost = async () => {
    const response = await api.get('/admin/getAllPost'); // Adjust API endpoint as needed
    return response.data;
    // console.log("==================>>>>>",response?.data?.data?.totalPosts)
  }
  const fetchActivePosts = async () => {
    const response = await api.get('/admin/getActivePost'); // Adjust API endpoint as needed
    return response.data;
  }

  const fetchMonthlyUserData = async () => {
    const response = await api.get('/admin/getUsersByMonth'); 
    return response.data;
  };


  const { data: getAllUsers, error, isLoading } = useQuery({
    queryKey: ['/admin/getAllUsers'],
    queryFn: fetchUsers,
    staleTime: 60000, 
  });
 
  const { data: blockUsers , error: blockUsersError, isLoading: blockUsersLoading } = useQuery({
    queryKey: ['/admin/getBlockUsers'],
    queryFn: fetchBlockUsers,
    staleTime: 60000,
  });
  const { data: getAllPost , error: getAllPostError, isLoading: getAllPostLoading } = useQuery({
    queryKey: ['/admin/getAllPost'],
    queryFn: fetchPost,
    staleTime: 60000,
  });
  const { data: getActivePost, error: getActivePostError, isLoading:getActivePostLoading } = useQuery({
    queryKey: ['/admin/getActivePost'],
    queryFn: fetchActivePosts,
    staleTime: 60000, 
  });
  const { data: monthlyUsers, error: monthlyUsersError, isLoading: monthlyUsersLoading} = useQuery({
    queryKey: ['/admin/getUsersByMonth'],
    queryFn: fetchMonthlyUserData,
    staleTime: 60000, 
  });

  useEffect(() => {
    if (monthlyUsers) {
      
      const userCounts = Array(12).fill(0); 
      monthlyUsers.forEach((entry:any) => {
        userCounts[entry._id.month - 1] = entry.userCount; 
      });
      setMonthlyUserData(userCounts); 
    }
  }, [monthlyUsers]);
  if (isLoading ||  blockUsersLoading || getAllPostLoading || monthlyUsersLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
 
  const totalUsers = getAllUsers?.data?.length || 0
  const totalBlockedUsers = Number(blockUser) || 0
  const totalActiveUsers = totalUsers - totalBlockedUsers;
  const totalPosts = getAllPost?.data?.totalPosts.length || 0
  const totalActivePost = getActivePost?.data?.totalPosts || 0


  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Users"
            percent={2.6}
            total={totalUsers}
            icon={<img alt="icon" src="/assets/icons/glass/user.svg" />}
           
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Active users"
            percent={-0.1}
            total={totalActiveUsers}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Total Deals"
            percent={2.8}
            total={totalPosts}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Active Deals"
            percent={3.6}
            total={totalActivePost}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Current visits"
            chart={{
              series: [
                { label: 'Total Users', value: totalUsers },
                { label: 'Active Users', value: totalActiveUsers },
                { label: 'Total Deals', value: totalPosts },
                { label: 'Active Deals', value: totalActivePost },
              ],
              colors:['#332247','#9549f2','#eda71a','#e34b30']
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="User Gain"
            // subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Total User', data: monthlyUserData  },
                
              ],
              colors:['#332247']
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
              series: [
                { name: '2022', data: [44, 55, 41, 64, 22] },
                { name: '2023', data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentSubject
            title="Current subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AnalyticsNews title="News" list={_posts.slice(0, 5)} />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite
            title="Traffic by site"
            list={[
              { value: 'facebook', label: 'Facebook', total: 323234 },
              { value: 'google', label: 'Google', total: 341212 },
              { value: 'linkedin', label: 'Linkedin', total: 411213 },
              { value: 'twitter', label: 'Twitter', total: 443232 },
            ]}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
