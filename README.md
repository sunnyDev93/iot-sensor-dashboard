# IoT Sensor Dashboard

This project is a front-end UI displaying various Internet of Things (IoT) sensors based on data provided through a WebSocket endpoint. The UI shows the sensors with their current state, and the end-user can connect and disconnect the sensors. There is also a feature to toggle between viewing all sensors or only the connected sensors.

## Features

- Display the current state of IoT sensors.
- Connect and disconnect sensors.
- Toggle between viewing all sensors or only connected sensors.
- Real-time updates via WebSocket.

## Technologies Used

- HTML/CSS
- JavaScript
- React
- WebSocket

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/sunnyDev93/iot-sensor-dashboard.git
   cd iot-sensor-dashboard
2. **Install dependencies:**

    ```sh
    cd client
    npm install
    npm run dev

## Anwers

#### What aspect of this exercise did you find most interesting?
The most interesting aspect of this exercise was the real-time interaction with IoT sensors through WebSockets. This involves dynamic updates and state management, providing a hands-on experience with real-time data flow and user interface updates. Implementing features like connecting/disconnecting sensors and toggling the visibility of connected sensors adds practical complexity, making it a valuable learning opportunity in both frontend development and WebSocket communication.

#### What did you find most cumbersome to do?
The most cumbersome part was ensuring accurate and efficient state management when dealing with real-time updates from the WebSocket server. Keeping the state consistent and updating only the necessary parts without causing unnecessary re-renders was challenging, especially in a real-time context where data is continuously flowing. Managing different actions, such as connecting or disconnecting sensors and toggling the view, requires careful handling to ensure the application remains responsive and accurate.

#### How can we further improve the user experience?
1. **Enhanced Error Handling:**
Implement more robust error handling for WebSocket connections to manage disconnections, reconnections, and failed operations smoothly. Providing user feedback when actions fail can enhance the user experience.

2. **User Notifications:**
Add notifications or toasts to inform users when sensors are connected or disconnected. This immediate feedback can improve user engagement and clarity.

3. **Search and Filter Options:**
Implement search and filter options to allow users to quickly find specific sensors. This is particularly useful when dealing with a large number of sensors.

4. **Improved UI/UX Design:**
Invest in a more refined UI/UX design with consistent color schemes, intuitive layouts, and responsive design to ensure the application looks good and works well on all devices.

5. **Real-time Data Visualization:**
Add real-time charts or graphs to visualize sensor data trends. This can provide users with more insightful information at a glance.

6. **Configurable Refresh Rates:**
Allow users to configure the refresh rate for data updates. Some users may prefer faster updates, while others may opt for slower refresh rates to conserve bandwidth.

7. **Detailed Sensor Information:**
Provide detailed views or tooltips for each sensor, displaying historical data, trends, and other relevant metrics.
