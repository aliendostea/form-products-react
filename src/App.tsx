import styled from "styled-components";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { Home } from "./pages";
import configureLayoutStore, {
  configureProductsStore,
  configureSearchProductsInput,
} from "./store/layout";
import { useStore } from "./store/store";
import { device, GlobalStyles } from "./styles";

interface ContainerProps {
  children: React.ReactNode;
  isSidebarOpen: boolean;
}

configureLayoutStore();
configureProductsStore();
configureSearchProductsInput();

export const ContainerGrid = styled.div<ContainerProps>`
  display: grid;
  grid-template-areas:
    "sidebar boxHeader boxHeader"
    "sidebar boxContent boxContent";
  /*  grid-template-rows: 8rem minmax(62rem, calc(100vh - 8rem));
  -ms-grid-rows: 8rem minmax(62rem, calc(100dvh - 8rem));
  grid-template-rows: 8rem minmax(62rem, calc(100dvh - 8rem)); */
  grid-template-rows: 8rem minmax(62rem, 1fr);
  column-gap: 2rem;
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.isSidebarOpen
      ? "grid-template-columns: 23rem 1fr;"
      : "grid-template-columns: 13rem 1fr;"};

  ${device.betweenPcAndTabPort2} {
    grid-template-areas:
      "boxHeader boxHeader"
      "boxContent boxContent";
  }
`;

export const BoxContent = styled.div`
  grid-area: boxContent;
  display: grid;
  z-index: 5;
  transition: all 0.2s ease-in-out;
`;

const App = () => {
  const [globalState] = useStore();

  return (
    <ContainerGrid isSidebarOpen={globalState.isSidebarOpen}>
      <GlobalStyles />
      <Header />
      <Sidebar />
      <BoxContent>
        <Home />
      </BoxContent>
    </ContainerGrid>
  );
};

export default App;
