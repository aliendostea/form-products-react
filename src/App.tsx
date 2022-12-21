import { Header } from "./components/header";
import { Home } from "./pages";
import { BoxContainer, ContainerGrid, GlobalStyles } from "./styles";

/* interface ContainerProps {
  children: React.ReactNode;
} */

const App = () => {
  return (
    <ContainerGrid>
      <GlobalStyles />
      <Header />
      <BoxContainer>
        <Home />
      </BoxContainer>
    </ContainerGrid>
  );
};

export default App;
