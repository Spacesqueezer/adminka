import "./App.css";
import SideMenu from "./components/sidemenu/SideMenu";
import ContentArea from "./components/contentarea/ContentArea";
import styled from "styled-components";

function App() {
  const App = styled.div`
    text-align: center;
    width: 100vw;
    height: 100vh;
    display: flex;
  `;
  return (
    <App>
      <SideMenu />
      <ContentArea />
    </App>
  );
}

export default App;
