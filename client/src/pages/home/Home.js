import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import TokenService from "../../services/TokenService";
import { getProfiles } from "../../services/UserService";

const Home = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (TokenService.getLocalAccessToken() && TokenService.getLocalRefreshToken()) {
            getProfiles().then(res => {
                const response = res?.data?.data;
                setUsername(`${response.firstName} ${response.lastName}`);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            navigate('/login', { replace: true });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <p>Login as: {username}</p>
        </div>
    );
}

export default Home;