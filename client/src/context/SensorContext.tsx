import React, { createContext, useContext, useReducer, useEffect, useMemo, ReactNode } from 'react';
import { WebSocketService } from '../services/websocket';

export interface Sensor {
  id: string;
  name: string;
  connected: boolean;
  unit: string;
  value: string;
}

type SensorState = {
  sensors: Sensor[];
  showConnected: boolean;
};

type SensorAction = 
  | { type: 'SET_SENSORS'; sensors: Sensor }
  | { type: 'TOGGLE_SHOW_CONNECTED' }
  | { type: 'UPDATE_SENSOR'; sensors: Sensor; };

interface SensorContextType {
  sensors: Sensor[];
  connectSensor: (id: string) => void;
  disconnectSensor: (id: string) => void;
  toggleShowConnected: () => void;
  showConnected: boolean;
}

const SensorContext = createContext<SensorContextType | undefined>(undefined);

const initialState: SensorState = {
  sensors: [],
  showConnected: false,
};

const reducer = (state: SensorState, action: SensorAction): SensorState => {
  switch (action.type) {
    case 'SET_SENSORS':
      return { ...state, sensors: [...state.sensors, action.sensors] };
    case 'TOGGLE_SHOW_CONNECTED':
      return { ...state, showConnected: !state.showConnected };
    case 'UPDATE_SENSOR':
      
      return {
        ...state,
        sensors: state.sensors.map(sensor =>
          sensor.id === action.sensors.id ? { ...action.sensors } : sensor
        ),
      };
    default:
      return state;
  }
};

const webSocketService = new WebSocketService('ws://localhost:5000');

export const SensorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    webSocketService.connect();
    webSocketService.addListener((data: Sensor) => {
      dispatch({ type: 'SET_SENSORS', sensors: data });
    });

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  const connectSensor = (id: string) => {
    webSocketService.sendMessage({ command: 'connect', id });
    webSocketService.addListener((data: Sensor) => {
      dispatch({ type: 'UPDATE_SENSOR', sensors: data });
    })
  };

  const disconnectSensor = (id: string) => {
    webSocketService.sendMessage({ command: 'disconnect', id });
    webSocketService.addListener((data: Sensor) => {
      dispatch({ type: 'UPDATE_SENSOR', sensors: data });
    })
  };

  const toggleShowConnected = () => {
    dispatch({ type: 'TOGGLE_SHOW_CONNECTED' });
  };

  const value = useMemo(() => ({
    sensors: state.sensors,
    connectSensor,
    disconnectSensor,
    toggleShowConnected,
    showConnected: state.showConnected,
  }), [state.sensors, state.showConnected]);

  return (
    <SensorContext.Provider value={value}>
      {children}
    </SensorContext.Provider>
  );
};

export const useSensorContext = () => {
  const context = useContext(SensorContext);
  if (context === undefined) {
    throw new Error('useSensorContext must be used within a SensorProvider');
  }
  return context;
};
