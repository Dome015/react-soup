import { SearchFiltersExample } from '../examples/search-filters/Example';

export default { title: 'Examples/Search Filters' };

export const CompletePattern = () => <SearchFiltersExample />;
export const CombinedFilters = () => <SearchFiltersExample initialTypes={['Design']} initialStatus="Active" />;
export const NoMatches = () => <SearchFiltersExample initialQuery="Unlisted" />;
