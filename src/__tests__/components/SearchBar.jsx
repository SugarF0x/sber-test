import React         from "react";
import { mount }     from "enzyme";
import { SearchBar } from "../../components/SearchBar";

describe("Search Component Testing", () => {
  const store     = {
    status:  "success",
    search:  [],
    favs:    [],
    filter:  "",
    display: "default",
  };
  const dummyPost = {
    id:           "569bfcdc-fad1-4563-ae57-8585831db596",
    type:         "Full Time",
    url:          "https://jobs.github.com/positions/569bfcdc-fad1-4563-ae57-8585831db596",
    created_at:   "Sun Sep 06 14:30:27 UTC 2020",
    company:      "Hotel Trades Council, AFL-CIO",
    company_url:  "http://www.hotelworkers.org",
    location:     "New York, NY",
    title:        "Web Developer",
    description:  "<p>The New York Hotel Trades Council, AFL-CIO, a labor union that represents nearly 40,000 workers in the hotel, gaming, and racing industries in the New York City area, seeks an experienced web developer.</p>\n<p>This COVID crisis has shown us the immense value to our Union of developing a more expansive and sophisticated website. Since March, the number of viewers to our site has increased seven-fold (to as many as 20,000 per day and more) and we are investing our resources accordingly. In fact, we have so many concrete ideas to put the site to new innovative uses, that our one full-time Web Developer has much more work to do than he can possibly handle. Among the new uses we are developing are:</p>\n<p>Conducting secret ballot ratification votes online;\nProviding multi-lingual content to an incredibly diverse membership (the current site supports English, Spanish and Chinese content);\nMobilizing rank-and-file political action in a private individually personalized Member Section;\nProviding non-union workers with a confidential communication channel with the union and interactive pages allowing them to compare their wages, benefits and working conditions to those enjoyed by unionized workers; and\nMany other applications.</p>\n<p>Our Union constantly seeks new ways to increase our effectiveness through smart use of technology and we are looking for a creative developer to help conceive of, design and implement tools to support the Union in our mission.</p>\n<p>This position offers the prospect of a great career and, as we are a labor union, an excellent benefit package.</p>\n<p>The team currently works remotely from home due to the COVID situation. When things return to normal, we intend to be flexible about remote work, and will consider skilled applicants who don’t live in the New York area.</p>\n<p>Starting salary: $70,000 to $85,000</p>\n<p>Benefits include: Medical, Dental, Optical, and Prescription Drugs with family coverage (including domestic partners); Pension, Pre-paid Legal, Flexible Spending Accounts, Life Cycle Benefits, Long-Term Care Insurance, and other benefits.</p>\n<p>Requirements:\nAt least 3 years developing websites using an MVC framework (with preference given to specific knowledge of Laravel PHP framework).\nStrong UI/UX design skills\nStrong javascript skills</p>\n<p>Other useful experience/qualifications:</p>\n<ul>\n<li>Advanced experience managing SQL databases</li>\n<li>Linux server administration</li>\n<li>Networking skills</li>\n<li>Python</li>\n</ul>\n",
    how_to_apply: "<p>Please submit a resume, three references and a cover letter to <a href=\"mailto:careers@nyhtc.org\">careers@nyhtc.org</a> with the subject line “Web Developer.”  The cover letter should be clear and concise and explain the specific reasons for your interest in the position, and specify (with appropriate explanation) which of each of the listed qualifications you possess and which ones you do not possess.</p>\n<p>The New York Hotel Trades Council, AFL-CIO, is an equal opportunity employer.  All persons regardless of age, race, ethnicity, gender, religious affiliation and sexual orientation are encouraged to apply.</p>\n",
    company_logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbE9KIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a30d608a910769a14438f7e0d7f3a673ca961499/HTC%20logo.jpg",
  };
  let wrapper;

  /**
   * override wrapper props with toMutate keeping the rest intact
   */
  function mutateProps(toMutate) {
    wrapper.setProps({ posts: Object.assign({}, wrapper.props().posts, toMutate) });
  }

  beforeEach(() => {
    // noinspection RequiredAttributes
    wrapper = mount(<SearchBar posts={ store }/>);
  });

  describe("Element render tests", () => {
    test("Render component", () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    });
    test("Render 2 text fields", () => {
      expect(wrapper.find("input")).toHaveLength(2);
    });
    test("Render 2 buttons", () => {
      expect(wrapper.find("button")).toHaveLength(2);
    });
  });

  describe("Element interaction tests", () => {
    test("Search button disabled state change on input", () => {
      let description = wrapper.find("input").at(0);
      let location    = wrapper.find("input").at(1);
      /*
       i wanted to do a button variable
       but for some reason it's state would not update on change
       while the full path call works every time
       ?question mark?
       */
      /**
       * Initial state test
       */
      expect(wrapper.find("button").at(0).prop("disabled")).toBe(true);

      /**
       * Stage change on Description input
       */
      description.simulate("change", { target: { value: "js" } });
      expect(wrapper.find("button").at(0).prop("disabled")).toBe(false);
      description.simulate("change", { target: { value: "" } });

      /**
       * State change on Location input
       */
      location.simulate("change", { target: { value: "moscow" } });
      expect(wrapper.find("button").at(0).prop("disabled")).toBe(false);
      location.simulate("change", { target: { value: "" } });

      /**
       * State change on both Description and Location input
       */
      description.simulate("change", { target: { value: "js" } });
      location.simulate("change", { target: { value: "moscow" } });
      expect(wrapper.find("button").at(0).prop("disabled")).toBe(false);
      description.simulate("change", { target: { value: "" } });
      location.simulate("change", { target: { value: "" } });

      /**
       * State reversion to initial on input clear
       */
      expect(wrapper.find("button").at(0).prop("disabled")).toBe(true);
    });
    test("Search button availability based on filter", () => {
      /**
       * Initial test
       */
      expect(wrapper.find("button").at(0).prop("disabled")).toBe(true);

      /**
       * Set matching inputs and filter
       * (mismatching is already tested before)
       */
      wrapper.setProps({ posts: Object.assign({}, store, { filter: "js-moscow" }) });
      mutateProps({ filter: "js-moscow" });
      wrapper.find("input").at(0).simulate("change", { target: { value: "js" } });
      wrapper.find("input").at(1).simulate("change", { target: { value: "moscow" } });
      expect(wrapper.find("button").at(0).prop("disabled")).toBe(true);

      /**
       * Change inputs
       */
      wrapper.find("input").at(0).simulate("change", { target: { value: "python" } });
      expect(wrapper.find("button").at(0).prop("disabled")).toBe(false);
    });
    test("Favorites' button disabled state change on favs content change", () => {
      /**
       * Initial state test
       */
      expect(wrapper.find("button").at(1).prop("disabled")).toBe(true);

      /**
       * Add 2 favorites
       */
      mutateProps({ favs: [dummyPost, dummyPost] });
      expect(wrapper.find("button").at(1).prop("disabled")).toBe(false);

      /**
       * Remove 1 favorite
       */
      mutateProps({ favs: [dummyPost] });
      expect(wrapper.find("button").at(1).prop("disabled")).toBe(false);

      /**
       * Remove all favorites
       */
      mutateProps({ favs: [] });
      expect(wrapper.find("button").at(1).prop("disabled")).toBe(true);
    });
    test("Buttons' state changed based on display", () => {
      wrapper.setProps({
        posts: Object.assign({}, store, {
          filter: "",
          search: [dummyPost],
          favs:   [dummyPost],
        }),
      });
      wrapper.find("input").at(0).simulate("change", { target: { value: "js" } });

      /**
       * Initial test with both input and favorites present
       */
      expect(wrapper.find("button").at(0).prop("disabled")).toBe(false);
      expect(wrapper.find("button").at(1).prop("disabled")).toBe(false);

      /**
       * Change display to 'favs'
       */
      mutateProps({ display: "favs" });
      expect(wrapper.find("button").at(0).prop("disabled")).toBe(false);
      expect(wrapper.find("button").at(1).prop("disabled")).toBe(true);

      /**
       * Change display to 'search'
       */
      mutateProps({ display: "search", filter: "js-" });
      expect(wrapper.find("button").at(0).prop("disabled")).toBe(true);
      expect(wrapper.find("button").at(1).prop("disabled")).toBe(false);
    });
  });
});
