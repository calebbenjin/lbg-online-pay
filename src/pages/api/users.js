import { API_URL } from '../../config/index';
import cookie from 'cookie';

const rider = async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const resUser = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  
    const users = await resUser.json()

    if (resUser.ok) {
      res.status(200).json({ users });
    } else {
      res.status(403).json({ message: 'User forbidden' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default rider;
