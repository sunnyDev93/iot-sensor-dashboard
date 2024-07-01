import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { SensorProvider } from './context/SensorContext';
import GlobalStyles from './styles/GlobalStyles';

const SensorList = lazy(() => import('./components/SensorList/SensorList'));

const Container = styled.div`
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const App: React.FC = () => (
  <SensorProvider>
    <GlobalStyles />
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <SensorList />
        </Suspense>
      </Container>
  </SensorProvider>
);

export default App;
