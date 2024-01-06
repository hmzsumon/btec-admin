import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@services/helpers';
import {
	useGetCompanyQuery,
	useUpdateAiRobotForClaimMutation,
	useUpdateAiRobotMutation,
} from '@/features/company/companyApi';
import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { Switch } from '@mui/material';

import { Button, Card, ListGroup } from 'react-bootstrap';

const Controller = () => {
	const { data } = useGetCompanyQuery();
	const { company } = data || {};
	// console.log(company);
	const [checked, setChecked] = useState(true);
	// useEffect for update checked by company.is_ai_robot_on
	useEffect(() => {
		if (company) {
			if (company.is_ai_robot) {
				setChecked(true);
			} else {
				setChecked(false);
			}
		}
	}, [company]);

	const [updateAiRobot, { isLoading, isSuccess }] = useUpdateAiRobotMutation();
	useEffect(() => {
		if (isSuccess) {
			toast.success('Update successfully');
		}
	}, [isSuccess]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked((prevChecked) => !prevChecked);
		updateAiRobot({ is_ai_robot: !checked });
	};

	const [
		updateAiRobotForClaim,
		{
			isLoading: ic_isLoading,
			isSuccess: c_isSuccess,
			isError: c_isError,
			error: c_error,
		},
	] = useUpdateAiRobotForClaimMutation();

	// handle update ai robot for claim
	const handleUpdateAiRobotForClaim = () => {
		updateAiRobotForClaim(undefined);
	};
	useEffect(() => {
		if (c_isSuccess) {
			toast.success('Update successfully');
		}

		if (c_isError && c_error) {
			toast.error((c_error as fetchBaseQueryError).data?.message);
		}
	}, [c_isSuccess, c_isError]);

	const label = { inputProps: { 'aria-label': 'Switch demo' } };
	return (
		<AdminLayout>
			<ProtectedRoute>
				<Card className='my-2 d-flex align-items-center '>
					<Card.Body className='gap-2 d-flex '>
						<Card.Text className='text-success h5'>Controller</Card.Text>
					</Card.Body>
				</Card>

				<div>
					<ListGroup.Item>
						<span>Ai-Robot Status</span>
						<span className='float-end'>
							{checked ? (
								<span className='text-success'>ON</span>
							) : (
								<span className='text-danger'>OFF</span>
							)}
							<span>
								<Switch
									{...label}
									checked={checked}
									onChange={handleChange}
									size='small'
								/>
							</span>
						</span>
					</ListGroup.Item>
				</div>

				<div className=' mt-3'>
					<ListGroup.Item className='d-flex justify-content-between align-items-center'>
						<span>Update Ai-robot For Claim</span>
						<div className='float-end bg-primary'>
							<Button
								variant='success'
								size='sm'
								className=''
								onClick={handleUpdateAiRobotForClaim}
							>
								Update
							</Button>
						</div>
					</ListGroup.Item>
				</div>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default Controller;
