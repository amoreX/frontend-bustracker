# Frontend - Real-Time Bus Tracking App

This is the frontend client for a real-time bus tracking system. It allows users to:

- Create new trips
- View trip details on a map
- Track live bus locations using WebSocket
- Simulate driver GPS updates (with backend + driver script)

---

## 🚀 Tech Stack

- **React**
- **React Leaflet (Map)**
- **Socket.IO Client**
- **Tailwind CSS**
- **Lucide Icons**
- **Axios / ShadCn**

---

## 🧩 Core Components
🧭 Trip List Panel

    Displays a list of all available trips.

    Users can create new trips by specifying coordinates.

    Built using clean UI components with smooth framer-motion animations.

    Selecting a trip allows tracking its location on the map.

🗺️ Live Map Viewer

    Built with React Leaflet, the map component shows the bus route and real-time location.

    On selecting a trip, the bus icon on the map updates dynamically to show live movement based on simulated GPS data.

    Uses a sleek and intuitive map interface with pan/zoom functionality.

🔌 WebSocket Integration

    Integrates with a backend using Socket.IO for real-time location updates.

    The frontend listens for GPS coordinates emitted by the driver simulation and updates the map instantly.

🎮 Driver Simulation Support

    Although handled by an external script, the frontend reacts to data sent by a driver simulator which mimics real bus movement by sending GPS data at regular intervals.

🧵 Trip Creation Modal

    A modal popup allows users to add new trips by entering the trip ID and coordinates.

    UI interactions are smooth and visually polished using ShadCN UI and Lucide icons.



