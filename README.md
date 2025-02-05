# :star: BanglaQuest(client)

![Project Banner](https://i.ibb.co/KLkrZXC/bangla-Quest2.png)

---

## Live site :- [BanglaQuest](https://banglaquest-13b4d.web.app/)

:man:Admin Email tri1@g.com

- Password: 1234aA

## :book: About the project:-

> BanglaQuest is an web application that serves as a comprehensive resource for
> travelers. It provides detailed information on popular destinations in Bangladesh, helping users
> plan their trips effectively.With its rich content and user-friendly interface, planning your dream trip has never been easier!

## :rocket: Key Features:-

- Destination Guides: Comprehensive and detailed information on popular tourist destinations across Bangladesh
- Tailored Travel Packages: Provides diverse travel packages to suit different tourists' preferences.
- Expert Tour Guides: Travel confidently with knowledgeable and experienced guides.
- Travel Stories: Discover inspiring travel experiences shared by fellow tourists
- Share Your Stories: Tourists can create and share their own travel experiences to inspire others.
- Booking Tracking: Tourists can easily track the status of their bookings in real-time.
- Package Management: Admins can effortlessly add new travel packages to the platform, tailoring offerings to meet diverse tourist preferences.
- User Management: Admins have the ability to efficiently manage site users, ensuring a smooth and secure experience for all.
- Tour Guide Applications Management: Admins can review, approve, or reject applications from candidates aspiring to become tour guides, ensuring only qualified individuals are selected.
- Mobile-Friendly Design: Ensures accessibility and ease of use on any device, making it a reliable resource for travelers on the go.
- **Dashboard Features:**
  - **Tourist Dashboard**: View and manage booked trips, explore new destinations, and track travel history.
  - **Admin Dashboard**: Manage users, monitor site activities, update tourist information, and handle payments.
  - **Travel Guide Dashboard**: Manage tour schedules, interact with tourists, and provide travel recommendations.

## 🛠 Tech Stack

This project is built using modern web technologies:

- **Frontend**: React, React Router, React Hook Form, Swiper, Tailwind CSS, DaisyUI
- **State Management**: React Query
- **Authentication**: Firebase
- **Payment Integration**: Stripe
- **Animations & UI Enhancements**: Motion, React Confetti, React Simple Typewriter, React Toastify
- **Other Libraries**: Axios, Moment, React Icons, React Share, React Tabs, SweetAlert2
- **Build Tools**: Vite

## ⚙️ Installation & Setup

To run this project locally, follow these steps:

### Prerequisites

Ensure you have **Node.js** and **npm** installed on your system.

### Clone the Repository

```sh
git clone https://github.com/Rakib383/BanglaQuest-client.git
cd tourist-guide
```

### Install Dependencies

```sh
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```sh
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_PAYMENT_GATEWAY_PK=your_stripe_public_key
```

### Run the Development Server

```sh
npm run dev
```

This will start the application in development mode.

### Build for Production

```sh
npm run build
```
