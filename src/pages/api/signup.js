import { API_URL } from '../../config/index'

const signup = async (req, res) => {
  if (req.method === 'POST') {
    const {
      firstname,
      lastname,
      email,
      title,
      amount,
      accountType,
      gender,
      phone,
      nationality,
      currency,
      idType,
      dob,
      passport,
      address,
      password,
    } = req.body

    console.log({
      firstname,
      lastname,
      amount,
      email,
      title,
      accountType,
      gender,
      phone,
      nationality,
      currency,
      idType,
      dob,
      passport,
      address,
      password,
    })

    const apiRes = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        amount,
        title,
        accountType,
        gender,
        phone,
        nationality,
        currency,
        idType,
        dob,
        passport,
        address,
        password,
      }),
    })

    const apiData = await apiRes.json()

    console.log(apiData)

    if (apiRes.ok) {
      res.setHeader('access-control-allow-credentials', true)

      res.status(200).json({ token: apiData.data })
    } else {
      res.status(500).json({ message: apiData.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}

export default signup
