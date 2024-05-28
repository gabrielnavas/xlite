import { Box, Paper, Typography, styled } from "@mui/material";
import React from "react";

const Container = styled(Paper)(({ theme }) => ({
  display: 'flex',
  width: '35rem',
  padding: '1rem 5rem',
  backgroundColor: theme.palette.background.paper,
  transition: 'background-color 0.3s',
  [theme.breakpoints.down('sm')]: {
    backgroundColor: 'black',
    padding: '1rem 1rem',
  },
}));

const IconContainer = styled('div')(() => ({
  margin: '1rem',
}));


const BoxCustom = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Header = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

type Props = {
  title: string;
  children: React.ReactNode
  icon: React.ReactElement
  bottomArea: React.ReactElement
}

const AuthPaper = ({ title, children, icon, bottomArea }: Props) => {
  return (
    <Container elevation={3}>
      <BoxCustom>
        <Header>
          <IconContainer>
            {icon}
          </IconContainer>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
        </Header>
        <Box sx={{ mt: 1 }}>
          {children}
        </Box>
        {bottomArea}
      </BoxCustom>
    </Container>
  )
}

export default AuthPaper;