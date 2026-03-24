class PagesConfig {
    HOME = '/';
    CATALOG = '/catalog';
    CONTACT = '/contact';
    CARD(id: string | number): string {
        return `/catalog/${id}`
    };
}

export const PAGES = new PagesConfig