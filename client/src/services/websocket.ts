export interface SensorData {
    id: string;
    name: string;
    connected: boolean;
    unit: string;
    value: string;
  }
  
  type Listener = (data: SensorData) => void;
  
  export class WebSocketService {
    private socket: WebSocket | null = null;
    private url: string;
    private listeners: Listener[] = [];
  
    constructor(url: string) {
      this.url = url;
    }
  
    connect() {
      this.socket = new WebSocket(this.url);
      this.socket.onopen = () => console.log('WebSocket connected');
      this.socket.onmessage = (event) => {
        try {
          const data: SensorData = JSON.parse(event.data);
          this.listeners.forEach(listener => listener(data));
        } catch (error) {
          console.error('Error parsing data:', error);
        }
      };
      this.socket.onerror = (error) => console.error('WebSocket error', error);
      this.socket.onclose = () => console.log('WebSocket disconnected');
    }
  
    sendMessage(message: object) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
      }
    }
  
    addListener(listener: Listener) {
      this.listeners.pop();
      this.listeners.push(listener);
    }
  
    removeListener(listener: Listener) {
      this.listeners = this.listeners.filter(l => l !== listener);
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
    }
  }
  