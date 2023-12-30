import {
	useGetCompanyQuery,
	useUpdateAiRobotMutation,
} from '@/features/company/companyApi';
import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const Controller = () => {
	const { data } = useGetCompanyQuery();
	const { company } = data || {};
	console.log(company);
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

	const [updateAiRobot, { isLoading }] = useUpdateAiRobotMutation();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked((prevChecked) => !prevChecked);
		updateAiRobot({ is_ai_robot: !checked });
	};

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
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default Controller;
