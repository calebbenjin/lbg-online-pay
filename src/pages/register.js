import { useState, useContext } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useForm, Controller } from 'react-hook-form'
import { Col, Row, Form, Select } from 'react-bootstrap'
import { AuthContext } from '../context/Authcontext'
import logo from '../public/img/logo.jpeg'
import Image from 'next/image'


let randomNum = ''
const SignPage = () => {
  const { signup, isLoading, errorMessage } = useContext(AuthContext)
  const [stepOne, setStepOne] = useState(true)
  const [stepTwo, setStepTwo] = useState(false)
  const [stepThree, setStepThree] = useState(false)
  const [accountNumber, setAccountNumber] = useState(
    (randomNum += Math.round(Math.random() * 9) + 2779864789)
  )
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (data) => {
    const {
      firstname,
      lastname,
      email,
      title,
      accountType,
      gender,
      phone,
      nationality,
      currency,
      idType,
      dob,
      address,
      password,
    } = data
    const passport = data.passportImg[0]?.name

    console.log(data)

    // signup({
    //   firstname,
    //   lastname,
    //   email,
    //   title,
    //   accountType,
    //   gender,
    //   phone,
    //   nationality,
    //   currency,
    //   idType,
    //   dob,
    //   passport,
    //   address,
    //   password,
    // })
  }

  const handleShowStepOne = () => {
    setStepOne(false)
    setStepTwo(true)
  }

  const handlePreviousOne = () => {
    setStepOne(true)
    setStepTwo(false)
  }

  const handlePreviousTwo = () => {
    setStepTwo(true)
    setStepThree(false)
  }


  const handleShowStepTwo = () => {
    setStepOne(false)
    setStepTwo(false)
    setStepThree(!stepThree)
  }

  const handleShowStepThree = () => {
    setStepOne(false)
    setStepTwo(false)
    setStepThree(!stepThree)
  }

  return (
    <Layout>
      <main className='container display-container'>
        <div className='signup-container'>
          <div className="formLogo">
            <Image src={logo} alt="logo" height="100" width="100" />
          </div>
          <div className='form regForm'>
            <h3 className='signout-title'>Account Application Form</h3>
            {errorMessage ? (
              <div className='errorMessage'>{errorMessage}</div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)}>
                {stepOne ?
                  <div>
                    <Row>
                      <Col lg={6}>
                        <div className='input-group'>
                          <label htmlFor='lastname'>Title</label>
                          <select {...register('title')}>
                            <option>Select Your Title</option>
                            <option value='Mr'>Mr</option>
                            <option value='Mrs'>Mrs</option>
                            <option value='Ms'>Ms</option>
                            <option value='Miss'>Miss</option>
                            <option value='Dr'>Dr</option>
                          </select>
                          {errors.title && <span>This field is required</span>}
                        </div>
                      </Col>
                      <Col lg='6'>
                        <div className='input-group'>
                          <label htmlFor='text'>First name</label>
                          <input
                            type='text'
                            {...register('firstname', { required: true })}
                            placeholder='Your firstname'
                          />
                          {errors.firstname && <span>This field is required</span>}
                        </div>
                      </Col>
                      <Col lg='6'>
                        <div className='input-group'>
                          <label htmlFor='lastname'>Last name</label>
                          <input
                            type='text'
                            {...register('lastname', { required: true })}
                            placeholder='Your Last name'
                          />
                          {errors.lastname && <span>This field is required</span>}
                        </div>
                      </Col>
                      <Col lg='6'>
                        <div className='input-group'>
                          <label htmlFor='password'>Create Password</label>
                          <div className='password'>
                            <input
                              type={showPassword ? 'text' : 'password'}
                              {...register('password', { required: true })}
                              placeholder='Your password'
                            />
                            <span onClick={handleShowPassword}>show</span>
                          </div>
                          {errors.password && <span>This field is required</span>}
                        </div>
                      </Col>
                    </Row>
                    <div className="btnFlex">
                      <p className='nextBtn' onClick={handleShowStepOne}>
                        Next
                      </p>
                    </div>
                  </div>
                : null}

          
                {stepTwo ? 
                <div>
                  <p className='sub_title'>Contact details</p>
                  <Row>
                    <Col lg='12'>
                      <div className='input-group'>
                        <label htmlFor='address'>Residential Address</label>
                        <input
                          type='text'
                          {...register('address', { required: true })}
                          placeholder='Your Residential address'
                        />
                        {errors.address && <span>This field is required</span>}
                      </div>
                    </Col>
                    <Col lg='6'>
                      <div className='input-group'>
                        <label htmlFor='dob'>Date of Birth</label>
                        <input
                          type='date'
                          {...register('dob', { required: true })}
                        />
                        {errors.dob && <span>This field is required</span>}
                      </div>
                    </Col>
                    <Col lg='6'>
                      <div className='input-group'>
                        <label htmlFor='phone'>Cell Phone</label>
                        <input
                          type='phone'
                          {...register('phone', { required: true })}
                          placeholder='Your Cell Number'
                        />
                        {errors.phone && <span>This field is required</span>}
                      </div>
                    </Col>
                    <Col lg='4'>
                      <div className='input-group'>
                        <label htmlFor='gender'>Gender *</label>
                        <select {...register('gender', { required: true })}>
                          <option data-display='Select Title'>Gender</option>
                          <option value='male'>Male</option>
                          <option value='female'>female.</option>
                          <option value='others'>Others.</option>
                        </select>
                        {errors.gender && <span>This field is required</span>}
                      </div>
                    </Col>
                    <Col lg='8'>
                      <div className='input-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                          type='email'
                          {...register('email', { required: true })}
                          placeholder='Your email address'
                        />
                        {errors.email && <span>This field is required</span>}
                      </div>
                    </Col>

                    <Col lg='12'>
                      <div className='formControl nationality'>
                        <label htmlFor='nationality'>
                          Nationality / Citizenship *
                        </label>
                        <select {...register('nationality')}>
                          <option data-display='Choose your country'>
                            Countries
                          </option>
                          <option value='Afghanistan'>Afghanistan</option>
                          <option value='Albania '>Albania</option>
                          <option value='Algeria'>Algeria</option>
                          <option value='American Samoa'>American Samoa</option>
                          <option value='Andorra'>Andorra</option>
                          <option value='Angola'>Angola</option>
                          <option value='Anguilla'>Anguilla</option>
                          <option value='Antarctica'>Antarctica</option>
                          <option value='Antigua and Barbuda'>
                            Antigua and Barbuda
                          </option>
                          <option value='Argentina '>Argentina</option>
                          <option value='Armenia'>Armenia</option>
                          <option value='Aruba'>Aruba</option>
                          <option value='Australia'>Australia</option>
                          <option value='Austria'>Austria</option>
                          <option value='Azerbaijan'>Azerbaijan</option>
                          <option value='Bahamas'>Bahamas</option>
                          <option value='Bahrain'>Bahrain</option>
                          <option value='Bangladesh'>Bangladesh</option>
                          <option value='Barbados'>Barbados</option>
                          <option value='Belarus'>Belarus</option>
                          <option value='Belgium'>Belgium</option>
                          <option value='Belize'>Belize</option>
                          <option value='Benin'>Benin</option>
                          <option value='Bermuda'>Bermuda</option>
                          <option value='Bhutan'>Bhutan</option>
                          <option value='Bolivia'>Bolivia</option>
                          <option value='Bosnia and Herzegowina'>
                            Bosnia and Herzegowina
                          </option>
                          <option value='Botswana'>Botswana</option>
                          <option value='Bouvet Island'>Bouvet Island</option>
                          <option value='Brazil'>Brazil</option>
                          <option value='British Indian Ocean Territory'>
                            British Indian Ocean Territory
                          </option>
                          <option value='Brunei Darussalam'>
                            Brunei Darussalam
                          </option>
                          <option value='Bulgaria'>Bulgaria</option>
                          <option value='Burundi'>Burundi</option>
                          <option value='Cambodia'>Cambodia</option>
                          <option value='Cameroon'>Cameroon</option>
                          <option value='Canada'>Canada</option>
                          <option value='Cape Verde'>Cape Verde</option>
                          <option value='Cayman Islands'>Cayman Islands</option>
                          <option value='Central African Republic'>
                            Central African Republic
                          </option>
                          <option value='Chad'>Chad</option>
                          <option value='Chile'>Chile</option>
                          <option value='China'>China</option>
                          <option value='Christmas Island'>
                            Christmas Island
                          </option>
                          <option value='Cocos (Keeling) Islands'>
                            Cocos (Keeling) Islands
                          </option>
                          <option value='Colombia'>Colombia</option>
                          <option value='Comoros'>Comoros</option>
                          <option value='Congo'>Congo</option>
                          <option value='Cook Islands'>Cook Islands</option>
                          <option value='Costa Rica'>Costa Rica</option>
                          <option value="Cote D'Ivoire">Cote D&#39;Ivoire</option>
                          <option value='Croatia'>Croatia</option>
                          <option value='Cuba'>Cuba</option>
                          <option value='Cyprus'>Cyprus</option>
                          <option value='Czech Republic'>Czech Republic</option>
                          <option value='Denmark'>Denmark</option>
                          <option value='Djibouti'>Djibouti</option>
                          <option value='Dominica'>Dominica</option>
                          <option value='Dominican Republic'>
                            Dominican Republic
                          </option>
                          <option value='East Timor'>East Timor</option>
                          <option value='Ecuador'>Ecuador</option>
                          <option value='Egypt'>Egypt</option>
                          <option value='El Salvador'>El Salvador</option>
                          <option value='Equatorial Guinea'>
                            Equatorial Guinea
                          </option>
                          <option value='Eritrea'>Eritrea</option>
                          <option value='Estonia'>Estonia</option>
                          <option value='Ethiopia'>Ethiopia</option>
                          <option value='Falkland Islands'>
                            Falkland Islands
                          </option>
                          <option value='Faroe Islands'>Faroe Islands</option>
                          <option value='Fiji'>Fiji</option>
                          <option value='Finland'>Finland</option>
                          <option value='France'>France</option>
                          <option value='France (Metropolitan)'>
                            France (Metropolitan)
                          </option>
                          <option value='French Guiana'>French Guiana</option>
                          <option value='French Polynesia'>
                            French Polynesia
                          </option>
                          <option value='French Southern Territories'>
                            French Southern Territories
                          </option>
                          <option value='Gabon'>Gabon</option>
                          <option value='Gambia'>Gambia</option>
                          <option value='Georgia'>Georgia</option>
                          <option value='Germany'>Germany</option>
                          <option value='Ghana'>Ghana</option>
                          <option value='Gibraltar'>Gibraltar</option>
                          <option value='Greece'>Greece</option>
                          <option value='Greenland'>Greenland</option>
                          <option value='Grenada'>Grenada</option>
                          <option value='Guadeloupe'>Guadeloupe</option>
                          <option value='Guam'>Guam</option>
                          <option value='Guatemala'>Guatemala</option>
                          <option value='Guinea'>Guinea</option>
                          <option value='Guinea-Bissau'>Guinea-Bissau</option>
                          <option value='Guyana'>Guyana</option>
                          <option value='Haiti'>Haiti</option>
                          <option value='Heard and McDonald Islands'>
                            Heard and McDonald Islands
                          </option>
                          <option value='Honduras'>Honduras</option>
                          <option value='Hong Kong'>Hong Kong</option>
                          <option value='Hungary'>Hungary</option>
                          <option value='Iceland'>Iceland</option>
                          <option value='India'>India</option>
                          <option value='Indonesia'>Indonesia</option>
                          <option value='Iran'>Iran</option>
                          <option value='Iraq'>Iraq</option>
                          <option value='Ireland'>Ireland</option>
                          <option value='Israel'>Israel</option>
                          <option value='Italy'>Italy</option>
                          <option value='Jamaica'>Jamaica</option>
                          <option value='Japan'>Japan</option>
                          <option value='Jordan'>Jordan</option>
                          <option value='Kazakhstan'>Kazakhstan</option>
                          <option value='Kenya'>Kenya</option>
                          <option value='Kiribati'>Kiribati</option>
                          <option value="Korea (Democratic People's Republic of)">
                            Korea (Democratic People&rsquo;s Republic of)
                          </option>
                          <option value='Korea (Republic of)'>
                            Korea (Republic of)
                          </option>
                          <option value='Kuwait'>Kuwait</option>
                          <option value='Kyrgyzstan'>Kyrgyzstan</option>
                          <option value="Lao People's Democratic Republic">
                            Lao People&rsquo;s Democratic Republic
                          </option>
                          <option value='Latvia'>Latvia</option>
                          <option value='Lebanon'>Lebanon</option>
                          <option value='Lesotho'>Lesotho</option>
                          <option value='Liberia'>Liberia</option>
                          <option value='Libyan Arab Jamahiriya'>
                            Libyan Arab Jamahiriya
                          </option>
                          <option value='Liechtenstein'>Liechtenstein</option>
                          <option value='Lithuania'>Lithuania</option>
                          <option value='Luxembourg'>Luxembourg</option>
                          <option value='Macau'>Macau</option>
                          <option value='Macedonia'>
                            Macedonia (The Former Yugoslav Republic of)
                          </option>
                          <option value='Madagascar'>Madagascar</option>
                          <option value='Malawi'>Malawi</option>
                          <option value='Malaysia'>Malaysia</option>
                          <option value='Maldives'>Maldives</option>
                          <option value='Mali'>Mali</option>
                          <option value='Malta'>Malta</option>
                          <option value='Marshall Islands'>
                            Marshall Islands
                          </option>
                          <option value='Martinique'>Martinique</option>
                          <option value='Mauritania'>Mauritania</option>
                          <option value='Mauritius'>Mauritius</option>
                          <option value='Mayotte'>Mayotte</option>
                          <option value='Mexico'>Mexico</option>
                          <option value='Micronesia (Federated States of)'>
                            Micronesia (Federated States of)
                          </option>
                          <option value='Moldova (Republic of)'>
                            Moldova (Republic of)
                          </option>
                          <option value='Monaco'>Monaco</option>
                          <option value='Mongolia'>Mongolia</option>
                          <option value='Montserrat'>Montserrat</option>
                          <option value='Morocco'>Morocco</option>
                          <option value='Mozambique'>Mozambique</option>
                          <option value='Myanmar'>Myanmar</option>
                          <option value='Namibia'>Namibia</option>
                          <option value='Nauru'>Nauru</option>
                          <option value='Nepal'>Nepal</option>
                          <option value='Netherlands'>Netherlands</option>
                          <option value='Netherlands Antilles'>
                            Netherlands Antilles
                          </option>
                          <option value='New Caledonia'>New Caledonia</option>
                          <option value='New Zealand'>New Zealand</option>
                          <option value='Nicaragua'>Nicaragua</option>
                          <option value='Niger'>Niger</option>
                          <option value='Nigeria'>Nigeria</option>
                          <option value='Niue'>Niue</option>
                          <option value='Norfolk Island'>Norfolk Island</option>
                          <option value='Northern Mariana Islands'>
                            Northern Mariana Islands
                          </option>
                          <option value='Norway'>Norway</option>
                          <option value='Oman'>Oman</option>
                          <option value='Pakistan'>Pakistan</option>
                          <option value='Palau'>Palau</option>
                          <option value='Panama'>Panama</option>
                          <option value='Papua New Guinea'>
                            Papua New Guinea
                          </option>
                          <option value='Paraguay'>Paraguay</option>
                          <option value='Peru'>Peru</option>
                          <option value='Philippines'>Philippines</option>
                          <option value='Pitcairn'>Pitcairn</option>
                          <option value='Poland'>Poland</option>
                          <option value='Portugal'>Portugal</option>
                          <option value='Puerto Rico'>Puerto Rico</option>
                          <option value='Qatar'>Qatar</option>
                          <option value='Reunion'>Reunion</option>
                          <option value='Romania'>Romania</option>
                          <option value='Russian Federation'>
                            Russian Federation
                          </option>
                          <option value='Rwanda'>Rwanda</option>
                          <option value='Saint Kitts and Nevis'>
                            Saint Kitts and Nevis
                          </option>
                          <option value='Saint Lucia'>Saint Lucia</option>
                          <option value='Saint Vincent and the Grenadines'>
                            Saint Vincent and the Grenadines
                          </option>
                          <option value='Samoa'>Samoa</option>
                          <option value='San Marino'>San Marino</option>
                          <option value='Sao Tome and Principe'>
                            Sao Tome and Principe
                          </option>
                          <option value='Saudi Arabia'>Saudi Arabia</option>
                          <option value='Sebia'>Sebia</option>
                          <option value='Senegal'>Senegal</option>
                          <option value='Seychelles'>Seychelles</option>
                          <option value='Sierra Leone'>Sierra Leone</option>
                          <option value='Singapore'>Singapore</option>
                          <option value='Slovakia (Slovak Republic)'>
                            Slovakia (Slovak Republic)
                          </option>
                          <option value='Slovenia'>Slovenia</option>
                          <option value='Solomon Islands'>
                            Solomon Islands
                          </option>
                          <option value='Somalia'>Somalia</option>
                          <option value='South Africa'>South Africa</option>
                          <option value='South Georgia &amp; South Sandwich Islands'>
                            South Georgia and the South Sandwich Islands
                          </option>
                          <option value='Spain'>Spain</option>
                          <option value='Sri Lanka'>Sri Lanka</option>
                          <option value='St. Helena'>St. Helena</option>
                          <option value='St. Pierre and Miquelon'>
                            St. Pierre and Miquelon
                          </option>
                          <option value='Sudan'>Sudan</option>
                          <option value='Suriname'>Suriname</option>
                          <option value='Svalbard and Jan Mayen Islands'>
                            Svalbard and Jan Mayen Islands
                          </option>
                          <option value='Swaziland'>Swaziland</option>
                          <option value='Sweden'>Sweden</option>
                          <option value='Switzerland'>Switzerland</option>
                          <option value='Syrian Arab Republic'>
                            Syrian Arab Republic
                          </option>
                          <option value='Taiwan (Province of China)'>
                            Taiwan (Province of China)
                          </option>
                          <option value='Tajikistan'>Tajikistan</option>
                          <option value='Tanzania (United Republic of)'>
                            Tanzania (United Republic of)
                          </option>
                          <option value='Thailand'>Thailand</option>
                          <option value='Togo'>Togo</option>
                          <option value='Tokelau'>Tokelau</option>
                          <option value='Tonga'>Tonga</option>
                          <option value='Trinidad and Tobago'>
                            Trinidad and Tobago
                          </option>
                          <option value='Tunisia'>Tunisia</option>
                          <option value='Turkey'>Turkey</option>
                          <option value='Turkmenistan'>Turkmenistan</option>
                          <option value='Turks and Caicos Islands'>
                            Turks and Caicos Islands
                          </option>
                          <option value='Tuvalu'>Tuvalu</option>
                          <option value='Uganda'>Uganda</option>
                          <option value='Ukraine'>Ukraine</option>
                          <option value='United Arab Emirates'>
                            United Arab Emirates
                          </option>
                          <option value='United Kingdom'>United Kingdom</option>
                          <option value='United States Minor Outlying Islands'>
                            United States Minor Outlying Islands
                          </option>
                          <option value='United States of America'>
                            United States of America
                          </option>
                          <option value='Uruguay'>Uruguay</option>
                          <option value='Uzbekistan'>Uzbekistan</option>
                          <option value='Vanuatu'>Vanuatu</option>
                          <option value='Vatican City State (Holy See)'>
                            Vatican City State (Holy See)
                          </option>
                          <option value='Venezuela'>Venezuela</option>
                          <option value='Viet Nam'>Viet Nam</option>
                          <option value='Virgin Islands (British)'>
                            Virgin Islands (British)
                          </option>
                          <option value='Virgin Islands (U.S.)'>
                            Virgin Islands (U.S.)
                          </option>
                          <option value='Wallis and Futuna Islands'>
                            Wallis and Futuna Islands
                          </option>
                          <option value='Western Sahara'>Western Sahara</option>
                          <option value='Yemen'>Yemen</option>
                          <option value='Yugoslavia'>Yugoslavia</option>
                          <option value='Zaire'>Zaire</option>
                          <option value='Zambia'>Zambia</option>
                          <option value='Zimbabwe'>Zimbabwe</option>
                        </select>
                      </div>
                    </Col>
                  </Row>
                  <div className="btnFlex">
                    <p className='prevBtn' onClick={handlePreviousOne}>
                      Previous
                    </p>
                    <p className='nextBtn' onClick={handleShowStepTwo}>
                      Next
                    </p>
                  </div>
                </div>
                : null}

                {stepThree ? 
                  <>
                    <p className='sub_title'>Identification</p>
                    <Row>
                      <Col xl='6'>
                        <div className='formControl'>
                          <label htmlFor='accountType'>Account Type</label>
                          <select {...register('accountType')}>
                            <option>Choose Account Type</option>
                            <option value='Current'>Current account</option>
                            <option value='Current'>Current account</option>
                            <option value='Savings'>Savings account</option>
                            <option value='Salary'>Salary account</option>
                          </select>
                        </div>
                      </Col>
                      <Col xl='6'>
                        <div className='formControl'>
                          <label htmlFor='currency'>Currency</label>
                          <select {...register('currency')}>
                            <option>Choose Currency</option>
                            <option value='USD'>USD</option>
                            <option value='EURO'>EURO</option>
                            <option value='POUNDS'>POUNDS</option>
                            <option value='ZAR'>ZAR</option>
                            <option value='NGN'>NGN</option>
                            <option value='PULA'>Pula</option>
                            <option value='NAD'>NAD</option>
                            <option value='ZMW'>ZMW</option>
                            <option value='SZL'>SZL</option>
                            <option value='LSL'>LSL</option>
                          </select>
                        </div>
                      </Col>
                      <Col xl='6'>
                        <div className='formControl'>
                          <label htmlFor='email'>Identity Type</label>
                          <select {...register('idType')}>
                            <option value='passport'>Passport</option>
                            <option value='id'>ID</option>
                            <option value='Drivers licence'>
                              Drivers licence
                            </option>
                          </select>
                        </div>
                      </Col>
                      <Col lg='12'>
                        <div className='input-group passport'>
                          <label htmlFor='passport'>
                            Upload a valid Government issued Identification:
                          </label>
                          <input
                            type='file'
                            {...register('passportImg', { required: true })}
                            name='passportImg'
                          />
                          {errors.passport && <span>This field is required</span>}
                        </div>
                      </Col>
                    </Row> 
                    <div className="btnFlex">
                      <p className='prevBtn' onClick={handlePreviousTwo}>
                        Previous
                      </p>
                    </div>

                    <button className='login-btn'>
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </>
                  : null}
            </form>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default SignPage
