import gql from 'graphql-tag';

export default gql`
	query GetCurrentUser {
		user {
			id
			email
		}
	}
`;
