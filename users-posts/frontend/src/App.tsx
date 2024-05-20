import { Button, Card, Typography, styled } from "@mui/material";

const Page = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const CustomCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 10rem 2rem ;
  height: 300px;
  width: 250px;
`;


const CustomButton = styled(Button)`
  font-weight: bold;
  text-transform: none;
  border-radius: 30px;
  padding: 10px 20px;
`;

const Message = styled(Typography)`
  display: flex;
  justify-content: center;
`;



function App() {
  return (
    <Page>
      <CustomCard>
        <Message>Hello world!</Message>
        <CustomButton>Click me!</CustomButton>
      </CustomCard>
    </Page>
  )
}

export default App
