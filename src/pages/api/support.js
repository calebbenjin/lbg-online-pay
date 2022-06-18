import { API_URL } from '../../config/index';

const support = async (req, res) => {
  if (req.method === 'POST') {
    const { fullname, subject, email, body } = req.body;

    const apiRes = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({fullname, subject, email, body}),
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

export default support;
