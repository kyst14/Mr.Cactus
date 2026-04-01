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
        ADMIN: '/api/admin'
    }
}

export const PAGES = new PagesConfig