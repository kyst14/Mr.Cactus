export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

class PagesConfig {
    HOME = '/';
    CATALOG = '/catalog';
    CONTACT = '/contact';
    CARD(id: string | number): string {
        return `/catalog/${id}`
    };

    DASHBOARD = '/admin/';
    DASHBOARD_CATALOG = '/admin/catalog';
    ADMINS = '/admin/admins';
    SETTINGS = '/admin/settings';

    API = {
        ADMIN: BASE_URL + '/api/admin',
        CATALOG: BASE_URL + '/api/catalog',
        PRODUCT(id: string | number): string {
            return BASE_URL + `/api/catalog/${id}`
        }
    }
}

export const PAGES = new PagesConfig