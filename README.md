Real-Time Ticketing System
Introduction

This project is a Real-Time Ticketing System designed to manage ticket sales and purchases dynamically. It features a user-friendly frontend and a robust backend, enabling real-time updates, multi-threaded processing, and priority-based customer interactions.
Key Features

    Interactive Frontend: Allows users to configure settings, monitor ticket statuses, and manage operations seamlessly.
    Concurrent Backend: Manages ticket transactions with threading and synchronization techniques.
    Real-Time Updates: Updates the user interface with real-time data using WebSocket or periodic polling.
    Additional Enhancements: Priority handling for VIP customers, analytics dashboards, and persistent storage for transaction history.

Prerequisites

To use this project, ensure the following are installed:

    Node.js (for the backend and frontend build tools)
    Git (for version control and collaboration)

Setup Guide
Clone the Repository

    Clone the repository and navigate into the project directory:

    git clone <repository-url>  
    cd real-time-ticketing-system  

Backend Setup

    Navigate to the backend folder:

cd backend  

Install required dependencies:

npm install  

Start the backend server:

    npm start  

    If using Java for backend:
        Compile the Java files using an IDE or a terminal.
        Run the main file (Main.java) to start the server.

Frontend Setup

    Move to the frontend directory:

cd frontend  

Install dependencies:

npm install  

Start the development server:

    npm run dev  

    Open your browser at http://localhost:3000 to view the application.

Usage Instructions

    Configuration:
        Use the settings section in the frontend to configure the ticket pool, number of vendors/customers, and other parameters.
        Start and stop operations using the control buttons.

    Real-Time Monitoring:
        View live ticket status updates in the status section.
        Monitor logs for transaction details in the log display area.

    Dynamic Management:
        Add or remove vendors and customers on the go using the user interface.

Testing
Manual Testing

    Simulate ticket operations using the GUI and test various scenarios, such as invalid inputs and exceeding ticket limits.

Automated Testing

    Run backend test cases located in the tests directory:

npm test  
