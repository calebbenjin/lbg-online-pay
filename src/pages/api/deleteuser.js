import { API_URL } from '../../config/index';
// import cookie from 'cookie';

const deleteuser = async (req, res) => {

    const resUser = await fetch(`${API_URL}/delete`, {
      method: 'DELETE'
    })
  
    const user = await resUser.json()
};

export default deleteuser;
