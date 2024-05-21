import { Avatar, Box, Paper, Typography, styled } from "@mui/material";
import React from "react";

const Container = styled(Paper)(({ theme }) => ({
  display: 'flex',
  width: '35rem',
  padding: '1rem 5rem',
  backgroundColor: theme.palette.background.paper,
  transition: 'background-color 0.3s',
}));

type Props = {
  title: string;
  children: React.ReactNode
  icon: React.ReactElement
  bottomArea: React.ReactElement
}

const AuthPaper = ({ title, children, icon, bottomArea}: Props) => {
  return (
    <Container elevation={3}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {icon}
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Box sx={{ mt: 1 }}>
          {children}
        </Box>
        { bottomArea }
      </Box>
    </Container>
  )
}

export default AuthPaper;