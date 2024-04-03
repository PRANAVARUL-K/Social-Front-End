import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import './Search.css';

function Search() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/home');
    };

    const [userName, setUserName] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = () => {
        fetch('http://localhost:3001/users')
            .then(response => response.json())
            .then(data => {
                setAllUsers(data);
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    const handleSearch = () => {
        if (userName.trim() !== '') {
            fetch(`http://localhost:3001/search/${userName}`)
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                })
                .catch(error => {
                    console.error('Error searching users:', error);
                });
            setSearchClicked(true);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <button
                    onClick={handleBack}
                    className="btn btn-primary"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff' }}
                >
                    <FaArrowLeft style={{ marginRight: '5px' }} /> Back
                </button>
            </div>
            <div className="container" style={{ display: 'flex', margin: '60px', gap: '60px', height: 'calc(100vh - 300px)' }}>
                <div className="scroll-box" style={{ flex: 1 }}>
                    <h2>All Users</h2>
                    {allUsers.map(user => (
                        <div key={user._id} className="user-info">
                            <p>{user._id}</p>
                            <p>{user.email}</p>
                        </div>
                    ))}
                </div>
                <div className="scroll-box" style={{ flex: 1 }}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for users"
                            aria-label="Search for users"
                            aria-describedby="basic-addon2"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className="btn btn-outline-secondary search-button"
                            type="button"
                            onClick={handleSearch}
                        >
                            <FaSearch />
                        </button>
                    </div>
                    <div>
                        {searchClicked &&
                            users.map(user => (
                                <div key={user._id} className="user-info">
                                    <p>{user._id}</p>
                                    <p>{user.email}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
