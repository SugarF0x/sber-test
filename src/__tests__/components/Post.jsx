import React from 'react';
import { mount } from 'enzyme';

import {
  CardContent,
  CardHeader,
  IconButton,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Post } from '../../components/Post';

describe('Post Component Testing', () => {
  const post = {
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

  function favoritePropAction() {
    wrapper.setProps({
      post,
      favorite: !wrapper.props().favorite,
      setFavorite: favoritePropAction,
    });
  }

  beforeEach(() => {
    wrapper = mount(<Post post={post} favorite={false} setFavorite={favoritePropAction} />);
  });

  describe('Method tests', () => {
    test('formatDate', () => {
      const { formatDate } = wrapper.instance();
      expect(formatDate('Sun Sep 06 14:30:27 UTC 2020')).toBe('06.09.2020 at 17:30');
      expect(formatDate('Mon May 27 16:55:19 UTC 1999')).toBe('27.05.1999 at 20:55');
      expect(formatDate('Wed Dec 15 05:16:01 UTC 2001')).toBe('15.12.2001 at 08:16');
    });
    test('trimContent', () => {
      const { trimContent } = wrapper.instance();
      expect(trimContent(post.description)).toBe('The New York Hotel Trades Council, AFL-CIO, a labor union that represents nearly 40,000 workers in the hotel, gaming, and racing industries in the New York City area, seeks an experienced web developer.');
      // eslint-disable-next-line no-useless-escape
      expect(trimContent('<p>Position Overview:\\nThis position will develop and continuously improve Compeer’s Development Operations (DevOps) practice by ensuring the end-to-end engineering life-cycle of software solutions under the direction of Business Technology (BT) leadership. The incumbent leads the DevOps Team in the requirements analysis, architectural vision and test automation through the user experience, extensions, operations, maintenance and end of life of the software. This includes building, refreshing, diagnosing and issue remediation of system development environments, and developing/implementing the monitoring solutions and tools in collaboration with the DevOps Infrastructure Engineer and Infrastructure Team which will automate daily operational activities as they relate to the DevOps practice. Conducts ongoing market research staying abreast of developments and technologies related to DevOps practice and tools.</p>\\n<p>Essential Functions:\\n•Delivers quality DevOps analysis, system development planning, builds end to end “build and deployment”, “CI/CD” pipelines to ensure timely development, test and release of functional, high quality products/systems.\\n•Works closely with developers, testers and system engineers to ensure a successful release of code to production.\\n•Develops automation and process pipelines to enable teams to develop, manage, configure, scale and monitor applications in data centers and in cloud.\\n•Builds and manages advanced monitoring and log analysis tools providing teams with insights into the health and performance of our solutions.\\n•Adheres to quality and development best practices and drives development of tools for improving team efficiencies.\\n•Constructs, maintains and tests development pipeline(s) to validate tool/feature functionality, as well as load testing of system using various test harnesses.\\n•Defines system and service configurations, installation and support strategies of system components for implementation and maintenance support.\\n•Identifies potential problems before they happen, investigates root causes and implement solutions to prevent future occurrences.</p>\\n<p>Minimum Qualifications &amp; Required Knowledge, Skills and Abilities:\\n•Bachelor’s degree in computer science, engineering or related field or an equivalent combination of education and experience sufficient to perform the essential functions of the job.\\n•5+ years of experience in DevOps focused on application build and release automation.\\n•Solid understanding of agile delivery, software development life cycle, test driven development, continuous integration and continuous delivery.\\n•Proven implementation/deployment experience and knowledge with strong ability to troubleshoot complex hardware and software issues ranging from system resources to application stack traces.\\n•Solid understanding and experience working with high availability, high performance, multi-data center systems and cloud environments.\\n•Experience with version control systems such as TFVC, GIT etc.\\n•Experience with containers and containerization technologies.\\n•Experience in cross-platform scripting languages and build tools (Artifactory, MS Build, Nexus, NuGet).\\n•Experience deploying and administering continuous integration tools such as Azure DevOps.\\n•Experience in Infrastructure and application monitoring tools such as Azure Monitor, AppInsights, SolarWinds, New Relic etc.\\n•Familiarity with deployment strategies across various environment such as Dev, QA and production.\\n•Familiarity in at least 1 object-oriented programming language such as Java or C#.\\n•Experience in development with scripting languages, such as PowerShell, Bash scripts, Python, Ruby, etc.\\n•Strong process orientation and project management skills to manage multiple project streams.\\n•Ability to work independently with minimal direction to execute/manage large projects and system planning efforts following established guidelines/procedures.\\n•Strong interpersonal skills with the ability to educate, inform, persuade and achieve understanding and buy-in on technical and business needs across different functions, levels and stakeholders.\\n•Valid driver’s license.</p>\\n<p>Who is Compeer Financial?\\nCompeer Financial exists to champion the hopes and dreams of rural America. By joining our team, you will help empower those in agriculture and rural communities to achieve their goals and expand their possibilities.  We embrace business agility and innovative approaches to serving our clients and communities.</p>\\n<p>Why join our team?</p>\\n<p>•Amazing team members who are passionate about serving agriculture and rural America.\\n•Investment in our team members’ education, growth and development.\\n•Engagement in our communities through giving back and volunteerism.\\n•Flexible, collaborative and dynamic work environment.\\n•Great benefits:◦Medical, Dental, Vision insurance\\n◦401K (3% Compeer contribution &amp; up to an additional 6% match)\\n◦Paid time off (vacation, sick leave, holidays, volunteer time)</p>\\n<p>Find out why our team members choose Compeer Financial by watching this video.</p>\\n<p>How do I apply?\\nQualified candidates, please apply online at <a href=\\"http://www.compeer.com/careers\\">www.compeer.com/careers</a>.</p>\\n<p>Compeer Financial is an equal opportunity employer and all qualified applicants will receive consideration for employment without regard to race, color, religion, sex, national origin, disability status, protected veteran status, or any other characteristic protected by law.</p>\\n')).toBe('Position Overview:\\nThis position will develop and continuously improve Compeer’s Development Operations (DevOps) practice by ensuring the end-to-end engineering life-cycle of software solutions under the direction of Business Technology (BT) leadership. The incumbent leads the DevOps Team in the requirements analysis, architectural vision and test automation through the user experience, extensions, operations, maintenance and end of life of the software. This includes building, refreshing, diagnosing and issue remediation of system development environments, and developing/implementing the monitoring solutions and tools in collaboration with the DevOps Infrastructure Engineer and Infrastructure Team which will automate daily operational activities as they relate to the DevOps practice. Conducts ongoing market research staying abreast of developments and technologies related to DevOps practice and tools.');
      // eslint-disable-next-line no-useless-escape
      expect(trimContent('<p><strong>THRIVE WITH AGILOFT</strong></p>\n<p>Are you an experienced QA Automation Engineer who is successful, motivated, smart, energetic, and looking for a rewarding position in a growing, profitable, and dynamic company?</p>\n<p>Agiloft is expanding our developer team, looking for QA Automation Engineers hat thrive working with enterprises in multiple industries, with unique business challenges requiring sophisticated solution design.</p>\n<p><strong>WHY JOIN AGILOFT?</strong></p>\n<ul>\n<li>\n<p>Agiloft was named the market leader in every category in the <a href=\"https://www.agiloft.com/flash/Gartner_critical_capabilities_for_CLM.pdf\">Gartner Critical Capabilities for CLM report</a>, and a market leader in the Gartner Magic Quadrant.</p>\n</li>\n<li>\n<p>Contract Lifecycle Management (CLM) is one of the fastest-growing areas of enterprise sales, with a TAM projected to climb from $2B to $7B in the next 5 years.</p>\n</li>\n<li>\n<p>The Agiloft Contract and Commerce Lifecycle Platform has won over <a href=\"https://www.agiloft.com/awards.htm\">a dozen awards, including the Editor\'s Choice award from PC Mag</a>, for the past five years in a row.</p>\n</li>\n<li>\n<p>Agiloft has a highly differentiated value proposition which is uniquely appealing to enterprises: pre-built applications with a deeply configurable, no-code platform for integrated Business Process Management throughout an organization.</p>\n</li>\n<li>\n<p>Agiloft is pioneering the applied use of Artificial Intelligence to enable next-generation business commerce at organizations ranging from small enterprises to U.S. government agencies and Fortune 100 companies.</p>\n</li>\n<li>\n<p>Agiloft is the only company in the industry with the confidence to provide an unconditional satisfaction guarantee, and you too will be successful with Agiloft.</p>\n</li>\n</ul>\n<p>As the leader in the CCLM market, Agiloft is winning many Enterprise deals and looking to hire the best talent to meet this demand with a competitive compensation plan that rewards overachievement.</p>\n<p><strong>POSITION OVERVIEW</strong></p>\n<p>We are looking for a full-time QA Automation Engineer to help with manual and automated quality assurance of the Agiloft software platform. You should have no less than two years of professional experience in software testing and test automation. We also expect you to perform well working in a geographically distributed and diverse team.</p>\n<p><strong>Job Responsibilities</strong></p>\n<ul>\n<li>Write test scripts and scenarios to extend existing testing automation framework</li>\n<li>Advance and maintain the test automation framework</li>\n<li>Research and resolve any broken automation scripts that fail during execution</li>\n<li>Support manual QA testing efforts in conversion of manual test cases into automated ones</li>\n<li>Update test results in test tracking tool(s)</li>\n<li>Report, track, and manage any discovered defects to resolution</li>\n<li>Work effectively and collaboratively with other members on the product team</li>\n</ul>\n<p><strong>Required Qualifications</strong></p>\n<ul>\n<li>Solid experience with WATIR and/or Ruby/Selenium/Python</li>\n<li>2+ years of test automation experience in web/cloud services, applications, and platforms</li>\n<li>Experience with writing and executing detailed test cases, test plans and test design documents</li>\n<li>Experience with application (UI/API/Unit) automation tools, BDD automation tools, monitoring tools, performance testing tools, and automation technologies</li>\n<li>BS in Computer Science, Software Engineering or equivalent.</li>\n<li>Ability to speak and write in English</li>\n</ul>\n<p><strong>BENEFITS AND PERKS</strong></p>\n<ul>\n<li>Competitive salary</li>\n<li>Referral bonuses</li>\n<li>Flexible work schedules</li>\n<li>Professional development and career growth opportunities</li>\n<li>Awesome team members</li>\n</ul>\n<p><strong>To Apply</strong></p>\n<p>For immediate consideration, go to For immediate consideration, go to <a href=\"https://tinyurl.com/y2g63jvr\">https://www.agiloft.com/QAAutomationEngineer</a> to apply.</p>\n')).toBe('Are you an experienced QA Automation Engineer who is successful, motivated, smart, energetic, and looking for a rewarding position in a growing, profitable, and dynamic company?');
    });
  });

  describe('Element render tests', () => {
    test('Render component', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
    test('Render button', () => {
      expect(wrapper.find('button')).toHaveLength(1);
    });
    test('Text store match', () => {
      expect(wrapper.find(CardHeader).text()).toBe(post.title);
      expect(wrapper.find(CardContent).text())
        .toBe(wrapper.instance().trimContent(post.description));
    });
  });

  describe('Element interaction tests', () => {
    test('Favorite button click', () => {
      /**
       * Initial test
       */
      expect(wrapper.find(FavoriteIcon).prop('color')).toBe('action');

      /**
       * Add to favorites
       */
      wrapper.find(IconButton).simulate('click');
      expect(wrapper.find(FavoriteIcon).prop('color')).toBe('secondary');

      /**
       * Remove from favorites
       */
      wrapper.find(IconButton).simulate('click');
      expect(wrapper.find(FavoriteIcon).prop('color')).toBe('action');
    });
  });
});
