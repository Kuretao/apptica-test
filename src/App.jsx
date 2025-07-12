import styled from "styled-components";
import Widget from "./components/Widget/Widget.jsx";

function App() {

  return (
      <Container>
          <Widget/>
      </Container>
  )
}

const Container = styled.div`
    width: 100%;
    min-width: 375px;
`;

export default App
