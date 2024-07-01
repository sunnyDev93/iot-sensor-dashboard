import React from 'react';
import { useSensorContext } from '../../context/SensorContext';
import { useDebounce } from '../../hooks/useDebounce';
import { Card } from './SensorCard.style';
import ToggleSwitch from '../atoms/ToggleSwitch';

interface SensorProps {
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: string;
}

const SensorCard: React.FC<SensorProps> = ({ id, name, connected, unit, value }) => {
  const { connectSensor, disconnectSensor } = useSensorContext();
  const debouncedConnect = useDebounce(connectSensor, 300);
  const debouncedDisconnect = useDebounce(disconnectSensor, 300);

  const handleToggle = () => {
    if (connected) {
      debouncedDisconnect(id);
    } else {
      debouncedConnect(id);
    }
  };

  return (
    <Card>
      <div>
        <h3>{name}</h3>
        <p>{value} {unit}</p>
      </div>
      <ToggleSwitch checked={connected} onChange={handleToggle} />
    </Card>
  );
};

export default SensorCard;