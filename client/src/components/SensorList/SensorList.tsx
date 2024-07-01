import React, { useEffect, useState } from 'react';
import { Sensor, useSensorContext } from '../../context/SensorContext';
import SensorCard from '../SensorCard/SensorCard';
import { Header } from './SensorList.style';
import Button from '../atoms/Button';

const SensorList: React.FC = () => {
  const { sensors, showConnected, toggleShowConnected } = useSensorContext();
  const [filteredSensors, setFilteredSensors] = useState<Sensor[]>([]);
  
  useEffect(() => {
    setFilteredSensors(showConnected ? sensors.filter(sensor => sensor.connected) : sensors);
  }, [sensors])
  return (
    <div>
      <Header>
        <h1>IoT Sensor Dashboard</h1>
        <Button onClick={toggleShowConnected}>
          {showConnected ? 'Show All Sensors' : 'Show Connected Sensors'}
        </Button>
      </Header>
      {filteredSensors.length > 0 ? (
        filteredSensors.map((sensor, index) => (
          <SensorCard key={sensor.id + index} {...sensor} />
        ))
      ) : (
        <p>No sensors available</p>
      )}
    </div>
  );
};

export default SensorList;
