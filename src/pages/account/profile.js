import React from 'react'
import Layout from '../../components/AccountLayout'
import { Col, Container, Row, Form, Spinner } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { parseCookies } from '../../config/parseCookies'
import { API_URL, IMG_URL } from '../../config/index'
import Image from 'next/image'
import userProfile from '../../public/user.png'

const ProfilePage = ({ user }) => {
  const { control } = useForm({
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      accountType: `${user?.accountType} Account`,
      address: user?.address,
    },
  })



  return (
    <Layout data={user}>
      <h1>My profile</h1>

      <div className='row'>
        <div className='col-lg-8 mx-auto'>
          <div className='transactionCard '>
            <div className='profileImg'>
              {/* <Image
                src={userProfile}
                alt='user profile'
                width='150'
                height='150'
                className='profile'
              /> */}
              <img src={`${IMG_URL}${user.passport}`} className="profileImg" alt="Profile Image" />
            </div>
            <div className='formContainer userForm'>
              <form>
                <Row>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='firstname'>First name</label>
                      <Controller
                        name='firstname'
                        control={control}
                        render={({ field }) => <input disabled {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='lastname'>Last name</label>
                      <Controller
                        name='lastname'
                        control={control}
                        render={({ field }) => <input disabled {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='email'>Email Address</label>
                      <Controller
                        name='email'
                        control={control}
                        render={({ field }) => <input disabled {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='6'>
                    <div className='formControl'>
                      <label htmlFor='account Type'>Account Type</label>
                      <Controller
                        name='accountType'
                        control={control}
                        render={({ field }) => <input disabled {...field} />}
                      />
                    </div>
                  </Col>
                  <Col xl='12'>
                    <div className='formControl'>
                      <label htmlFor='address'>Address</label>
                      <Controller
                        name='address'
                        control={control}
                        render={({ field }) => <input disabled {...field} />}
                      />
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const resUser = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user = await resUser.json()

  return {
    props: {
      user: user,
      token: token,
    },
  }
}

export default ProfilePage
