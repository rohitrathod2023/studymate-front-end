// File: src/components/Layout.tsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import FloatingChatButton from './FloatingChatButton';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <FloatingChatButton />
    </div>
  );
};

export default Layout;