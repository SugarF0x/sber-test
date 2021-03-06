import React from 'react';
import { shallow } from 'enzyme';

import { Button } from '@material-ui/core';
import { Wrapper } from '../../components/Posts';
// import { Post }    from "../../components/Post";
import SearchBarCon from '../../components/SearchBar';

/**
 * I am at a loss here
 * I don't know how to work with this now since this component uses Redux connected components
 * Given that all the other components' testing is performed on unconnected instances,
 * this creates an issue that I have no idea of how to overcome
 *
 * For the moment I will be rendering this very component as a shallow husk
 * thus mitigating the need to render SearchBar or Post
 * but without that it will be hard to actually test component
 * that almost fully relies on said modules to work
 *
 * It works for rendering default states and whatnot,
 * but when I want to test functionality, I have my ass forced into a ditch >:C
 */

describe('Posts component Testing', () => {
  const store = {
    status: 'success',
    search: [],
    favs: [],
    filter: '',
    display: 'default',
  };
  const dummyPost = {
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
  };
  let wrapper;

  function getDummyPosts() {
    wrapper.setProps({
      posts: { ...wrapper.instance().props.posts, search: [dummyPost], display: 'search' },
      getDummyPosts,
    });
  }

  beforeEach(() => {
    wrapper = shallow(<Wrapper posts={store} getDummyPosts={getDummyPosts} />);
  });

  describe('Element render tests', () => {
    test('Render component', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('Render SearchBar', () => {
      expect(wrapper.find(SearchBarCon).length).toBe(1);
    });
    test('Render default display', () => {
      expect(wrapper.find('h3').text()).toBe('There are currently no posts here');
      expect(wrapper.find(Button).shallow().text()).toBe('Get dummy data');
    });
  });

  describe('Element interaction tests', () => {
    test('Get dummy data', () => {
      /**
       * Initial test not needed as is tested in element render
       * (default display)
       * Proceeding to button click
       */
      wrapper.find(Button).shallow().simulate('click');
      expect(wrapper.instance().props.posts.display).toBe('search');
      expect(wrapper.instance().props.posts.search[0]).toBe(dummyPost);
      // expect(wrapper.find(Post).length).toBeGreaterThan(0);
      // TODO: need to somehow see if this actually renders,
      //  but dont know how given the shallow render
    });
  });
});
