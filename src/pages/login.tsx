import { NextPage } from 'next';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@services/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import Link from 'next/link';
import { SyntheticEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { deleteCookie, getCookie } from 'cookies-next';
import { useAdminLoginMutation } from 'src/features/auth/authApi';

const Login: NextPage = () => {
	const router = useRouter();
	const [adminLogin, { isLoading, isSuccess, isError, error }] =
		useAdminLoginMutation();
	const [submitting, setSubmitting] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// const getRedirect = () => {
	// 	const redirect = getCookie('redirect');
	// 	if (redirect) {
	// 		deleteCookie('redirect');
	// 		return redirect.toString();
	// 	}

	// 	return '/';
	// };

	console.log(getCookie('redirect'));

	const login = async (e: SyntheticEvent) => {
		e.stopPropagation();
		e.preventDefault();

		setSubmitting(true);
		const data = {
			email,
			password,
		};
		adminLogin(data);
		setSubmitting(false);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Login successfully');
			router.push('/');
		}

		if (isError && error) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError]);

	return (
		<div className='bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent'>
			<Container>
				<Row className='justify-content-center align-items-center px-3'>
					<Col lg={8}>
						<Row>
							<Col md={7} className='bg-white border p-5'>
								<div className=''>
									<h1>Login</h1>
									<p className='text-black-50'>Sign In to your account</p>

									<form onSubmit={login}>
										<InputGroup className='mb-3'>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faUser} fixedWidth />
											</InputGroup.Text>
											<Form.Control
												name='email'
												required
												disabled={submitting}
												placeholder=' Email'
												aria-label='Email'
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</InputGroup>

										<InputGroup className='mb-3'>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faLock} fixedWidth />
											</InputGroup.Text>
											<Form.Control
												type='password'
												name='password'
												required
												disabled={submitting}
												placeholder='Password'
												aria-label='Password'
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</InputGroup>

										<Row>
											<Col xs={6}>
												<Button
													className='px-4'
													variant='primary'
													type='submit'
													disabled={submitting}
												>
													Login
												</Button>
											</Col>
											<Col xs={6} className='text-end'>
												<Button className='px-0' variant='link' type='submit'>
													Forgot password?
												</Button>
											</Col>
										</Row>
									</form>
								</div>
							</Col>
							<Col
								md={5}
								className='bg-primary text-white d-flex align-items-center justify-content-center p-5'
							>
								<div className='text-center'>
									<h2>Sign up</h2>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit,
										sed do eiusmod tempor incididunt ut labore et dolore magna
										aliqua.
									</p>
									<Link href='/register'>
										<button
											className='btn btn-lg btn-outline-light mt-3'
											type='button'
										>
											Register Now!
										</button>
									</Link>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Login;
