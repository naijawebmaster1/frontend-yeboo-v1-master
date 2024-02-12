import React, { useState, useEffect } from 'react';
import Header from '../../components/block-components/header/header';
import InputFieldWithIcon from '../../components/block-components/input/inputFieldWithIcon';
import { AiOutlineClose } from 'react-icons/ai';
import { TbFlag3, TbSend } from 'react-icons/tb';
import { FiPhoneCall } from 'react-icons/fi';
import styles from '../../assets/CSS/messages.module.css';
import user1 from '../../assets/images/profile-1.jpg';
import user2 from '../../assets/images/profile-2.jpg';
import user3 from '../../assets/images/profile-3.jpg';
import user4 from '../../assets/images/profile-4.jpg';
import user5 from '../../assets/images/profile-5.jpg';
import user6 from '../../assets/images/profile-6.jpg';
import user7 from '../../assets/images/profile-7.png';
import user8 from '../../assets/images/profile-8.png';
import user9 from '../../assets/images/profile-9.jpg';
import user10 from '../../assets/images/profile-10.jpg';
import online from '../../assets/images/online.png';
import vip from '../../assets/images/vipbadge.png';
import badge from '../../assets/images/verification.png';

const users = [
  {
    id: 1,
    name: 'Cutie Johnson',
    imgSrc: user1,
    onlineImgSrc: online,
    message: 'Lorem ipsum dolor sit amet...',
    time: '12:00am',
    notificationCount: 10,
  },
  {
    id: 2,
    name: 'Ella Gold',
    imgSrc: user2,
    onlineImgSrc: online,
    message: "Another user's message...",
    time: '09:00pm',
    notificationCount: 0,
  },
  {
    id: 3,
    name: 'Queen Sash',
    imgSrc: user3,
    onlineImgSrc: online,
    message: "User Three's message...",
    time: '11:30am',
    notificationCount: 3,
  },
  {
    id: 4,
    name: 'Cynthia Morgan',
    imgSrc: user4,
    onlineImgSrc: badge,
    message: "User Four's message...",
    time: '03:45pm',
    notificationCount: 0,
  },
  {
    id: 5,
    name: 'Kelly Mitch',
    imgSrc: user5,
    onlineImgSrc: badge,
    message: "User Five's message...",
    time: '07:15pm',
    notificationCount: 1,
  },
  {
    id: 6,
    name: 'Janet Brown',
    imgSrc: user6,
    onlineImgSrc: badge,
    message: "User Six's message...",
    time: '10:00am',
    notificationCount: 2,
  },
  {
    id: 7,
    name: 'Gwen Doe',
    imgSrc: user7,
    onlineImgSrc: vip,
    message: "User Seven's message...",
    time: '02:30pm',
    notificationCount: 0,
  },
  {
    id: 8,
    name: 'Lizzy Tim',
    imgSrc: user8,
    onlineImgSrc: vip,
    message: "User Eight's message...",
    time: '08:45am',
    notificationCount: 1,
  },
  {
    id: 9,
    name: 'Emerald Stones',
    imgSrc: user9,
    onlineImgSrc: vip,
    message: "User Nine's message...",
    time: '05:20pm',
    notificationCount: 0,
  },
  {
    id: 10,
    name: 'Ginny Austin',
    imgSrc: user10,
    onlineImgSrc: vip,
    message: 'User said something...',
    time: '05:00pm',
    notificationCount: 3,
  },
];

const Chat = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user
  const [showChat, setShowChat] = useState(false); // Track the visibility of the chat screen

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterUsers();
  };

  const filterUsers = () => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUserMessageClick = (user) => {
    if (window.innerWidth <= 992) {
      // Hide the leftSide and display the rightSide
      setShowChat(false);
    } else {
      // Handle the chat display for wider screens if needed
      // You can add additional logic here
    }
    // Update the notification count to 0 when a user message is clicked
    const updatedUsers = filteredUsers.map((u) => {
      if (u.id === user.id) {
        return { ...u, notificationCount: 0 };
      }
      return u;
    });
    setFilteredUsers(updatedUsers);
    setSelectedUser(user); // Set the selected user
  };

  const handleChatClose = () => {
    setSelectedUser(null); // Clear the selected user
    setShowChat(false); // Hide the chat screen
  };

  useEffect(() => {
    // Add event listener for screen width changes
    const handleScreenWidthChange = () => {
      if (window.innerWidth <= 992) {
        // On smaller screens, initially hide the rightSide and display the leftSide
        setShowChat(true);
      } else {
        // On wider screens, initially show both leftSide and rightSide
        setShowChat(true);
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleScreenWidthChange);

    // Initialize the screen width behavior
    handleScreenWidthChange();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleScreenWidthChange);
    };
  }, []);

  return (
    <div>
      <Header />
      <section className={styles.messageContainer}>
        <h2 className={styles.heading}>Messages</h2>
        <div className={styles.message}>
          <div className={styles.leftSide}>
            <InputFieldWithIcon
              placeholder="Search users..."
              onChange={handleSearchInputChange}
            />
            {filteredUsers.map((user) => (
              <div
                className={styles.userMessage}
                key={user.id}
                onClick={() => handleUserMessageClick(user)} // Call handleUserMessageClick when a user message is clicked
              >
                <div className={styles.imgBox}>
                  <img src={user.imgSrc} alt="" className={styles.chatImg} />
                  <img
                    src={user.onlineImgSrc}
                    alt=""
                    className={styles.onlineBadge}
                  />
                </div>
                <div className={styles.chatText}>
                  <p className={styles.messagerName}>{user.name}</p>
                  <p className={styles.messagerMessage}>{user.message}</p>
                </div>
                <div className={styles.messageNotification}>
                  <p className={styles.time}>{user.time}</p>
                  {user.notificationCount > 0 && (
                    <div className={styles.notificationCount}>
                      <span className={styles.count}>{user.notificationCount}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.rightSide} ${showChat ? styles.showChat : ''}`}>
            {selectedUser && (
              <div className='w-full h-auto rounded-xl border-2 my-5'>
                <div className='h-16 bg-white flex justify-between items-center p-4'>
                  <div className='flex items-center'>
                    <div className='relative'>
                      <img
                        className="h-8 w-8 object-cover rounded-full border-4 border-yellow"
                        src={selectedUser.imgSrc}
                        alt="profile"
                      />
                      <img src={selectedUser.onlineImgSrc}
                        className=' bg-white p-0.5 rounded-full absolute top-4 left-6' style={{ width: '15px', height: '15px' }}
                      />
                    </div>
                    <p className='ml-3 font-bold text-sm text-[#292D32]'>{selectedUser.name}</p>
                  </div>
                  <div className='flex justify-between cursor-pointer items-center text-sm text-[#EE4139]'>
                    <TbFlag3
                      size={30}
                      className='rounded-md shadow-md p-2 bg-white '
                    />
                    <AiOutlineClose
                      size={30}
                      className='rounded-md shadow-md p-2 bg-white ' style={{ marginLeft: '30px' }}
                      onClick={handleChatClose} // Call handleChatClose when close button is clicked
                    />
                    <p className='ml-5'>Report</p>
                  </div>
                </div>
                <div className='bg-[#EAEAEB] h-auto p-4 overflow-y-auto flex flex-col'>
                  {
                    [1, 2, 3, 4, 5, 6, 7].map((item) => (
                      <div className='flex flex-col' key={item}>
                        <div className='text-sm w-auto flex flex-col'>
                          <p className='p-2 bg-white text-xs shadow-md rounded-lg font-bold text-center' style={{width: 'max-content'}}>{selectedUser.message}</p>
                          <p className='text-xs mt-2'>08:39PM</p>
                        </div>
                        <div className='text-sm w-auto flex flex-col justify-end items-end'>
                          <p className='p-2 bg-yellow w-48 text-xs shadow-md rounded-r-2xl rounded-t-2xl rounded-b-2xl rounded-bl-none font-bold text-center'>Good Evening. Kindly send Your Location</p>
                          <p className='text-xs mt-2'>08:39PM</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className='m-4'>
                  <div className='flex justify-between items-center w-full'>
                    <input
                      className='border-2 focus:border-none rounded-md px-4 py-1 text-sm w-4/5 mr-2'
                      type='text' placeholder='Type here....'
                    />
                    <div className='flex items-start w-1/5 justify-between'>
                      <TbSend
                        size={30}
                        className='rounded-md shadow-md p-2 bg-yellow cursor-pointer'
                      />
                      <FiPhoneCall
                        size={30}
                        className='rounded-md shadow-md p-2 bg-white cursor-pointer'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;
