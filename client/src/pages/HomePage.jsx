import React, { useContext } from 'react'; // useContext was missing
import SideBar from '../components/SideBar';
import ChatContainer from '../components/ChatContainer';
import RightSideBar from '../components/RightSideBar';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  // Get the currently selected user from global ChatContext
  const { selectedUser } = useContext(ChatContext);

  // Dynamically adjust grid columns based on whether a user is selected
  const gridCols = selectedUser
    ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' // Show three columns
    : 'md:grid-cols-2'; // Show only Sidebar and Chat if no user is selected

  return (
    <div className="w-full h-screen sm:px-[15%] sm:py-[5%]">
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative ${gridCols}`}
      >
        {/* Left Sidebar: User list, profile menu, and search */}
        <SideBar />

        {/* Chat Area: Displays messages and input */}
        <ChatContainer />

        {/* Right Sidebar: Displays selected user's profile or info */}
        <RightSideBar />
      </div>
    </div>
  );
};

export default HomePage;
