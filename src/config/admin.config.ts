import 'server-only';

export const DEFAULT_ADMIN = {
	username: process.env.DEFAULT_ADMIN_USERNAME || 'admin',
	password: process.env.DEFAULT_ADMIN_PASSWORD || '',
};
