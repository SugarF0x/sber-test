import { IAction, IPost, IRootPosts } from '../types';

const defaultPosts = {
  status: 'success',
  search: [],
  favs: [],
  filter: '',
  display: 'default',
} as IRootPosts;

const ls = localStorage.getItem('favs');
if (ls) defaultPosts.favs = JSON.parse(ls);

/**
 * Hard-wired dummy data sample used as reference
 * Can be called when corsanywhere rejects call
 */
const dummyData = [
  {
    id: '569bfcdc-fad1-4563-ae57-8585831db596',
    type: 'Full Time',
    url: 'https://jobs.github.com/positions/569bfcdc-fad1-4563-ae57-8585831db596',
    created_at: 'Sun Sep 06 14:30:27 UTC 2020',
    company: 'Hotel Trades Council, AFL-CIO',
    company_url: 'http://www.hotelworkers.org',
    location: 'New York, NY',
    title: 'Web Developer',
    description: '<p>The New York Hotel Trades Council, AFL-CIO, a labor union that represents nearly 40,000 workers in the hotel, gaming, and racing industries in the New York City area, seeks an experienced web developer.</p>\n<p>This COVID crisis has shown us the immense value to our Union of developing a more expansive and sophisticated website. Since March, the number of viewers to our site has increased seven-fold (to as many as 20,000 per day and more) and we are investing our resources accordingly. In fact, we have so many concrete ideas to put the site to new innovative uses, that our one full-time Web Developer has much more work to do than he can possibly handle. Among the new uses we are developing are:</p>\n<p>Conducting secret ballot ratification votes online;\nProviding multi-lingual content to an incredibly diverse membership (the current site supports English, Spanish and Chinese content);\nMobilizing rank-and-file political action in a private individually personalized Member Section;\nProviding non-union workers with a confidential communication channel with the union and interactive pages allowing them to compare their wages, benefits and working conditions to those enjoyed by unionized workers; and\nMany other applications.</p>\n<p>Our Union constantly seeks new ways to increase our effectiveness through smart use of technology and we are looking for a creative developer to help conceive of, design and implement tools to support the Union in our mission.</p>\n<p>This position offers the prospect of a great career and, as we are a labor union, an excellent benefit package.</p>\n<p>The team currently works remotely from home due to the COVID situation. When things return to normal, we intend to be flexible about remote work, and will consider skilled applicants who don’t live in the New York area.</p>\n<p>Starting salary: $70,000 to $85,000</p>\n<p>Benefits include: Medical, Dental, Optical, and Prescription Drugs with family coverage (including domestic partners); Pension, Pre-paid Legal, Flexible Spending Accounts, Life Cycle Benefits, Long-Term Care Insurance, and other benefits.</p>\n<p>Requirements:\nAt least 3 years developing websites using an MVC framework (with preference given to specific knowledge of Laravel PHP framework).\nStrong UI/UX design skills\nStrong javascript skills</p>\n<p>Other useful experience/qualifications:</p>\n<ul>\n<li>Advanced experience managing SQL databases</li>\n<li>Linux server administration</li>\n<li>Networking skills</li>\n<li>Python</li>\n</ul>\n',
    how_to_apply: '<p>Please submit a resume, three references and a cover letter to <a href="mailto:careers@nyhtc.org">careers@nyhtc.org</a> with the subject line “Web Developer.”  The cover letter should be clear and concise and explain the specific reasons for your interest in the position, and specify (with appropriate explanation) which of each of the listed qualifications you possess and which ones you do not possess.</p>\n<p>The New York Hotel Trades Council, AFL-CIO, is an equal opportunity employer.  All persons regardless of age, race, ethnicity, gender, religious affiliation and sexual orientation are encouraged to apply.</p>\n',
    company_logo: 'https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbE9KIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a30d608a910769a14438f7e0d7f3a673ca961499/HTC%20logo.jpg',
  },
] as IPost[];

export default (state = defaultPosts, action: IAction) => {
  /**
   * Return state with changes passed as arguments
   */
  function mutateState(toMutate: {}): IRootPosts {
    return { ...state, ...toMutate };
  }

  /**
   * Sync data with localStorage
   */
  function storeLocally(posts: IPost[]) {
    localStorage.setItem('favs', JSON.stringify(posts));
  }

  switch (action.type) {
    /**
     * Get hard-wired dummy post without having to call API
     */
    case 'GET_DUMMY_POSTS':
      return mutateState({
        status: 'success', search: dummyData, filter: '', display: 'search',
      });

    /**
     * Toggle display to avoid unnecessary data refetch
     */
    case 'TOGGLE_DISPLAY':
      return mutateState({ display: state.display === 'favs' ? 'search' : 'favs' });

    /**
     * Mutations regarding posts fetched from search filter
     */
    case 'FETCH_POSTS_START':
      return mutateState({ status: 'fetching', filter: action.data, display: 'search' });
    case 'FETCH_POSTS_ERROR':
      return mutateState({ status: 'error', filter: '' });
    case 'FETCH_POSTS_SUCCESS':
      return mutateState({ status: 'success', search: action.data });
    case 'FETCH_POSTS_404':
      return mutateState({ status: 'not_found' });

    /**
     * Mutations regarding fetching favorites as well as adding and removing them
     */
    case 'TO_FAVORITE': {
      const ids = state.favs.map((entry: IPost): string => entry.id);
      if (ids.indexOf(action.data.id) !== -1) {
        const result = state.favs.filter((entry: IPost) => entry.id !== action.data.id);
        storeLocally(mutateState({ favs: result }).favs);
        return mutateState({ favs: result });
      }
      const result = [
        ...state.favs,
        action.data,
      ];
      storeLocally(mutateState({ favs: result }).favs);
      return mutateState({ favs: result });
    }

    case 'FETCH_FAVORITES_START':
      return mutateState({ status: 'fetching', display: 'favs' });
    case 'FETCH_FAVORITES_ERROR':
      return mutateState({ status: 'error' });
    case 'FETCH_FAVORITES_SUCCESS':
      return mutateState({ status: 'success', favs: action.data });

    default:
      return state;
  }
};
