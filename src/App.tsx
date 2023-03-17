import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { LayoutContainer } from "./pages";
import { BoxContent, ContainerGrid, GlobalStyles } from "./styles";
import { ProductsProvider } from "./store/context/productsContext.jsx";
import { FiltersProvider } from "./store/context/filtersContext";
import { LayoutProvider } from "./store/context/layoutContext";
import { useLayout } from "./hooks/use-layout";
import { TestResponsive } from "./components";

interface ContainerLayoutProps {
  children: JSX.Element[];
}

const ContainerLayout = ({ children }: ContainerLayoutProps) => {
  const { state } = useLayout();

  return (
    <ContainerGrid isSidebarOpen={state.isSidebarOpen}>
      {children}
    </ContainerGrid>
  );
};

const App = () => {
  return (
    <FiltersProvider>
      <LayoutProvider>
        <ContainerLayout>
          {import.meta.env.VITE_TEST_RESPONSIVE && <TestResponsive />}
          <GlobalStyles />
          <Header />
          <Sidebar />
          <BoxContent>
            <ProductsProvider>
              <LayoutContainer />
            </ProductsProvider>
          </BoxContent>
        </ContainerLayout>
      </LayoutProvider>
    </FiltersProvider>
  );
};

export default App;
