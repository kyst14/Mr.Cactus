class PagesConfig {
    HOME = '/';
    CATALOG = '/catalog';
    plants(id: string | number) {
        return `/plants/${id}`
    };
}

export const PAGES = new PagesConfig