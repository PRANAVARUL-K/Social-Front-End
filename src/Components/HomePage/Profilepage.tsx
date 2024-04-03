import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaArrowLeft,FaSignOutAlt} from 'react-icons/fa';
import axios from 'axios';

function decodeJWT(token) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);

    try {
        const parsedPayload = JSON.parse(decodedPayload);
        const { _id } = parsedPayload;
        return _id;
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
    }
}

function ProfilePage() {
    const token = localStorage.getItem('token');
    const userName = decodeJWT(token);
    const navigate = useNavigate();
    
    const [user, setUser] = useState(null);
    const [newEmail, setNewEmail] = useState('');
    const [newProfileDescription, setNewProfileDescription] = useState('');
    const [editMode, setEditMode] = useState(false); // State to toggle edit mode
    const [userPosts, setUserPosts] = useState([]); // State to hold user posts
    const [logoutMessageVisible, setLogoutMessageVisible] = useState(false);

    useEffect(() => {
        fetchUserDetails();
        fetchUserPosts();
    }, []);

    const fetchUserDetails = () => {
        fetch(`http://localhost:3001/user/${userName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    };

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/search-posts/${userName}`);
            setUserPosts(response.data);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    const handleBack = () => {
        navigate('/home', { state: { userName } });
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch(`http://localhost:3001/user/update/${userName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: newEmail, profileDescription: newProfileDescription }),
            });

            if (response.ok) {
                fetchUserDetails(); 
                setEditMode(false); 
                window.alert('User information updated successfully');
            } else {
                console.error('Failed to update user information');
            }
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('token');
        window.alert('Logged out');
        navigate('/');
    };

    return (
        <>
            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                <button
                    onClick={handleLogout}
                    className="btn btn-primary"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff' }}
                >
                    <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
                </button>
            </div>
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <button
                    onClick={handleBack}
                    className="btn btn-primary"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff' }}
                >
                    <FaArrowLeft style={{ marginRight: '5px' }} /> Back
                </button>
            </div>
            <div style={{ marginTop: '50px', padding: '30px', borderRadius: '10px', border: '2px solid #fff', color: '#fff', minHeight: '600px', minWidth: '800px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                {user ? (
                    <div style={{ width: '70%', maxWidth: '500px' }}>
                        <h1>User Profile</h1>
                        <p><strong>ID:</strong> {user._id}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Profile Description:</strong> {user.profileDescription}</p>

                        <button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', borderRadius: '5px', marginBottom: '10px' }} onClick={() => setEditMode(!editMode)}>Edit Profile</button>

                           {editMode && (
                                <div style={{ marginTop: '20px', width: '100%' }}>
                                    <div style={{ marginBottom: '10px' }}>
                                        <label htmlFor="newEmail" style={{ color: '#fff', marginRight: '10px' }}>New Email:</label>
                                        <input type="text" id="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="New Email" style={{ borderRadius: '5px', border: '1px solid #fff', padding: '5px', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fff', width: '100%', boxSizing: 'border-box' }} />
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <label htmlFor="newProfileDescription" style={{ color: '#fff', marginRight: '10px' }}>New Profile Description:</label>
                                        <textarea id="newProfileDescription" value={newProfileDescription} onChange={(e) => setNewProfileDescription(e.target.value)} placeholder="New Profile Description" style={{ borderRadius: '5px', border: '1px solid #fff', padding: '5px', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#fff', width: '100%', boxSizing: 'border-box' }}></textarea>
                                    </div>
                                    <button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', borderRadius: '5px' }} onClick={handleUpdateProfile}>Update Profile</button>
                                </div>
                            )}
                </div>
                ) : (
                    <p>Loading user profile...</p>
                )}
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <h2>User Posts</h2>
                        {userPosts.map(post => (
                        <div key={post._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                            <h3>{post.uname}</h3>
                            <img src={`http://localhost:3001/uploads/${post.imageUrl}`} alt="Post" height={350} width={600}/>
                            <p>{post.des}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
