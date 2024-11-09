import React, { useEffect, useState } from "react";
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import axios from "axios";


const LinkedInLogin = () => {
    
    const [linkedinUsersData, setLinkedinUsersData] = useState()
    const { linkedInLogin } = useLinkedIn({
        clientId: '86zsjn7budwoql',
        redirectUri: `${window.location.origin}/linkedin`,
        scope: 'email w_member_social profile openid',
        onSuccess: (code) => {
            console.log("Authorization code received:", code);
        },
        onError: (error) => {
            console.error("LinkedIn login error:", error);
        },
    });



// So Based on the Analysis : 
// On Getting the Code while user login itself we're having issues. So Need to get that Code properly since that code was the one that used to get the accessToken.

// So If we get the accesToken, We can get the LinkedIn user data, I got that using postman. 

// So need to check on the method of LinkedLoginIn where we're getting the code.

// And also I've modified a url : to userInfo. Since the linkedIn signin for depreciated.
    
    useEffect(() => {
        const fetchAccessToken = async () => {
            const windowUrl = window.location.href;
            const codeMatch = windowUrl.match(/code=([a-zA-Z0-9_\-]+)/);
            if (codeMatch) {
                const code = codeMatch[1];
                try {
                    const accessTokenResponse = await axios.post('http://localhost:3001/user', { code }, { headers: { "Content-Type": "application/json" } });
                    setLinkedinUsersData(accessTokenResponse);
                    console.log(accessTokenResponse, "accessTokenResponse");
                } catch (error) {
                    console.error("Error fetching access token:", error);
                }
            }
        };

        fetchAccessToken();
    }, []);

    return (
        <div>
            <img
                onClick={linkedInLogin}
                src={linkedin}
                alt="Sign in with LinkedIn"
                style={{ maxWidth: '180px', cursor: 'pointer' }}
            />

        </div>
    );
};

export default LinkedInLogin;






// import React, { useEffect, useState } from "react";
// import { useLinkedIn } from 'react-linkedin-login-oauth2';
// import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
// import axios from "axios";

// const LinkedInLogin = () => {
//     const [accessToken, setAccessToken] = useState(null);

//     const { linkedInLogin } = useLinkedIn({
//         clientId: '86zsjn7budwoql',
//         redirectUri: `${window.location.origin}/linkedin`,
//         scope: 'email',
//         onSuccess: (code) => {
//             console.log("Authorization code received:", code);
//             fetchAccessToken(code);
//         },
//         onError: (error) => {
//             console.error("LinkedIn login error:", error);
//         },
//     });

//     const fetchAccessToken = async (code) => {
//         try {
//             const response = await axios.post('http://localhost:3001/user', { code });
//             console.log(response, "response")
//             const { access_token } = response.data;
//             setAccessToken(access_token);
//             console.log("Access token received:", access_token);
//         } catch (error) {
//             console.error("Error fetching access token:", error);
//         }
//     };

//     const getLinkedInUserProfile = async () => {
//         if (!accessToken) {
//             console.error('Access token not available');
//             return;
//         }
//         try {
//             const response = await axios.get('https://api.linkedin.com/v2/me', {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });
//             console.log("User profile:", response.data);
//         } catch (error) {
//             console.error('Error fetching user profile:', error.response.data);
//         }
//     };

//     useEffect(() => {
//         const params = new URLSearchParams(window.location.search);
//         const code = params.get('code');
//         if (code) {
//             fetchAccessToken(code);
//         }
//     }, []);

//     return (
//         <div>
//             <img
//                 onClick={linkedInLogin}
//                 src={linkedin}
//                 alt="Sign in with LinkedIn"
//                 style={{ maxWidth: '180px', cursor: 'pointer' }}
//             />
//             {accessToken && (
//                 <button onClick={getLinkedInUserProfile}>
//                     Get LinkedIn Profile
//                 </button>
//             )}
//         </div>
//     );
// };

// export default LinkedInLogin;


