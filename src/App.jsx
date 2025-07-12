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
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    min-width: 375px;
`;

export default App
