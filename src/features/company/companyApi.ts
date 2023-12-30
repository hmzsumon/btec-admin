import { apiSlice } from '../api/apiSlice';

export const companyApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get company
		getCompany: builder.query<any, void>({
			query: () => '/admin/company',
			providesTags: ['Company'],
		}),

		// get balance info
		getBalanceInfo: builder.query<any, void>({
			query: () => '/admin/company/all-users-balance-info',
		}),

		// update company ai-robot
		updateAiRobot: builder.mutation<any, any>({
			query: (data) => ({
				url: '/admin/company/update-company-ai-robot',
				method: 'PUT',
				body: data,
			}),
		}),
	}),
});

export const {
	useGetCompanyQuery,
	useGetBalanceInfoQuery,
	useUpdateAiRobotMutation,
} = companyApi;
