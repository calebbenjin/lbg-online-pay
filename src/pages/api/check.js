import { API_URL } from '../../config/index';

const check = async (req, res) => {
  if (req.method === 'POST') {
    const { referenceNum, email } = req.body;

    const apiRes = await fetch(`${API_URL}/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({referenceNum, email}),
    });

    const apiData = await apiRes.json();

    if (apiRes.ok) {

      res.setHeader('access-control-allow-credentials', true);

      res.status(200).json({apiData});
    } else {
      res.status(500).json({ message: apiData.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default check;
