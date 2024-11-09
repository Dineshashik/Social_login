import FacebookLogin from 'react-facebook-login';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './index.css';
import { useEffect, useState } from 'react';

const FacebookLoginComponent = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const oldUserData = JSON.parse(localStorage.getItem("userData")) || [];
        setUserData(oldUserData);
    }, []);

    const handleFacebookCallback = (response) => {
        if (response?.status === "unknown") {
            console.error('Sorry!', 'Something went wrong with Facebook Login.');
            return;
        }
        console.log(response, "response");

        const newUser = {
            name: response.name,
            email: response.email,
            profilePicture: response.picture?.data?.url,
            facebookId: response.id,
            accessToken: response.accessToken,
        };

        localStorage.setItem("userData", JSON.stringify([newUser]));
        setUserData([newUser]);
        console.log("newUser:", newUser);
    };

    const handleLogout = () => {
        localStorage.removeItem("userData");
        setUserData([]);
        console.log("logout");
    };

    console.log("User Data:", userData);


    return (
        <div className="App">
            <div className="facebook-container">
                {userData.length === 0 ? (
                    <div>
                        <h2>Test Project for Facebook Login</h2>
                        <div className='login-button'>
                            <FacebookLogin style={{ display: 'flex', justifyContent: 'center' }}
                                appId="1355235082523770"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={handleFacebookCallback}
                                buttonStyle={{ padding: "6px" }}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='logout-button'>
                            <Button variant="contained" onClick={handleLogout}>Logout</Button>
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Profile Picture</TableCell>
                                        <TableCell align="center">Facebook ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userData.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{user.name}</TableCell>
                                            <TableCell align="center">{user.email}</TableCell>
                                            <TableCell align="center">
                                                <img src={user.profilePicture} alt="Profile" width="50" height="50" />
                                            </TableCell>
                                            <TableCell align="center">{user.facebookId}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FacebookLoginComponent;
